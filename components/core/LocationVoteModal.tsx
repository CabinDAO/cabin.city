import styled from 'styled-components'
import { ModalContainer } from './modals/ModalContainer'
import { ModalContent } from './modals/ModalContent'
import { ModalTitle } from './modals/ModalTitle'
import { Body2, Caption, H4, Overline, Subline1 } from './Typography'
import { LocationVoteSelector } from './LocationVoteSelector'
import { Button } from './Button'
import Icon from './Icon'
import { useEffect, useState } from 'react'
import { useModal } from '../hooks/useModal'
import { isNil } from '@/lib/isNil'
import IconButton from './IconButton'

interface LocationVoteModalProps {
  location: Location
  votingPower: number | null | undefined
  myVotes: LocationVote[]
  onCastVotes: (
    voteCountsByLocationId: VoteModifiersByLocationId
  ) => Promise<unknown> | void
  isLoading?: boolean
}

interface Location {
  _id: string
  name?: string | null | undefined
}

interface LocationVote {
  location: Location
  count: number
}

interface VoteCountsByLocationId {
  [key: string]: number
}

interface VoteModifiersByLocationId {
  [key: string]: number
}

enum ContentState {
  Default,
  Info,
}

export const LocationVoteModal = (props: LocationVoteModalProps) => {
  const [contentState, setContentState] = useState(ContentState.Default)
  return (
    <LocationVoteModalContainer>
      <ModalTitle
        startAdornment={
          contentState === ContentState.Info ? (
            <IconButton
              animated
              icon="back-arrow"
              color="green900"
              size={2}
              onClick={() => setContentState(ContentState.Default)}
            />
          ) : undefined
        }
        text="Vote"
        endAdornment={
          contentState === ContentState.Default ? (
            <IconButton
              animated
              icon="info"
              color="green900"
              size={2}
              onClick={() => setContentState(ContentState.Info)}
            />
          ) : null
        }
      />
      {props.isLoading ? (
        <ModalContent />
      ) : contentState === ContentState.Default ? (
        <LocationVoteModalBody {...props} />
      ) : contentState === ContentState.Info ? (
        <LocationVoteModalInfo />
      ) : null}
    </LocationVoteModalContainer>
  )
}

const LocationVoteModalBody = (props: LocationVoteModalProps) => {
  const { location, votingPower, myVotes, onCastVotes } = props
  const [showOtherLocations, setShowOtherLocations] = useState(false)
  const [isCastingVotes, setIsCastingVotes] = useState(false)
  const [didErrorOccur, setDidErrorOccur] = useState(false)
  const { hideModal } = useModal()
  const [voteCountsByLocationId, setVoteCountsByLocationId] =
    useState<VoteCountsByLocationId>(
      myVotes.reduce(
        (acc, vote) => ({
          ...acc,
          [vote.location._id]: vote.count,
        }),
        { [location._id]: 0 }
      )
    )

  const distributedVotes = Object.values(voteCountsByLocationId).reduce(
    (acc, count) => acc + count,
    0
  )
  if (isNil(votingPower)) {
    throw new Error('Voting power is required')
  }
  const remainingVotes = votingPower - distributedVotes
  const exceededVotingPower = remainingVotes < 0

  useEffect(() => {
    if (exceededVotingPower) {
      setShowOtherLocations(true)
    }
  }, [exceededVotingPower])

  const otherLocations = myVotes
    .filter((vote) => vote.location._id !== location._id)
    .map((vote) => vote.location)

  const displayedLocations = [
    location,
    ...(showOtherLocations ? otherLocations : []),
  ]

  const handleCountChange = (locationId: string, count: number) => {
    setVoteCountsByLocationId({
      ...voteCountsByLocationId,
      [locationId]: count,
    })
  }

  const handleCastVotesButtonClick = async () => {
    setIsCastingVotes(true)
    try {
      // We only need to send the votes for locations that have changed
      const voteModifiersByLocationId = Object.entries(
        voteCountsByLocationId
      ).reduce((acc, [locationId, count]) => {
        const priorCount =
          myVotes.find((vote) => vote.location._id === locationId)?.count ?? 0

        const modifier = count - priorCount

        // We only need to include the modifier if it's non-zero
        if (Math.abs(modifier) > 0) {
          return {
            ...acc,
            [locationId]: modifier,
          }
        }
        return acc
      }, {} as VoteCountsByLocationId)

      await onCastVotes(voteModifiersByLocationId)
      hideModal()
    } catch (err) {
      console.error(err)
      setDidErrorOccur(true)
    } finally {
      setIsCastingVotes(false)
    }
  }

  return (
    <>
      <ModalContent>
        <Container>
          <VotingPowerContainer>
            <Subline1>Your voting power</Subline1>
            <VotingPowerData>
              <Caption>Total voting power</Caption>
              <Caption emphasized>{votingPower}</Caption>
            </VotingPowerData>
            <VotingPowerData>
              <Caption>Total distributed votes</Caption>
              <Caption emphasized>{distributedVotes}</Caption>
            </VotingPowerData>
            <VotingPowerData>
              <Caption>Remaining votes</Caption>
              <Caption emphasized>{remainingVotes}</Caption>
            </VotingPowerData>
          </VotingPowerContainer>
          <LocationsContainer>
            {displayedLocations.map((location) => (
              <LocationVoteSelector
                key={location._id}
                label={location.name}
                count={voteCountsByLocationId[location._id]}
                onCountChange={(count) =>
                  handleCountChange(location._id, count)
                }
                error={exceededVotingPower}
              />
            ))}
          </LocationsContainer>
          {!showOtherLocations && otherLocations.length > 0 && (
            <div>
              <RedistributeVotesButton
                onClick={() => setShowOtherLocations(true)}
              >
                <Overline>Redistribute votes</Overline>
                <Icon name="pencil" size={1.2} />
              </RedistributeVotesButton>
            </div>
          )}
          {exceededVotingPower && (
            <Caption emphasized $color="red600">
              You are exceeding your voting power by {-remainingVotes}
            </Caption>
          )}
        </Container>
      </ModalContent>
      <ModalActions>
        <CastVoteButton
          variant="primary"
          onClick={handleCastVotesButtonClick}
          disabled={isCastingVotes || exceededVotingPower}
        >
          {!isCastingVotes ? 'Cast vote' : 'Casting vote...'}
        </CastVoteButton>
        {didErrorOccur && (
          <ErrorContainer>
            <Caption emphasized $color="red600">
              An error occurred while casting your vote. Please try again.
            </Caption>
          </ErrorContainer>
        )}
      </ModalActions>
    </>
  )
}

const LocationVoteModalContainer = styled(ModalContainer)`
  height: min-content;
  max-height: 49vh;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

const VotingPowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border: ${({ theme }) => theme.border.light};
  padding: 1.6rem 1.2rem;
`

const VotingPowerData = styled.div`
  display: flex;
  justify-content: space-between;
`

const LocationsContainer = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(100px, 55%) minmax(100px, auto);
  grid-gap: 0.8rem;
`

// TOOD: Extract to a component in /modals
const ModalActions = styled.div`
  padding: 1.6rem 2.4rem;
  border-top: 1px solid ${({ theme }) => theme.colors.green900};
`

const RedistributeVotesButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const CastVoteButton = styled(Button)`
  width: 100%;
`

const ErrorContainer = styled.div`
  text-align: center;
  margin-top: 1.6rem;
`

const LocationVoteModalInfo = () => (
  <ModalContent>
    <InfoContainer>
      <H4>Show support for your favorite Neighborhoods and Outposts</H4>
      <Body2>
        Help the Neighborhoods and Outposts that are cultivating a safe,
        enjoyable, and quality experience climb the leaderboard. Your voting
        power is determined by the amount of ₡ABIN token you hold, which can be
        acquired by becoming a Citizen or contributing to the community over
        time. You may cast or redistribute your votes at any time.
      </Body2>
    </InfoContainer>
  </ModalContent>
)

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 4rem;
`
