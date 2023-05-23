import { Expr, query as q } from 'faunadb'
import { faunaServerClient } from './faunaServerClient'
import { RefFromSet } from '@/fauna/lib/RefFromSet'
import { UpdateLocationTypeIfNecessary } from '@/fauna/lib/UpdateLocationTypeIfNecessary'

interface CastLocationVotesParams {
  profileId: string
  voteModifiersByLocationId: { [key: string]: number }
}

/*
 ** Cast votes for locations
 ** @param profileId - the id of the profile casting the votes
 ** @param votesByLocationId - an object with location ids as keys and vote counts as values
 ** @returns - metadata for all update operations
 */

export const castLocationVotes = async (params: CastLocationVotesParams) => {
  return faunaServerClient.query(
    q.Map(
      q.ToArray(params.voteModifiersByLocationId),
      q.Lambda(
        ['locationId', 'voteModifier'],
        q.Let(
          {
            locationRef: q.Ref(q.Collection('Location'), q.Var('locationId')),
            location: q.Get(q.Var('locationRef')),
            profileRef: q.Ref(q.Collection('Profile'), params.profileId),
          },
          q.Do(
            // Update the voteCount on the Location record
            q.Update(q.Var('locationRef'), {
              data: {
                voteCount: q.Add(
                  q.Select(['data', 'voteCount'], q.Var('location'), 0),
                  q.Var('voteModifier')
                ),
              },
            }),
            // Create or update a LocationVote record for this location/profile combination
            UpsertLocationVote(
              q.Var('locationRef'),
              q.Var('profileRef'),
              q.Var('voteModifier')
            ),
            UpdateLocationTypeIfNecessary(q.Var('locationRef'))
          )
        )
      )
    )
  )
}

const UpsertLocationVote = (
  locationRef: Expr,
  profileRef: Expr,
  voteModifierExpr: Expr
) =>
  q.Let(
    {
      locationVoteRef: RefFromSet(
        q.Match(
          q.Index('locationVote_by_location_and_profile'),
          locationRef,
          profileRef
        )
      ),
    },
    q.If(
      // if locationVote does not exist
      q.IsNull(q.Var('locationVoteRef')),
      // then create locationVote
      q.Create(q.Collection('LocationVote'), {
        data: {
          location: locationRef,
          profile: profileRef,
          count: voteModifierExpr,
        },
      }),
      // else update locationVote count
      q.Update(q.Var('locationVoteRef'), {
        data: {
          count: q.Add(
            q.Select(['data', 'count'], q.Get(q.Var('locationVoteRef')), 0),
            voteModifierExpr
          ),
        },
      })
    )
  )
