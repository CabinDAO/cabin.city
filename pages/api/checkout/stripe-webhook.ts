/// <reference types="stripe-event-types" />

import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import type { Readable } from 'node:stream'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { query as q } from 'faunadb'
import { updateCart } from '@/lib/fauna-server/checkout'
import { PaymentStatus } from '@/generated/graphql'
import { SendgridService } from '@/lib/mail/sendgrid-service'
import { EmailType } from '@/lib/mail/types'

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
  } catch (err: any) {
    console.log(`Stripe webhook signature error: ${err.message}`)
    res.status(400).send(`Webhook Error: ${err.message}`)
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
  const cart = await _getCartByIntentSecret(paymentIntent.client_secret ?? '')

  if (!cart) {
    console.log(`Got payment_intent.succeeded event with no matching cart`)
    res.status(400).end(`No matching cart`)
    return
  }

  try {
    await updateCart(
      cart.ref.value.id,
      { paymentStatus: status },
      cart.data.profile.value.id
    )
  } catch (e: any) {
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
        cartId: cart.ref.value.id,
      })
      console.log(`Sent us a new purchase email`)
    } catch (e: any) {
      console.log(`Failed to send new purchase email: ${e}`)
    }
  }
}

const _getCartByIntentSecret = async (
  stripePaymentIntentClientSecret: string
) => {
  if (!stripePaymentIntentClientSecret) {
    return null
  }

  // TODO: use a proper type here
  return faunaServerClient.query<any>(
    q.Get(
      q.Match(
        q.Index('cart_by_stripe_client_secret'),
        stripePaymentIntentClientSecret
      )
    )
  )
}

export default handler
