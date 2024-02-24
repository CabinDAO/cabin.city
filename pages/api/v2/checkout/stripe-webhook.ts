/// <reference types="stripe-event-types" />

import { NextApiRequest, NextApiResponse } from 'next'
import type { Readable } from 'node:stream'
import { PaymentStatus, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'
import { SendgridService } from '@/lib/mail/sendgrid-service'
import { EmailType, NewPurchasePayload } from '@/lib/mail/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16', // latest version at the time I wrote this
  typescript: true,
  telemetry: false,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentIntentNewStatus(
        res,
        event.data.object,
        PaymentStatus.Paid
      )
      break
    case 'payment_intent.payment_failed':
      console.log(event)
      await handlePaymentIntentNewStatus(
        res,
        event.data.object,
        PaymentStatus.Error
      )
      break
    default:
      console.log(`Got unhandled stripe event of type ${event.type}`)
      res.status(400).end(`Unhandled type: ${event.type}`)
      return
  }

  if (!res.writableEnded) {
    res.end('')
  }
}

const handlePaymentIntentNewStatus = async (
  res: NextApiResponse,
  paymentIntent: Stripe.PaymentIntent,
  status: PaymentStatus
) => {
  const clientSecret = paymentIntent.client_secret
  if (!clientSecret) {
    res.status(400).end(`No client secret in payment intent`)
    return
  }

  const cart = await prisma.cart.findUnique({
    where: { stripePaymentIntentClientSecret: clientSecret },
    include: { partialInviteClaim: true },
  })

  if (!cart) {
    console.log(`Got payment_intent.succeeded event with no matching cart`)
    res.status(400).end(`No matching cart`)
    return
  }

  try {
    await prisma.cart.update({
      where: { id: cart.id },
      data: { paymentStatus: status },
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
        partialInviteClaimExternId: cart.partialInviteClaim?.externId,
      } satisfies NewPurchasePayload)
      console.log(`Sent us a new purchase email`)
      // TODO: if they're minting a citizenship, send them an email with the activation link
    } catch (e: unknown) {
      console.log(`Failed to send new purchase email: ${e}`)
    }
  }
}

export default handler
