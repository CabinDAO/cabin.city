import { query as q } from 'faunadb'
import { GetHatByHatId } from './GetHatByHatId'

export interface UpsertHatFields {
  hatId: string
  details: string
  imageUri: string
  level: number
}

export const UpsertHat = (hat: UpsertHatFields) => {
  return q.Let(
    {
      hat: GetHatByHatId(hat.hatId),
    },
    q.If(
      q.IsNull(q.Var('hat')),
      q.Create(q.Collection('Hat'), {
        data: hat,
      }),
      q.Var('hat')
    )
  )
}
