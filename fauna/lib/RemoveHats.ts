import { query as q } from 'faunadb'
import { DeleteAccountHat } from './DeleteAccountHat'
import { GetHatByHatId } from './GetHatByHatId'
import { RemoveProfileRole } from './RemoveProfileRole'
import { UpsertAccount } from './UpsertAccount'

export interface HatToRemove {
  address: string
  hatId: string
}

export const RemoveHats = (hatsToRemove: HatToRemove[]) => {
  return hatsToRemove.map((hatToRemove) =>
    q.Let(
      {
        hat: GetHatByHatId(hatToRemove.hatId),
        account: UpsertAccount(hatToRemove.address),
      },
      q.Do(
        DeleteAccountHat(
          q.Select('ref', q.Var('account')),
          q.Select('ref', q.Var('hat'))
        ),
        RemoveProfileRole(hatToRemove.address, hatToRemove.hatId)
      )
    )
  )
}
