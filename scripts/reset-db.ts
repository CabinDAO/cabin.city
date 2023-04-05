import { faunaServerClient } from '../lib/fauna-server/faunaServerClient'
import { query as q } from 'faunadb'

async function resetDb() {
  console.info('Resetting database...')

  await faunaServerClient.query(
    q.Map(
      q.Paginate(q.Collections()),
      q.Lambda(
        'collection',
        q.Map(
          q.Paginate(q.Documents(q.Var('collection')), {
            size: 9999,
          }),
          q.Lambda(['ref'], q.Delete(q.Var('ref')))
        )
      )
    )
  )
}

resetDb()
