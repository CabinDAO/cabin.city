import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import Link from 'next/link'
import {
  Proposal,
  useSnapshot,
  Vote,
} from '@/components/contexts/SnapshotContext'
import useEns from '@/components/hooks/useEns'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileVotersResponse } from '@/utils/types/profile'
import styled from 'styled-components'
import { balanceToVotes, shortenedAddress } from '@/utils/display-utils'
import { Body1, H2 } from '@/components/core/Typography'
import { CopyToClipboard } from '@/components/core/CopyToClipboard'
import { Tooltip } from '@/components/core/Tooltip'
import Icon from '@/components/core/Icon'
import { Avatar } from '@/components/profile/Avatar'

const breakpoint = 500

export const VoteResultList = ({ proposal }: { proposal: Proposal }) => {
  const { useGet } = useBackend()
  const { width } = useWindowSize()
  const { getVotesForProposal } = useSnapshot()
  const [votes, setVotes] = useState<Vote[]>([])

  const { data } = useGet<ProfileVotersResponse>(
    votes.length ? 'api_profile_voters' : null,
    {
      addresses: votes.map((vote) => vote.voter.toLowerCase()).join(','),
    }
  )
  const voterProfiles = !data || 'error' in data ? {} : data.profiles

  useEffect(() => {
    getVotesForProposal(proposal.id).then((votes) => {
      votes.sort((a, b) => b.vp - a.vp)
      setVotes(votes)
    })
  }, [proposal.id, getVotesForProposal])

  if (!votes) return null

  return (
    <Container>
      <H2>Votes</H2>
      <Votes>
        {votes.map((vote) => {
          const voterAddress = vote.voter.toLowerCase()
          const choiceText = voteToText({ vote, proposal })
          const vp = balanceToVotes(vote.vp)

          const voter = (
            <Voter key={`${vote.id}-voter`}>
              {voterProfiles[voterAddress] ? (
                <CabinVoter
                  name={voterProfiles[voterAddress].name}
                  externId={voterProfiles[voterAddress].externId}
                  avatarCfId={voterProfiles[voterAddress].avatarCfId}
                />
              ) : (
                <VoterInfo address={vote.voter} />
              )}
            </Voter>
          )
          const choiceAndReason = (
            <ChoiceAndReason key={`${vote.id}-choice`}>
              <ChoiceContainer>
                <Tooltip
                  tooltip={choiceText}
                  position="top"
                  open={false}
                  paragraph
                  width={width > breakpoint ? `min(35rem, auto)` : 'auto'}
                >
                  <ChoiceText>{choiceText}</ChoiceText>
                </Tooltip>
              </ChoiceContainer>
              {vote.reason && (
                <Reason>
                  <Tooltip
                    tooltip={`Reason: ${vote.reason}`}
                    position="top"
                    open={false}
                    paragraph
                    width={
                      width > breakpoint
                        ? 'min(50rem, 60vw)'
                        : 'min(30rem, 80vw)'
                    }
                    align={'start'}
                  >
                    <Icon name="snapshot-reason" size={2.4} />
                  </Tooltip>
                </Reason>
              )}
            </ChoiceAndReason>
          )
          const numVotes = (
            <NumVotes key={`${vote.id}-votes`}>
              <Tooltip
                tooltip={`${vote.vp} ₡ABIN`}
                position="top"
                open={false}
                paragraph
              >
                <Body1>{`${vp} ${vp === '1' ? 'vote' : 'votes'}`}</Body1>
              </Tooltip>
            </NumVotes>
          )

          return (
            <>
              {width < breakpoint ? (
                <ResultRow>
                  <ResultRowTop>
                    {voter}
                    {numVotes}
                  </ResultRowTop>
                  {choiceAndReason}
                </ResultRow>
              ) : (
                <>
                  {voter}
                  {choiceAndReason}
                  {numVotes}
                </>
              )}
            </>
          )
        })}
      </Votes>
    </Container>
  )
}

const ResultRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const ResultRowTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`

const CabinVoter = ({
  name,
  externId,
  avatarCfId,
}: {
  name: string
  externId: string
  avatarCfId: string
}) => {
  return (
    <VoterLink href={`/profile/${externId}`}>
      <Avatar srcCfId={avatarCfId} size={2} />
      <Body1>{name}</Body1>
    </VoterLink>
  )
}

const VoterLink = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`

const VoterInfo = ({ address }: { address: string }) => {
  const { ens } = useEns(address)
  return (
    <CopyToClipboard text={ens || address || ''}>
      <Body1>{ens || shortenedAddress(address) || ''}</Body1>
    </CopyToClipboard>
  )
}

export const voteToText = ({
  vote,
  proposal,
}: {
  vote: Vote
  proposal: Proposal
}) => {
  const chosen = Object.entries(vote.choice)
    .map(([choice, vp]) => ({
      text: proposal.choices[parseInt(choice) - 1],
      vp: vp,
    }))
    .filter(({ vp }) => vp > 0)

  chosen.sort((a, b) => b.vp - a.vp)

  const totalVp = chosen.reduce((acc, c) => acc + c.vp, 0)

  return chosen
    .map(
      (choice) => `${percentForChoice(choice.vp, totalVp)}% for ${choice.text}`
    )
    .join(', ')
}

export const percentForChoice = (votes: number, total: number) => {
  return votes ? ((votes / total) * 100).toFixed(1).replace(/\.0$/, '') : '0'
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Votes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media screen and (min-width: ${breakpoint}px) {
    display: grid;
    grid-template-columns: max-content auto max-content;
    row-gap: 2rem;
    column-gap: 1.6rem;
  }
`

const NumVotes = styled.div`
  text-align: right;
  white-space: nowrap;
  /* grid-area: votes; */
`

const Voter = styled.div`
  white-space: nowrap;
  /* grid-area: voter; */
`

const ChoiceAndReason = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`

const Reason = styled.div`
  flex-shrink: 0;
  width: 2rem;
`

const ChoiceContainer = styled.div`
  width: 0;
  flex: 1;
  max-width: fit-content;
`

const ChoiceText = styled(Body1)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: fit-content;
`
