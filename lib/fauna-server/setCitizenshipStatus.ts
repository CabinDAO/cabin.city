import { GetProfileByAddress } from '@/fauna/lib/GetProfileByAddress'
import { CitizenshipStatus } from '@/generated/graphql'
import { query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { faunaServerClient } from './faunaServerClient'

/**
 * Set the citizenship status of a profile
 * @param address Address of the profile to update
 * @param status Citizenship status to set
 * @returns The updated profile if the status was updated, `null` if the status was already set to the desired value
 */
export const setCitizenshipStatus = async (
  address: string,
  status: CitizenshipStatus
) => {
  return faunaServerClient.query(
    q.Let(
      {
        profile: GetProfileByAddress(address),
        currentStatus: q.Select(
          ['data', 'citizenshipStatus'],
          q.Var('profile')
        ),
      },
      q.If(
        q.Not(q.Equals(q.Var('currentStatus'), status)),
        q.Update(SelectRef(q.Var('profile')), {
          data: {
            citizenshipStatus: status,
          },
        }),
        // Status already matches, do nothing
        null
      )
    )
  )
}
