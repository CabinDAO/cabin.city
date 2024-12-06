import { useEffect, useState } from 'react'
import {
  Proposal,
  useSnapshot,
  Vote,
} from '@/components/contexts/SnapshotContext'
import useEns from '@/components/hooks/useEns'
import styled from 'styled-components'
import { balanceToVotes, shortenedAddress } from '@/utils/display-utils'
import { Body1, H2 } from '@/components/core/Typography'
import { CopyToClipboard } from '@/components/core/CopyToClipboard'
import { Tooltip } from '@/components/core/Tooltip'
import Icon from '@/components/core/Icon'

export const VoteResultList = ({ proposal }: { proposal: Proposal }) => {
  const { getVotesForProposal } = useSnapshot()
  const [votes, setVotes] = useState<Vote[]>([])

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
          const choiceText = voteToText({ vote, proposal })
          const vp = balanceToVotes(vote.vp)
          return (
            <>
              <Voter key={`${vote.id}-voter`}>
                <VoterInfo address={vote.voter} />
              </Voter>
              <ChoiceAndReason key={`${vote.id}-choice`}>
                <ChoiceContainer>
                  <Tooltip
                    tooltip={choiceText}
                    position="top"
                    open={false}
                    paragraph
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
                    >
                      <Icon name="snapshot-reason" size={2.4} />
                    </Tooltip>
                  </Reason>
                )}
              </ChoiceAndReason>
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
            </>
          )
        })}
      </Votes>
    </Container>
  )
}

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
  display: grid;
  grid-template-columns: max-content auto max-content;
  /* grid-template-areas:
    'voter result votes'
    'full full full'; */
  row-gap: 2rem;
  column-gap: 1.6rem;
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
