import { Expr, query as q } from 'faunadb'
import { ToDoc } from './ToDoc'
import { ToRef } from './ToRef'
import { LocationType } from '../../generated/graphql'

/**
 * Checks if the location meets the criteria for being a neighborhood and updates the locationType if necessary.
 * @param locationExpr A `Ref` or a `Document` for a Location
 * @returns Document update metadata if the locationType was updated, otherwise null
 */
export const UpdateLocationTypeIfNecessary = (locationExpr: Expr) => {
  return q.Let(
    {
      location: ToDoc(locationExpr),
      locationRef: ToRef(locationExpr),
      newLocationType: q.If(
        MeetsCriteriaForNeighborhood(q.Var('location')),
        LocationType.Neighborhood,
        LocationType.Outpost
      ),
    },
    q.If(
      q.Not(
        q.Equals(
          q.Select(['data', 'locationType'], q.Var('location')),
          q.Var('newLocationType')
        )
      ),
      q.Do(
        // Update the denormalized locationType on all offers for this location
        q.Map(
          q.Paginate(
            q.Match(
              q.Index('location_offers_by_location'),
              q.Var('locationRef')
            )
          ),
          q.Lambda(
            'offer',
            q.Update(q.Var('offer'), {
              data: { locationType: q.Var('newLocationType') },
            })
          )
        ),
        // Update the location type
        q.Update(ToRef(q.Var('location')), {
          data: {
            locationType: q.Var('newLocationType'),
          },
        })
      ),
      null
    )
  )
}

const MeetsCriteriaForNeighborhood = (location: Expr) =>
  q.And(
    Has1000Votes(location),
    Has20MbpsInternet(location),
    Has4SleepingCapacity(location)
  )

const Has1000Votes = (location: Expr) =>
  q.GTE(q.Select(['data', 'voteCount'], location, 0), 1000)

const Has20MbpsInternet = (location: Expr) =>
  q.GTE(q.Select(['data', 'internetSpeedMbps'], location, 0), 20)

const Has4SleepingCapacity = (location: Expr) =>
  q.GTE(q.Select(['data', 'sleepCapacity'], location, 0), 4)
