import { useEffect, useState } from 'react'
import { useError } from '@/components/hooks/useError'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useUser } from '@/components/auth/useUser'
import Link from 'next/link'
import snapshot from '@snapshot-labs/snapshot.js'
import {
  Proposal,
  Vote,
  useSnapshot,
} from '@/components/contexts/SnapshotContext'
import * as Sentry from '@sentry/nextjs'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { Body1, H2 } from '@/components/core/Typography'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { balanceToVotes } from '@/utils/display-utils'
import Icon from '@/components/core/Icon'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { voteToText } from '@/components/vote/VoteResultList'
import { InputTextArea } from '@/components/core/InputTextArea'

const MAX_REASON_LENGTH = 300

const snapshotClient = new snapshot.Client712('https://hub.snapshot.org')

export const VoteInput = ({ proposal }: { proposal: Proposal }) => {
  const { user } = useUser()
  const { connectWallet } = usePrivy()
  const { wallets } = useWallets()
  const { showError } = useError()
  const {
    userVotes,
    userVotesLoaded,
    reloadUserVotes,
    reloadProposals,
    canVote,
    getVotingPower,
  } = useSnapshot()

  const [myLastVote, setMyLastVote] = useState<Vote | null>(null)
  const [votingPower, setVotingPower] = useState(0)
  const [votingInProgress, setVotingInProgress] = useState(false)
  const [justVoted, setJustVoted] = useState(false)
  const [revoting, setRevoting] = useState(false)
  const [choices, setChoices] = useState<{
    [key: string]: number
  }>({})
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (!canVote || !user?.walletAddress) return
    const vote = userVotes.find((v) => v.proposal.id === proposal.id) || null
    setMyLastVote(vote)
    if (vote?.choice) {
      setChoices(vote.choice)
    }
  }, [userVotes, canVote, user?.walletAddress, proposal.id])

  useEffect(() => {
    if (!canVote || !user?.walletAddress) return
    getVotingPower(proposal.id, user.walletAddress).then((vp) => {
      setVotingPower(vp)
    })
  }, [canVote, user?.walletAddress, proposal.id, getVotingPower])

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
    if (!wallet) {
      showError('No connected wallets found')
      return
    }

    const sumVotes = Object.values(choices).reduce((acc, curr) => acc + curr, 0)
    if (sumVotes <= 0) {
      showError('Vote for at least one choice.')
      return
    }

    const web3 = await wallet.getEthersProvider()
    const [account] = await web3.listAccounts()
    try {
      setVotingInProgress(true)
      await snapshotClient.vote(web3, account, {
        space: proposal.space.id,
        proposal: proposal.id,
        type: 'quadratic',
        choice: Object.fromEntries(
          Object.entries(choices).filter(([, value]) => value > 0)
        ),
        reason: reason.trim() || undefined,
        app: 'cabin.city',
      })
      setJustVoted(true)
      reloadUserVotes()
      reloadProposals()
    } catch (e: unknown) {
      console.log(e)
      if (typeof e === 'object' && e !== null && 'error_description' in e) {
        showError(`Error: ${e.error_description}`)
      } else if (e instanceof Error) {
        Sentry.captureException(e)
        showError(`Error: ${e.message || e}`)
      } else {
        Sentry.captureException(e)
      }
    }
    setVotingInProgress(false)
  }

  if (proposal.state !== 'active') {
    return null
  }

  if (!user)
    return (
      <AuthenticatedLink>
        <Button>Log in to Vote</Button>
      </AuthenticatedLink>
    )

  if (!canVote) {
    return null
  }

  if (!userVotesLoaded) {
    return <LoadingSpinner />
  }

  if (justVoted) {
    return (
      <Container>
        <H2>Hooray, you voted!</H2>
        <Body1>
          <Button variant="tertiary" onClick={() => setJustVoted(false)}>
            Change your vote
          </Button>
        </Body1>
      </Container>
    )
  }

  if (myLastVote && !revoting) {
    return (
      <>
        <H2>
          Your Vote
          <span
            title="Change your vote"
            onClick={() => {
              setRevoting(true)
              setJustVoted(false)
            }}
            style={{
              cursor: 'pointer',
              marginLeft: '1rem',
              // border: 'solid 1px black',
              padding: '0 0.5rem',
            }}
          >
            <Icon name="pencil" size={1.4} inline />
          </span>
        </H2>
        <Body1>{voteToText({ vote: myLastVote, proposal })}</Body1>
      </>
    )
  }

  return (
    <Container>
      <H2>{revoting ? 'Change' : 'Cast'} your vote</H2>
      <Body1>
        Your {balanceToVotes(votingPower)}{' '}
        {votingPower === 1 ? 'vote' : 'votes'} will be split among one or more
        of the choices below according to the percentages you choose.
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

      {proposal.choices.map((choice: string, i: number) => {
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

      <InputTextArea
        label="Reason"
        value={reason}
        onChange={(e) => {
          const text = e.target.value
          if (text.length <= MAX_REASON_LENGTH && text.length >= 0) {
            setReason(text)
          }
        }}
        placeholder="Share your reason (optional)"
        helperText={`${reason.length}/${MAX_REASON_LENGTH}`}
      />

      {wallets.length ? (
        <>
          <Button onClick={castVote} disabled={votingInProgress}>
            {votingInProgress ? (
              <>
                <LoadingSpinner />
                &nbsp; {/* this keeps the button height from collapsing */}
              </>
            ) : (
              'Vote'
            )}
          </Button>
          {revoting && (
            <Button variant="tertiary" onClick={() => setRevoting(false)}>
              Cancel
            </Button>
          )}
        </>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet to Vote</Button>
      )}
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
    background: ${({ theme }) => theme.colors.gray}33;
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
