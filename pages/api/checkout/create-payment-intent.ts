import { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireAuth, withAuth } from '@/utils/api/withAuth'
import Stripe from 'stripe'
import { FAUNA_ERROR_TO_MESSAGE_MAPPING } from '@/utils/profile-submission'
import {
  CreatePaymentIntentReq,
  CreatePaymentIntentRes,
} from '@/components/checkout/types'
import { updateCart, getCartForUser } from '@/lib/fauna-server/checkout'
import { PaymentStatus } from '@/generated/graphql'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16', // latest version at the time I wrote this
  typescript: true,
  telemetry: false,
})

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatePaymentIntentRes | { error: string }>,
  opts: { auth: AuthData }
) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const body = req.body as CreatePaymentIntentReq
  const externalUserId = requireAuth(req, res, opts)

  type ref = {
    value: {
      id: string
      collection?: any // idk what this is
    }
  }

  let cart: {
    ref: ref
    ts: number
    data: {
      profile: ref
      offer: ref
      lodgingType: ref
      amountCents: number
      paymentStatus: PaymentStatus
      agreedToTerms: boolean
      stripePaymentIntentClientSecret?: string
      notes?: string
    }
  } | null

  let lodgingType: {
    ref: ref
    ts: number
    data: {
      location: ref
      description: string
      quantity: number
      priceCents: number
      spotsTaken: number
    }
  } | null

  try {
    ;[cart, lodgingType] = await getCartForUser(body.cartId, externalUserId)
  } catch (e: any) {
    res.status(400).end({ error: e })
    return
  }

  if (!cart || !lodgingType) {
    res.status(400).end({ error: 'Cart not found' })
    return
  }

  if (lodgingType.data.spotsTaken >= lodgingType.data.quantity) {
    res.status(500).end({ error: 'This experience is sold out' })
    return
  }

  const cartId = cart.ref.value.id
  const cartProfileId = cart.data.profile.value.id

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.data.amountCents,
    currency: 'usd',
    statement_descriptor: 'cabin.city',
    metadata: {
      cartId: cartId,
    },
  })

  if (!paymentIntent || !paymentIntent.client_secret) {
    res.status(500).end({ error: 'Missing payment intent client secret' })
    return
  }

  try {
    cart.data.paymentStatus = PaymentStatus.Pending // always reset to pending in case it errored in the past
    cart.data.stripePaymentIntentClientSecret = paymentIntent.client_secret
    cart.data.agreedToTerms = body.agreedToTerms
    await updateCart(cartId, cart.data, cartProfileId)
  } catch (e: any) {
    const error = e as Error

    const mappedError = FAUNA_ERROR_TO_MESSAGE_MAPPING[error.message]

    if (mappedError) {
      res.status(400).send({ error: mappedError })
    } else {
      console.error('Error updating cart', e)
      res.status(500).send({ error: 'Error updating cart' })
    }
    return
  }

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}

export default withAuth(handler)
