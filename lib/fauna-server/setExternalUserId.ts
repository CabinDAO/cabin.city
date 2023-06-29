import { query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { faunaServerClient } from './faunaServerClient'
import { GetProfileById } from '@/fauna/lib/GetProfileById'

/**
 * Sets the external user id for a profile
 * @param profileId The profile id
 * @returns The updated profile
 */
export const setExternalUserId = async (
  profileId: string,
  externalUserId: string
) => {
  return faunaServerClient.query(
    q.Let(
      {
        profile: GetProfileById(profileId),
      },
      q.Update(SelectRef(q.Var('profile')), {
        data: {
          externalUserId,
        },
      })
    )
  )
}
