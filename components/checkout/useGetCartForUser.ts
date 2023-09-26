import { useGetCartQuery } from '@/generated/graphql'

export const useGetCartForUser = (
  cartId: string,
  userId: string | undefined
) => {
  // const { user } = useProfile()
  const { data } = useGetCartQuery({
    variables: {
      id: `${cartId}`,
    },
    skip: !cartId,
  })

  const cart = data?.findCartByID ?? null

  if (!cart || !userId || cart?.profile._id != userId) {
    return null
  }

  return cart
}
