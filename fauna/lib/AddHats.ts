import { query as q } from 'faunadb'
import { ProfileRole } from '../../generated/graphql'
import { SetAccountHat } from './SetAccountHat'
import { SetProfileRole } from './SetProfileRole'
import { UpsertAccount } from './UpsertAccount'
import { UpsertHat, UpsertHatFields } from './UpsertHat'

export interface HatToAdd {
  address: string
  hat: UpsertHatFields
  profileRole: ProfileRole | null
}

export const AddHats = (hatsToAdd: HatToAdd[]) => {
  return hatsToAdd.map((hatToAdd) =>
    q.Let(
      {
        hat: UpsertHat(hatToAdd.hat),
        account: UpsertAccount(hatToAdd.address),
      },
      q.Do(
        SetAccountHat(
          q.Select('ref', q.Var('account')),
          q.Select('ref', q.Var('hat'))
        ),
        SetProfileRole(hatToAdd.address, hatToAdd.profileRole)
      )
    )
  )
}
