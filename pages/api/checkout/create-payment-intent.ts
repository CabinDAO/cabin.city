import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import withAuth from '@/utils/api/withAuth'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import { FAUNA_ERROR_TO_MESSAGE_MAPPING } from '@/utils/profile-submission'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import {
  CreatePaymentIntentReq,
  CreatePaymentIntentRes,
} from '@/components/checkout/types'
import { query as q } from 'faunadb'
import { ToRef } from '@/fauna/lib/ToRef'
import { updateCart } from '@/lib/fauna-server/updateCart'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16', // latest version at the time I wrote this
  typescript: true,
  telemetry: false,
})

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  opts?: { auth: { externalUserId: string } }
) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const body = req.body as CreatePaymentIntentReq
  const externalUserId = opts?.auth?.externalUserId

  if (!externalUserId) {
    res.status(401).end({ error: 'Authentication required' })
    return
  }

  let cart: any
  try {
    cart = await _getCartForUser(body.cartId, externalUserId)
    if (!cart) {
      res.status(400).end({ error: 'Cart not found' })
      return
    }
  } catch (e: any) {
    res.status(400).end({ error: e })
    return
  }

  const cartId = cart.ref.value.id
  const cartProfileId = cart.data.profile.value.id

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.data.amount,
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
    cart.data.stripePaymentIntentClientSecret = paymentIntent.client_secret
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
  } as CreatePaymentIntentRes)
}

function _getCartForUser(id: string, externalUserId: string) {
  return faunaServerClient.query(
    q.Let(
      {
        cartRef: q.Ref(q.Collection('Cart'), id),
        cart: q.Get(q.Var('cartRef')),
        currIdRef: ToRef(q.Call('profile_by_external_user_id', externalUserId)),
        isMe: q.If(
          q.IsNull(q.Var('currIdRef')),
          false,
          q.Equals(
            q.Var('currIdRef'),
            q.Select(['data', 'profile'], q.Var('cart'))
          )
        ),
      },
      q.If(q.Var('isMe'), q.Var('cart'), null)
    )
  )
}

export default withIronSessionApiRoute(withAuth(handler), ironOptions)
