import { UpdateCartInput } from '@/generated/graphql'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
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
