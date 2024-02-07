import { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import Stripe from 'stripe'
import { $Enums } from '@prisma/client'
import { prisma } from '@/utils/prisma'

export type CreatePaymentIntentParams = {
  cartId: string
  agreedToTerms: boolean
}

export type CreatePaymentIntentResponse = {
  clientSecret: string
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16', // latest version at the time I wrote this
  typescript: true,
  telemetry: false,
})

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatePaymentIntentResponse>,
  opts: { auth: AuthData }
) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const profile = await requireProfile(req, res, opts)

  const body = req.body as CreatePaymentIntentParams

  const cart = await prisma.cart.findUnique({
    where: { externId: body.cartId },
    include: { profile: true },
  })

  if (!cart) {
    res.status(400).end({ error: 'Cart not found' })
    return
  }

  if (cart.profileId !== profile.id) {
    res.status(403).end({ error: 'Not your cart' })
    return
  }

  // if (lodgingType.data.spotsTaken >= lodgingType.data.quantity) {
  //   res.status(500).end({ error: 'This experience is sold out' })
  //   return
  // }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.amount.toNumber(),
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
      agreedToTerms: body.agreedToTerms,
    },
  })

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  })
}

export default withAuth(handler)
