import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedMatch } from '../lib/PaginatedMatch'
import { GetOffersMatch } from '../lib/GetOffersMatch'

const getOffers: FunctionResource = {
  name: 'get_offers',
  body: q.Query(
    q.Lambda(
      ['input', 'size', 'after', 'before'],
      q.Let(
        {
          offersMatch: GetOffersMatch(q.Var('input')),
        },
        PaginatedMatch(
          q.Join(
            q.Var('offersMatch'),
            q.Lambda(
              ['endDate', 'ref'],
              q.Match(q.Index('offers_sort_by_locationType'), q.Var('ref'))
            )
          ),
          q.Var('size'),
          q.Var('after'),
          q.Var('before'),
          // Select the 3nd element in the index (the ref)
          q.Select(2, q.Var('value'))
        )
      )
    )
  ),
}

export default getOffers
