import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { DeleteOffer } from '../lib/DeleteOffer'

const deleteLocation: FunctionResource = {
  name: 'delete_location',
  body: q.Query(
    q.Lambda(
      ['id'],
      q.Let(
        {
          locationRef: q.Ref(q.Collection('Location'), q.Var('id')),
          location: q.Get(q.Var('locationRef')),
          profileRef: q.CurrentIdentity(),
          deleteOffers: q.Map(
            q.Paginate(
              q.Match(
                q.Index('location_offers_by_location'),
                q.Var('locationRef')
              )
            ),
            q.Lambda(
              ['offerRef'],
              DeleteOffer(q.Var('offerRef'), q.Var('profileRef'))
            )
          ),
          deleteLocationVotes: q.Map(
            q.Paginate(
              q.Match(
                q.Index('locationVote_location_by_location'),
                q.Var('locationRef')
              )
            ),
            q.Lambda(['voteRef'], q.Delete(q.Var('voteRef')))
          ),
          deleteActivities: q.Map(
            q.Paginate(
              q.Match(q.Index('activities_by_profile'), q.Var('profileRef')),
              {
                size: 100000,
              }
            ),
            q.Lambda(
              'value',
              q.Let(
                {
                  activityRef: q.Select(1, q.Var('value')),
                  activityLocationRef: q.Select(
                    ['data', 'metadata', 'location'],
                    q.Get(q.Var('activityRef')),
                    null
                  ),
                },
                q.If(
                  q.Equals(q.Var('activityLocationRef'), q.Var('locationRef')),
                  q.Delete(q.Var('activityRef')),
                  null
                )
              )
            )
          ),
        },
        q.Delete(q.Var('locationRef'))
      )
    )
  ),
}

export default deleteLocation
