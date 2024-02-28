import { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'
import Stripe from 'stripe'
import { $Enums } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { APIError } from '@/utils/types/shared'

export type CreatePaymentIntentParams = {
  cartId: string
}

export type CreatePaymentIntentResponse =
  | {
      clientSecret: string
    }
  | APIError

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16', // latest version at the time I wrote this
  typescript: true,
  telemetry: false,
})

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatePaymentIntentResponse>
) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  // const profile = await requireProfile(req, res, opts)

  const body = req.body as CreatePaymentIntentParams

  const cart = await prisma.cart.findUnique({
    where: { externId: body.cartId },
    include: {
      invite: {
        include: {
          invitee: true,
        },
      },
    },
  })

  if (!cart) {
    res.status(400).end({ error: 'Cart not found' })
    return
  }

  // if (cart.profileId !== profile.id) {
  //   res.status(403).end({ error: 'Not your cart' })
  //   return
  // }

  const paymentIntent = await stripe.paymentIntents.create({
    description: cart.invite
      ? `citizenship for ${cart.invite.invitee?.name || cart.invite.name}`
      : 'cabin.city purchase',
    amount: cart.amount.toNumber() * 100,
    currency: 'usd',
    statement_descriptor: 'cabin.city',
    metadata: {
      cartExternId: cart.externId,
    },
  })

  if (!paymentIntent || !paymentIntent.client_secret) {
    res.status(500).end({ error: 'Missing payment intent client secret' })
    return
  }

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      paymentStatus: $Enums.PaymentStatus.Pending, // always reset to pending in case it errored in the past
      stripePaymentIntentClientSecret: paymentIntent.client_secret,
    },
  })

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  })
}

export default withAuth(handler)
