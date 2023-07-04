import {
  LocationVoteFragment,
  useGetLocationVoteCountsByIdsLazyQuery,
  useMyLocationVotesQuery,
} from '@/generated/graphql'
import { LocationVoteModal } from '../core/LocationVoteModal'
import { useModal } from './useModal'
import { useCallback } from 'react'
import { CastLocationVotesBody } from '@/pages/api/cast-location-votes'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { usePrivy } from '@privy-io/react-auth'
import events from '@/lib/googleAnalytics/events'

export const useLocationVote = (afterVote?: () => void) => {
  const { showModal } = useModal()
  const { confirmLoggedIn } = useConfirmLoggedIn()
  const { getAccessToken } = usePrivy()

  const [getLocationVoteCountsByIds] = useGetLocationVoteCountsByIdsLazyQuery({
    fetchPolicy: 'network-only',
  })

  const voteForLocation = useCallback(
    (props: Pick<LocationVoteModalWithDataProps, 'location'>) => {
      events.voteModalEvent(props.location._id)
      confirmLoggedIn(() => {
        showModal(() => (
          <LocationVodalModalWithData
            {...props}
            onCastVotes={async (
              voteModifiersByLocationId: CastLocationVotesBody
            ) => {
              const token = await getAccessToken()
              return fetch('/api/cast-location-votes', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(voteModifiersByLocationId),
              }).then((res) => {
                if (res.ok) {
                  afterVote?.()
                  return getLocationVoteCountsByIds({
                    variables: {
                      ids: Object.keys(voteModifiersByLocationId),
                    },
                  })
                } else {
                  throw new Error('Error casting votes')
                }
              })
            }}
          />
        ))
      })
    },
    [
      showModal,
      getLocationVoteCountsByIds,
      confirmLoggedIn,
      afterVote,
      getAccessToken,
    ]
  )

  return {
    voteForLocation,
  }
}

interface LocationVoteModalWithDataProps {
  location: {
    _id: string
    name?: string | null | undefined
    publishedAt?: Date | null | undefined
  }
  onCastVotes: (
    voteCountsByLocationId: CastLocationVotesBody
  ) => Promise<unknown> | void
}

const LocationVodalModalWithData = (props: LocationVoteModalWithDataProps) => {
  const { data, loading } = useMyLocationVotesQuery({
    fetchPolicy: 'network-only',
  })

  const myVotes =
    data?.me.locationVotes.data.filter((v): v is LocationVoteFragment => !!v) ??
    []
  const votingPower = data?.me.cabinTokenBalanceInt

  return (
    <LocationVoteModal
      {...props}
      myVotes={myVotes}
      votingPower={votingPower}
      onCastVotes={props.onCastVotes}
      isLoading={loading}
    />
  )
}
