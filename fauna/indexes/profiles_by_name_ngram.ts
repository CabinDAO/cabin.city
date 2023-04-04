import { query as q } from 'faunadb'
import { GenerateNgrams } from '../lib/GenerateNgrams'

const ProfilesByNameNgram = {
  name: 'profiles_by_name_ngram',
  source: {
    collection: q.Collection('Profile'),
    fields: {
      nameLetters: q.Query(
        q.Lambda(
          'itemDoc',
          GenerateNgrams(q.Select(['data', 'name'], q.Var('itemDoc')))
        )
      ),
    },
  },
  terms: [
    {
      binding: 'nameLetters',
    },
  ],
  values: [{ field: ['ref'] }],
}

export default ProfilesByNameNgram
