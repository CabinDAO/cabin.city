import { LocationVoteModal } from '../core/LocationVoteModal'
import { useModal } from './useModal'
import { useCallback } from 'react'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import events from '@/lib/googleAnalytics/events'
import { LocationVoteParams } from '@/pages/api/v2/location/vote'
import { ProfileVotesResponse } from '@/pages/api/v2/profile/votes'
import { useBackend } from '@/components/hooks/useBackend'

export const useLocationVote = (afterVote?: () => void) => {
  const { showModal } = useModal()
  const { confirmLoggedIn } = useConfirmLoggedIn()
  const { post } = useBackend()

  const voteForLocation = useCallback(
    (location: LocationVoteModalWithDataProps['location']) => {
      events.voteModalEvent(location.externId)
      confirmLoggedIn(() => {
        showModal(() => (
          <LocationVodalModalWithData
            location={location}
            onCastVotes={async (reqBody: LocationVoteParams) => {
              return post('LOCATION_VOTE', reqBody).then((res) => {
                if (res.votes) {
                  afterVote?.()
                  // TODO: we used to refetch vote count here?
                } else {
                  throw new Error('Error casting votes')
                }
              })
            }}
          />
        ))
      })
    },
    [showModal, confirmLoggedIn, afterVote, post]
  )

  return { voteForLocation }
}

interface LocationVoteModalWithDataProps {
  location: {
    externId: string
    name?: string | null | undefined
    publishedAt?: string | null | undefined
  }
  onCastVotes: (reqBody: LocationVoteParams) => Promise<unknown> | void
}

const LocationVodalModalWithData = (props: LocationVoteModalWithDataProps) => {
  const { useGet } = useBackend()
  const { data, isLoading } = useGet<ProfileVotesResponse>(`PROFILE_VOTES`)

  const myVotes = data?.votes ?? []
  const votingPower = data?.votingPower ?? 0

  return (
    <LocationVoteModal
      {...props}
      myVotes={myVotes}
      votingPower={votingPower}
      onCastVotes={props.onCastVotes}
      isLoading={isLoading}
    />
  )
}
