import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { ActivityType, LocationType } from '../../generated/graphql'
import { UpsertActivity } from '../lib/UpsertActivity'
import { Coalesce } from '../lib/Coalesce'

const updateOffer: FunctionResource = {
  name: 'update_offer',
  body: q.Query(
    q.Lambda(
      ['id', 'data'],
      q.Let(
        {
          offerRef: q.Ref(q.Collection('Offer'), q.Var('id')),
          offer: q.Get(q.Var('offerRef')),
          locationType: q.Select(['data', 'locationType'], q.Var('offer')),
          profileRef: q.CurrentIdentity(),
          profile: q.Get(q.Var('profileRef')),
        },
        q.Do(
          q.Update(q.Var('offerRef'), {
            data: q.Merge(
              q.Select(['data'], q.Var('offer')),
              Coalesce(q.Var('data'), {})
            ),
          }),
          q.If(
            q.Equals(q.Var('locationType'), LocationType.Neighborhood),
            UpsertActivity(
              q.Var('profile'),
              {
                key: q.Format('OfferCreated|%s', q.Var('id')),
                timestamp: q.Now(),
                type: ActivityType.OfferCreated,
                metadata: {
                  offer: q.Var('offerRef'),
                },
              },
              true
            ),
            null
          ),
          q.Var('offer')
        )
      )
    )
  ),
}

export default updateOffer
