/// <reference types="stripe-event-types" />

import { NextApiRequest, NextApiResponse } from 'next'
import type { Readable } from 'node:stream'
import { PaymentStatus, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'
import { SendgridService } from '@/lib/mail/sendgrid-service'
import { EmailType, NewPurchasePayload } from '@/lib/mail/types'
import { createPrivyAccount } from '@/lib/privy'
import {
  createProfile,
  grantOrExtendCitizenship,
  inviteSetError,
  ProfileWithInviteQueryInclude,
  ProfileWithInviteRelations,
} from '@/utils/profile'
import { sendToDiscord } from '@/lib/discord'
import { appDomainWithProto } from '@/utils/display-utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16', // latest version at the time I wrote this
  typescript: true,
  telemetry: false,
})

// Disable NextJS body parsing, we want to read the raw body
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? ''
  if (!webhookSecret) {
    res.status(400).send({ error: 'STRIPE_WEBHOOK_SECRET env var not set' })
  }

  let event: Stripe.DiscriminatedEvent

  const rawBody = await getRawBody(req)
  // const jsonBody = JSON.parse(Buffer.from(rawBody).toString('utf8'))

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers['stripe-signature'] ?? '',
      webhookSecret
    ) as Stripe.DiscriminatedEvent
  } catch (err: unknown) {
    if (err instanceof Stripe.errors.StripeError) {
      console.log(`Stripe webhook signature error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
    } else {
      console.log(`Stripe webhook unknown error: ${err}`)
      res.status(400).send(`Webhook Error: ${err}`)
    }
    return
  }

  let cartNeedingPostProcessing: CartWithRelations | undefined

  switch (event.type) {
    case 'payment_intent.succeeded':
      cartNeedingPostProcessing = await handlePaymentIntentNewStatus(
        res,
        event.data.object,
        PaymentStatus.Paid
      )
      break
    case 'payment_intent.payment_failed':
      console.log(event)
      cartNeedingPostProcessing = await handlePaymentIntentNewStatus(
        res,
        event.data.object,
        PaymentStatus.Error
      )
      break
    case 'charge.succeeded':
    case 'payment_intent.created':
      // nothing to do
      break
    default:
      console.log(`Got unhandled stripe event of type ${event.type}`)
      res.status(400).end(`Unhandled type: ${event.type}`)
      return
  }

  if (!res.writableEnded) {
    res.end('')
  }

  if (cartNeedingPostProcessing) {
    await postProcessCart(cartNeedingPostProcessing)
  }
}

async function handlePaymentIntentNewStatus(
  res: NextApiResponse,
  paymentIntent: Stripe.PaymentIntent,
  status: PaymentStatus
): Promise<CartWithRelations | undefined> {
  const clientSecret = paymentIntent.client_secret
  if (!clientSecret) {
    res.status(400).end(`No client secret in payment intent`)
    return
  }

  const cart = await prisma.cart.findUnique({
    where: { stripePaymentIntentClientSecret: clientSecret },
    include: CartQueryInclude,
  })

  if (!cart) {
    console.log(`Got payment_intent.succeeded event with no matching cart`)
    res.status(400).end(`No matching cart`)
    return
  }

  let updatedCart: CartWithRelations
  try {
    updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { paymentStatus: status },
      include: CartQueryInclude,
    })
  } catch (e: unknown) {
    console.log(
      `Got payment_intent.succeeded event but failed to update cart: ${e}`
    )
    res.status(400).end(`Failed to update cart: ${e}`)
    return
  }

  if (status === PaymentStatus.Paid) {
    const sendgrid = new SendgridService()
    try {
      await sendgrid.sendEmail(EmailType.NEW_PURCHASE, {
        cartExternId: cart.externId,
        inviteExternId: cart.invite?.externId ?? '',
      } satisfies NewPurchasePayload)
      // TODO: if they're minting a citizenship, send them an email with the activation link
    } catch (e: unknown) {
      console.log(`Failed to send new purchase email: ${e}`)
    }
  }

  return updatedCart.invite ? updatedCart : undefined
}

async function postProcessCart(cart: CartWithRelations) {
  if (!cart.invite) {
    return
  }

  let profile: ProfileWithInviteRelations | null = null
  if (cart.invite.invitee) {
    profile = await prisma.profile.findUnique({
      where: { id: cart.invite.invitee.id },
      include: ProfileWithInviteQueryInclude,
    })
  } else {
    const name = cart.invite.name
    const email = cart.invite.email
    if (!name || !email) {
      await inviteSetError(cart.invite, 'No profile and no name/email')
      return
    }

    // create prisma account
    const privyAccount = await createPrivyAccount(
      email,
      cart.invite.walletAddress || undefined
    )

    // just to track account creation status
    await prisma.invite.update({
      where: { id: cart.invite.id },
      data: { privyDID: privyAccount.id },
    })

    const walletAddress =
      cart.invite.walletAddress ||
      privyAccount.linked_accounts.find((w) => w.type === 'wallet')?.address

    if (!walletAddress) {
      await inviteSetError(cart.invite, `Privy failed to create a wallet`)
      return
    }

    profile = await createProfile({
      privyDID: privyAccount.id,
      name: name,
      email: email,
      walletAddress: walletAddress.toLowerCase(),
      invite: cart.invite,
    })
  }

  if (!profile) {
    console.error(`Failed to find or create profile for cart ${cart.externId}`)
    await inviteSetError(cart.invite, 'Failed to create profile')
    return
  }

  await grantOrExtendCitizenship(profile)

  await sendToDiscord(
    `New citizen minted via checkout: ${profile.name} https://${appDomainWithProto}/profile/${profile.externId}`
  )
}

// must match CartQueryInclude below
type CartWithRelations = Prisma.CartGetPayload<{
  include: {
    invite: {
      include: {
        invitee: true
      }
    }
  }
}>

// must match CartWithRelations type above
const CartQueryInclude = {
  invite: {
    include: {
      invitee: true,
    },
  },
} satisfies Prisma.CartInclude

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}
