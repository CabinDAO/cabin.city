import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const locationsSortedByVoteCountDesc: IndexResource = {
  name: 'locations_sorted_by_vote_count_desc',
  source: {
    collection: q.Collection('Location'),
    fields: {
      isPublished: q.Query(
        q.Lambda(
          'locationDoc',
          q.Not(
            q.IsNull(q.Select(['data', 'publishedAt'], q.Var('locationDoc')))
          )
        )
      ),
    },
  },
  terms: [
    {
      binding: 'isPublished',
    },
  ],
  values: [{ field: ['data', 'voteCount'], reverse: true }, { field: ['ref'] }],
}

export default locationsSortedByVoteCountDesc
