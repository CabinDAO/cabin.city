/// <reference types="stripe-event-types" />

import { NextApiRequest, NextApiResponse } from 'next'
import type { Readable } from 'node:stream'
import { $Enums } from '@prisma/client'
import { prisma } from '@/utils/prisma'
import Stripe from 'stripe'
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
        $Enums.PaymentStatus.Paid
      )
      break
    case 'payment_intent.payment_failed':
      console.log(event)
      await handlePaymentIntentNewStatus(
        res,
        event.data.object,
        $Enums.PaymentStatus.Error
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
  status: $Enums.PaymentStatus
) => {
  const clientSecret = paymentIntent.client_secret
  if (!clientSecret) {
    res.status(400).end(`No client secret in payment intent`)
    return
  }

  const cart = await prisma.cart.findUnique({
    where: { stripePaymentIntentClientSecret: clientSecret },
    include: { profile: true },
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
  } catch (e: any) {
    console.log(
      `Got payment_intent.succeeded event but failed to update cart: ${e}`
    )
    res.status(400).end(`Failed to update cart: ${e}`)
    return
  }

  if (status === $Enums.PaymentStatus.Paid) {
    const sendgrid = new SendgridService()
    try {
      await sendgrid.sendEmail(EmailType.NEW_PURCHASE, {
        cartId: cart.id,
      })
      console.log(`Sent us a new purchase email`)
    } catch (e: any) {
      console.log(`Failed to send new purchase email: ${e}`)
    }
  }
}

export default handler
