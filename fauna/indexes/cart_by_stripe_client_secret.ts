import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const cartByStripeClientSecret: IndexResource = {
  name: 'cart_by_stripe_client_secret',
  source: {
    collection: q.Collection('Cart'),
  },
  terms: [{ field: ['data', 'stripePaymentIntentClientSecret'] }],
  unique: true,
}

export default cartByStripeClientSecret
