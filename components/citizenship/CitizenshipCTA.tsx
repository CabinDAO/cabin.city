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
          startAdornment={<Icon name="thumb-up" size={1.4} />}
          variant="tertiary"
          onClick={onClick}
        >
          Signaled
        </Button>
      ),
    }
  } else if (status === CitizenshipStatus.Vouched) {
    config = {
      title: 'Citizenship eligible',
      description:
        'When you create a citizenship NFT, it becomes unalterable proof that serves as evidence of your citizenship. We’ll guide you through the steps.',
      button: () => (
        <Button variant="primary" onClick={onClick}>
          Mint now
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
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const CTADescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  max-width: 60%;
  align-items: flex-start;
  justify-content: center;
`
