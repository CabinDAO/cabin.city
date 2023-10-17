import {
  CartFragment,
  GetCartQuery,
  GetCartQueryVariables,
  useGetCartQuery,
} from '@/generated/graphql'
import { ApolloQueryResult } from '@apollo/client/core/types'

interface r {
  cart: CartFragment | null
  refetch: (
    variables?: Partial<GetCartQueryVariables>
  ) => Promise<ApolloQueryResult<GetCartQuery>>
  startPolling: (pollInterval: number) => void
  stopPolling: () => void
}

export const useGetCartForUser = (
  cartId: string,
  userId: string | undefined
): r => {
  const { data, refetch, startPolling, stopPolling } = useGetCartQuery({
    variables: {
      id: cartId,
    },
    skip: !cartId || !userId || cartId == 'undefined',
  })

  const cart = data?.findCartByID ?? null

  if (!cart || !userId || cart?.profile._id != userId) {
    return { cart: null, refetch, startPolling, stopPolling }
  }

  return { cart, refetch, startPolling, stopPolling }
}
