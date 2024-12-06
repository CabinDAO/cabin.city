import { useEffect, useState } from 'react'
import {
  Proposal,
  useSnapshot,
  Vote,
} from '@/components/contexts/SnapshotContext'
import styled from 'styled-components'
import { Body1, H2 } from '@/components/core/Typography'
import { balanceToVotes, shortenedAddress } from '@/utils/display-utils'
import { CopyToClipboard } from '@/components/core/CopyToClipboard'
import useEns from '@/components/hooks/useEns'
import { Tooltip } from '@/components/core/Tooltip'
import theme from '@/styles/theme'

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
            <Row key={vote.id}>
              <VoteResult>
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
              </VoteResult>
              <VoteCount title={`${vote.vp} ₡ABIN`}>
                <Body1>{`${vp} ${vp === '1' ? 'vote' : 'votes'}`}</Body1>
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

export const voteToText = ({
  vote,
  proposal,
}: {
  vote: Vote
  proposal: Proposal
}) => {
  const chosen = Object.entries(vote.choice).map(([choice, vp]) => ({
    text: proposal.choices[parseInt(choice) - 1],
    vp: vp,
  }))

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

const breakpoint = '500px'

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
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 1.4rem;
  border-radius: 1rem;

  @media only screen and (min-width: ${breakpoint}) {
    align-items: center;
  }
`

const VoteResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-start;
  width: calc(100% - 8rem);

  @media only screen and (min-width: ${breakpoint}) {
    flex-direction: row;
    align-items: baseline;
    flex: 50;
    gap: 2rem;
  }

  ${({ theme }) => theme.bp.lg} {
    gap: 4rem;
  }
`

const StyledVoter = styled.div`
  flex-shrink: 0;
  width: 12rem;
`

const ChoiceContainer = styled.div`
  width: 100%;
  @media only screen and (min-width: ${breakpoint}) {
    width: calc(100% - 14rem);
  }
`

const ChoiceText = styled(Body1)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const VoteCount = styled.div`
  flex-shrink: 0;
  width: 8rem;
  text-align: right;
`
