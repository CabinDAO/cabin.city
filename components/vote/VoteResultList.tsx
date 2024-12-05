import { useEffect, useState } from 'react'
import {
  Proposal,
  useSnapshot,
  Vote,
} from '@/components/contexts/SnapshotContext'
import styled from 'styled-components'
import { Body1, H2 } from '@/components/core/Typography'
import { percentForChoice } from '@/components/vote/VoteResultBars'
import { balanceToVotes, shortenedAddress } from '@/utils/display-utils'
import { CopyToClipboard } from '@/components/core/CopyToClipboard'
import useEns from '@/components/hooks/useEns'
import { Tooltip } from '@/components/core/Tooltip'

export const VoteResultList = ({ proposal }: { proposal: Proposal }) => {
  const { getVotesForProposal } = useSnapshot()

  const choices = proposal.choices.map((choice: string, i: number) => ({
    key: i + 1,
    text: choice,
    votes: proposal.scores[i] || 0,
  }))

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
          const choiceOrder = Object.values(choices)
            .sort((a, b) => vote.choice[b.key] || 0 - vote.choice[a.key] || 0)
            .filter((c) => vote.choice[c.key] > 0)
          const totalVotes = Object.values(vote.choice).reduce(
            (acc, curr) => acc + curr,
            0
          )
          const choiceText = choiceOrder
            .map(
              (choice) =>
                `${percentForChoice(
                  vote.choice[choice.key],
                  totalVotes
                )}% for ${choice.text}`
            )
            .join(', ')

          const vp = balanceToVotes(vote.vp)

          return (
            <Row key={vote.id}>
              <StyledVoter>
                <Voter address={vote.voter} />
              </StyledVoter>
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
              <VoteCount title={`${vote.vp} ₡ABIN`}>
                {`${vp} ${vp === '1' ? 'vote' : 'votes'}`}
              </VoteCount>
            </Row>
          )
        })}
      </Votes>
    </Container>
  )
}

const Voter = ({ address }: { address: string }) => {
  const { ens } = useEns(address)
  return (
    <CopyToClipboard text={ens || address || ''}>
      <Body1>{ens || shortenedAddress(address) || ''}</Body1>
    </CopyToClipboard>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
const Votes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 4rem;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1.4rem;
  border-radius: 1rem;
`

const StyledVoter = styled.div`
  flex-shrink: 0;
  width: 12rem;
`

const ChoiceContainer = styled.div`
  flex: 50;
  width: 15%;
`

const ChoiceText = styled(Body1)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const VoteCount = styled(Body1)`
  flex-grow: 1;
  flex-shrink: 1;
  width: 8rem;
  text-align: right;
`
