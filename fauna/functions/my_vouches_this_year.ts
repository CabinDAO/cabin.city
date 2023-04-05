import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PageToArray } from '../lib/PageToArray'

const myVouchesThisYear: FunctionResource = {
  name: 'my_vouches_this_year',
  body: q.Query(
    q.Lambda(
      [],
      q.Count(
        q.Filter(
          PageToArray(
            q.Paginate(
              q.Match(
                q.Index('profile_vouches_by_voucher'),
                q.CurrentIdentity()
              )
            )
          ),
          q.Lambda(
            'vouchRef',
            q.Equals(
              q.Year(q.Select(['ts'], q.Get(q.Var('vouchRef')))),
              q.Year(q.Now())
            )
          )
        )
      )
    )
  ),
}

export default myVouchesThisYear
