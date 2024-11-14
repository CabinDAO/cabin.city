import { Proposal } from '@/components/vote/VoteView'
import styled from 'styled-components'
import { Body1 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'

export const VoteResults = ({
  proposal,
  brief,
}: {
  proposal: Proposal
  brief?: boolean
}) => {
  const choices = proposal.choices.map((choice, i) => ({
    key: i + 1,
    text: choice,
    votes: proposal.scores[i],
  }))

  const maxScore = Math.max(...Object.values(proposal.scores))

  if (maxScore === 0) {
    return null
  }

  const winner =
    choices.find((choice) => choice.votes === maxScore) || choices[0]

  if (proposal.choices.length != 2) {
    choices.sort((a, b) => b.votes - a.votes)
  }

  const choicesToShow = brief
    ? choices.slice(0, proposal.choices.length == 2 ? 2 : 1)
    : choices

  return (
    <Container>
      {Object.values(choicesToShow).map((choice) => {
        const percent = percentForChoice(choice.votes, proposal.scores_total)
        return (
          <Row key={choice.key} fillPercent={percent}>
            <ChoiceText>
              {proposal.state === 'closed' && choice.key === winner.key && (
                <Icon name="check" size={1.6} style={{ marginRight: '1rem' }} />
              )}
              {choice.text}
            </ChoiceText>
            <Percent>{percent}%</Percent>
          </Row>
        )
      })}
    </Container>
  )
}

const percentForChoice = (votes: number, totalVotes: number) => {
  return votes
    ? ((votes / totalVotes) * 100).toFixed(1).replace(/\.0$/, '')
    : '0'
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  font-size: 1.8rem;
`

const Row = styled.div<{ winner?: boolean; fillPercent?: string }>`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
  padding: 0 1.4rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 1rem;
  height: 4rem;

  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ fillPercent }) => fillPercent}%;
    height: 100%;
    background: ${({ theme }) => theme.colors.gray}40;
    z-index: 0;
    transition: width 0.2s ease-in-out;
  }
`

const ChoiceText = styled(Body1)`
  display: flex;
  flex: 1;
  z-index: 1;
  max-height: 100%;
  align-items: center;
`
const Percent = styled(Body1)`
  width: 6.5rem;
  text-align: right;
  font-weight: 700;
`
