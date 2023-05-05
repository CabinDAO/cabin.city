import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'

const createOffer: FunctionResource = {
  name: 'create_offer',
  body: q.Query(
    q.Lambda(
      ['input'],
      q.Let(
        {
          locationRef: q.Ref(
            q.Collection('Location'),
            q.Select(['locationId'], q.Var('input'))
          ),
          location: q.Get(q.Var('locationRef')),
          locationType: q.Select(['data', 'locationType'], q.Var('location')),
          offerType: q.Select(['offerType'], q.Var('input')),
        },
        q.Do(
          // Increment the offer count on the location
          q.Update(q.Var('locationRef'), {
            data: {
              offerCount: q.Add(
                q.Select(['data', 'offerCount'], q.Var('location')),
                1
              ),
            },
          }),
          // Create the offer
          q.Create(q.Collection('Offer'), {
            data: {
              offerType: q.Var('offerType'),
              location: q.Var('locationRef'),
              locationType: q.Var('locationType'),
            },
          })
        )
      )
    )
  ),
}

export default createOffer
