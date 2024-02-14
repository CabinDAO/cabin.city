import { CitizenshipStatus } from '@/utils/types/profile'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Button } from '../core/Button'
import { Body2, H2 } from '../core/Typography'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import events from '@/lib/googleAnalytics/events'

type CTAConfig = {
  title: string
  description: string
  button: () => ReactElement
}

interface CitizenshipCTAProps {
  status: CitizenshipStatus | undefined | null
  onClick(): void
  canMint: boolean
  profileId: string
}

export const CitizenshipCTA = ({
  status,
  onClick,
  canMint,
  profileId,
}: CitizenshipCTAProps) => {
  let config: CTAConfig = {} as CTAConfig

  if (canMint) {
    config = {
      title: 'Mint Citizenship',
      description:
        'When you create a citizenship NFT, it becomes unalterable proof that serves as evidence of your citizenship. We’ll guide you through the steps.',
      button: () => (
        <Button variant="primary" onClick={onClick}>
          Mint now
        </Button>
      ),
    }
  } else if (!status) {
    config = {
      title: 'Signal Interest',
      description:
        'You become eligible for Citizenship when an active citizen vouches for you. Help them discover you by signaling interest.',
      button: () => (
        <Button variant="primary" onClick={onClick}>
          Signal Interest
        </Button>
      ),
    } as CTAConfig
  } else if (status === CitizenshipStatus.VouchRequested) {
    config = {
      title: 'Earn a Vouch',
      description:
        'Introduce yourself in our Discord community and get involved in our various community calls to earn the endorsement of active Citizens.',
      button: () => (
        <a
          href={EXTERNAL_LINKS.VOUCH_REQUEST_DISCORD_CHANNEL}
          onClick={() => events.citizenshipShareDiscordEvent(profileId)}
          target="_blank"
          rel="noreferrer"
        >
          <Button>Share on Discord</Button>
        </a>
      ),
    }
  }

  if (!config.title) return null

  return (
    <CTAContainer>
      <CTADescription>
        <H2>{config.title}</H2>
        <Body2>{config.description}</Body2>
      </CTADescription>
      {config.button()}
    </CTAContainer>
  )
}

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.4rem;

  button {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 0;

    button {
      width: auto;
    }
  }
`

const CTADescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 100%;
  align-items: flex-start;
  justify-content: center;

  ${({ theme }) => theme.bp.md} {
    max-width: 55%;
    gap: 1.6rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 60%;
  }
`
