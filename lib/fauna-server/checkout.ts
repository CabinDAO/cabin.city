import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { query as q } from 'faunadb'
import { ToRef } from '@/fauna/lib/ToRef'
import { UpdateCartInput } from '@/generated/graphql'
import { UpdateCart } from '@/fauna/lib/UpdateCart'
import { GetProfileById } from '@/fauna/lib/GetProfileById'

export const updateCart = async (
  id: string,
  data: UpdateCartInput,
  currProfileId: string
): Promise<object> => {
  return faunaServerClient.query(
    UpdateCart(id, data, GetProfileById(currProfileId))
  )
}

export const getCartForUser = async (
  id: string,
  externalUserId: string
): Promise<[any, any]> => {
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
      q.If(
        q.Var('isMe'),
        [
          q.Var('cart'),
          q.Get(q.Select(['data', 'lodgingType'], q.Var('cart'))),
        ],
        [null, null]
      )
    )
  )
}
