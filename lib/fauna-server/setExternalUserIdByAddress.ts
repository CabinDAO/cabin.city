import { GetProfileByAddress } from '@/fauna/lib/GetProfileByAddress'
import { query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { faunaServerClient } from './faunaServerClient'

/**
 * Sets the external user id for a profile
 * @param address Address of the profile to update
 * @returns The updated profile
 */
export const setExternalUserIdByAddress = async (
  address: string,
  externalUserId: string
) => {
  return faunaServerClient.query(
    q.Let(
      {
        profile: GetProfileByAddress(address),
      },
      q.Update(SelectRef(q.Var('profile')), {
        data: {
          externalUserId,
        },
      })
    )
  )
}
