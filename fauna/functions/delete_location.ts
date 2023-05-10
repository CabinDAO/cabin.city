import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const deleteLocation: FunctionResource = {
  name: 'delete_location',
  body: q.Query(
    q.Lambda(
      ['id'],
      q.Let(
        {
          locationRef: q.Ref(q.Collection('Location'), q.Var('id')),
          location: q.Get(q.Var('locationRef')),
          deleteOffers: q.Map(
            q.Paginate(
              q.Match(
                q.Index('location_offers_by_location'),
                q.Var('locationRef')
              )
            ),
            q.Lambda(['offerRef'], q.Delete(q.Var('offerRef')))
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
        },
        q.Delete(q.Var('locationRef'))
      )
    )
  ),
}

export default deleteLocation
