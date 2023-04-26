import { query as q } from 'faunadb'
import { faunaServerClient } from '../lib/fauna-server/faunaServerClient'
import { LocationType, OfferType } from '../generated/graphql'
import { addMonths, formatISO } from 'date-fns'

const range = Array.from({ length: 100 }, (x, i) => i)

const offers = range.map((i) => {
  const offerType = Object.values(OfferType)[i % 3]
  const title = `Offer ${i}`
  const startDate = formatISO(new Date())
  const endDate = formatISO(addMonths(new Date(), Math.random() * 4))
  const locationType = Object.values(LocationType)[i % 2]

  return {
    offerType,
    title,
    startDate,
    endDate,
    locationType,
  }
})

async function generateOffers() {
  console.info('Generating offers...')

  await faunaServerClient.query(
    q.Let(
      {},
      q.Map(
        offers,
        q.Lambda(
          'offer',
          q.Create(q.Collection('Offer'), {
            data: {
              offerType: q.Select('offerType', q.Var('offer')),
              title: q.Select('title', q.Var('offer')),
              startDate: q.Time(q.Select('startDate', q.Var('offer'))),
              endDate: q.Time(q.Select('endDate', q.Var('offer'))),
              locationType: q.Select('locationType', q.Var('offer')),
              location: q.Select(
                [0, 1], // Select the 2nd value (ref) of the 1st location
                q.Paginate(
                  q.Match(
                    q.Index('locations_by_location_type'),
                    q.Select('locationType', q.Var('offer')),
                    true
                  ),
                  { size: 1 }
                )
              ),
            },
          })
        )
      )
    )
  )
}

generateOffers()
