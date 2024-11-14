import { useState } from 'react'
import { useError } from '@/components/hooks/useError'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useUser } from '@/components/auth/useUser'
import Link from 'next/link'
import snapshot from '@snapshot-labs/snapshot.js'
import { isProd } from '@/utils/dev'
import { Proposal } from '@/components/vote/ProposalView'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { Body1, H2 } from '@/components/core/Typography'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { balanceToVotes } from '@/utils/display-utils'

const snapshotClient = new snapshot.Client712('https://hub.snapshot.org')

export const VoteSection = ({ proposal }: { proposal: Proposal }) => {
  const { user } = useUser()
  const { user: privyUser } = usePrivy()
  const { wallets } = useWallets()
  const { showError } = useError()
  const [didVote, setDidVote] = useState(false)
  const [choices, setChoices] = useState<{
    [key: string]: number
  }>({})

  const propIsActive = proposal.state === 'active'

  const canVote = isProd
    ? privyUser &&
      privyUser.wallet?.walletClientType === 'privy' &&
      (user?.cabinTokenBalanceInt || 0) > 0
    : true

  const updateVoteCount = (choiceIndex: number, direction: 'up' | 'down') => {
    const currentCount = choices[choiceIndex] || 0
    const newCount = currentCount + (direction === 'up' ? 1 : -1)
    if (newCount < 0 || newCount > 99) return
    setChoices({
      ...choices,
      [choiceIndex]: newCount,
    })
  }

  const castVote = async () => {
    const wallet = wallets[0]
    if (!wallet) return

    const sum = Object.values(choices).reduce((acc, curr) => acc + curr, 0)
    if (sum <= 0) {
      showError('Vote for at least one choice.')
      return
    }

    const web3 = await wallet.getEthersProvider()
    const [account] = await web3.listAccounts()
    try {
      const receipt = await snapshotClient.vote(web3, account, {
        space: proposal.space.id,
        proposal: proposal.id,
        type: 'quadratic',
        choice: choices,
        // reason: 'Choice 1 make lot of sense',
        app: 'cabin.city',
      })
      console.log(receipt)
      setDidVote(true)
    } catch (e: any) {
      showError(`Error: ${e.error_description || e.message || e}`)
    }
  }

  if (!user) return null

  if (!canVote || !propIsActive) {
    return (
      <Link
        href={`https://snapshot.org/#/${proposal.space.id}/proposal/${proposal.id}`}
        target="_blank"
        rel="noopener"
      >
        <Button variant="secondary">
          {propIsActive ? 'Vote' : 'View'} on Snapshot
        </Button>
      </Link>
    )
  }

  if (didVote) {
    return (
      <Container>
        <H2>Hooray, you voted!</H2>
        <Body1>
          See voting results on{' '}
          <Link
            href={`https://snapshot.org/#/${proposal.space.id}/proposal/${proposal.id}`}
            target="_blank"
            rel="noopener"
            style={{ textDecoration: 'underline' }}
          >
            Snapshot
          </Link>
          .
        </Body1>
        <Body1>
          <Button variant="tertiary" onClick={() => setDidVote(false)}>
            Change your vote
          </Button>
        </Body1>
      </Container>
    )
  }

  return (
    <Container>
      <H2>Cast your vote</H2>
      <Body1>
        Your {balanceToVotes(user.cabinTokenBalanceInt)} votes will be split
        among one or more of the choices below according to the percentages you
        choose.
      </Body1>
      <Body1>
        Use the + and - buttons to adjust your vote for each choice.
      </Body1>
      <Body1>
        <Link
          href={EXTERNAL_LINKS.GOVERNANCE_DOCS}
          target="_blank"
          rel="noopener"
          style={{ textDecoration: 'underline' }}
        >
          Learn more about Cabin governance here
        </Link>
        .
      </Body1>

      {proposal.choices.map((choice, i) => {
        const index = i + 1 // snapshot uses 1-based indexing for choices
        const numerator = choices[index] || 0
        const denominator = Object.values(choices).reduce(
          (acc, curr) => acc + curr,
          0
        )
        const percent = percentForChoice(choices, index)
        return (
          <OptionRow
            key={choice}
            selected={choices[index] > 0}
            fillPercent={percent}
          >
            <ChoiceText>{choice}</ChoiceText>
            <RowControls>
              <PlusMinusButton
                variant="tertiary"
                onClick={() => updateVoteCount(index, 'down')}
                disabled={choices[index] <= 0}
              >
                -
              </PlusMinusButton>
              <Count>
                {choices[index] ? (
                  <Fraction numerator={numerator} denominator={denominator} />
                ) : (
                  0
                )}
              </Count>
              <PlusMinusButton
                variant="tertiary"
                onClick={() => updateVoteCount(index, 'up')}
              >
                +
              </PlusMinusButton>
              <Percent>{percent}%</Percent>
            </RowControls>
          </OptionRow>
        )
      })}
      <Button onClick={castVote}>Vote</Button>
    </Container>
  )
}

const percentForChoice = (
  choices: { [key: string]: number },
  index: number
) => {
  return choices[index]
    ? (
        (choices[index] /
          Object.values(choices).reduce((acc, curr) => acc + curr, 0)) *
        100
      )
        .toFixed(1)
        .replace(/\.0$/, '')
    : '0'
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  font-size: 1.8rem;
`

const OptionRow = styled.div<{ selected?: boolean; fillPercent?: string }>`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
  padding: 0 1.4rem;
  border: 1px solid
    ${({ theme, selected }) => theme.colors.gray + (selected ? 'ff' : '44')};
  border-radius: 3rem;
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
    background: ${({ theme }) => theme.colors.gray}11;
    z-index: 0;
    transition: width 0.2s ease-in-out;
  }
`

const ChoiceText = styled(Body1)`
  display: flex;
  flex: 1;
  z-index: 1;
  max-height: 100%;
`
const RowControls = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex: 0;
  align-items: center;
  z-index: 1;
`

const PlusMinusButton = styled(Button)`
  padding: 0.9rem 1.3rem;
  border-top: 0;
  border-bottom: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.gray}44;
  border-right: 1px solid ${({ theme }) => theme.colors.gray}44;
  background: transparent !important;
`

const Count = styled(Body1)`
  width: 2.5rem;
  text-align: center;
`

const Percent = styled(Body1)`
  width: 6.5rem;
  text-align: right;
  font-weight: 700;
`

const Fraction = ({
  numerator,
  denominator,
}: {
  numerator: number
  denominator: number
}) => {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span
        style={{
          fontSize: '0.8em',
          display: 'inline-flex',
          flexDirection: 'column',
          textAlign: 'center',
          lineHeight: '1.1',
        }}
      >
        <span>{numerator}</span>
        <span style={{ borderTop: '1px solid currentColor' }}>
          {denominator}
        </span>
      </span>
    </span>
  )
}
