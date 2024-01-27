import { LocationVoteModal } from '../core/LocationVoteModal'
import { useModal } from './useModal'
import { useCallback } from 'react'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { usePrivy } from '@privy-io/react-auth'
import events from '@/lib/googleAnalytics/events'
import { LocationVoteParams } from '@/pages/api/v2/location/vote'
import { apiGet, apiPost } from '@/utils/api/interface'
import { ProfileVotesResponse } from '@/pages/api/v2/profile/votes'
import { useBackend } from '@/components/hooks/useBackend'

export const useLocationVote = (afterVote?: () => void) => {
  const { showModal } = useModal()
  const { confirmLoggedIn } = useConfirmLoggedIn()
  const { getAccessToken } = usePrivy()

  const voteForLocation = useCallback(
    (location: LocationVoteModalWithDataProps['location']) => {
      events.voteModalEvent(location._id)
      confirmLoggedIn(() => {
        showModal(() => (
          <LocationVodalModalWithData
            location={location}
            onCastVotes={async (reqBody: LocationVoteParams) => {
              const token = await getAccessToken()
              return apiPost('LOCATION_VOTE', reqBody, token).then((res) => {
                if (res.ok) {
                  afterVote?.()
                  return apiGet('LOCATION_VOTE', { locationId: location._id })
                } else {
                  throw new Error('Error casting votes')
                }
              })
            }}
          />
        ))
      })
    },
    [showModal, confirmLoggedIn, afterVote, getAccessToken]
  )

  return { voteForLocation }
}

interface LocationVoteModalWithDataProps {
  location: {
    _id: string
    name?: string | null | undefined
    publishedAt?: Date | null | undefined
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
