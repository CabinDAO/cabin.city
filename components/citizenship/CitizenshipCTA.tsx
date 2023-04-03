import { CitizenshipStatus } from '@/generated/graphql'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Button } from '../core/Button'
import Icon from '../core/Icon'
import { Body2, H2 } from '../core/Typography'

type CTAConfig = {
  title: string
  description: string
  button: () => ReactElement
}

interface CitizenshipCTAProps {
  status: CitizenshipStatus | undefined | null
  onClick(): void
}

export const CitizenshipCTA = ({ status, onClick }: CitizenshipCTAProps) => {
  let config: CTAConfig = {} as CTAConfig

  if (!status) {
    config = {
      title: 'Signal Interest',
      description:
        'Become eligible for Citizenship when an active citizen vouches for you. Help them discover you by signaling interest.',
      button: () => (
        <Button variant="primary" onClick={onClick}>
          Signal Interest
        </Button>
      ),
    } as CTAConfig
  } else if (status === CitizenshipStatus.VouchRequested) {
    config = {
      title: 'Signal Interest',
      description:
        'Become eligible for Citizenship when an active citizen vouches for you. Help them discover you by signaling interest.',
      button: () => (
        <Button
          startAdornment={<Icon name="thumb-up-outline" size={1.4} />}
          variant="tertiary"
          onClick={onClick}
        >
          Signaled
        </Button>
      ),
    }
  } else if (status === CitizenshipStatus.Vouched) {
    config = {
      title: 'Citizenship eligible pending launch',
      description:
        'When you create a citizenship NFT, it becomes unalterable proof that serves as evidence of your citizenship. We’ll guide you through the steps.',
      button: () => (
        <Button
          variant="primary"
          onClick={onClick}
          endAdornment={<Icon name="lock" size={1.1} />}
        >
          Mint
        </Button>
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
