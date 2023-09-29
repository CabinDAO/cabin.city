/// <reference types="stripe-event-types" />

import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import type { Readable } from 'node:stream'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { Cart, CartFragment, GetCartDocument } from '@/generated/graphql'

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
      const paymentIntent = event.data.object

      const cart = await getCartByIntentSecret(
        paymentIntent.client_secret ?? ''
      )
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break
    // ... handle other event types
    default:
      console.log(`Got unhandled stripe event of type ${event.type}`)
      res.status(400).send(`Unhandled type: ${event.type}`)
      return
  }
  res.send({})
}

const getCartByIntentSecret = async (cartId: string) => {
  if (!cartId) {
    return null
  }

  return faunaServerClient.query<Cart>(GetCartDocument)
}

export default handler
