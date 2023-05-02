import { Switch } from '@/components/core/Switch'
import { Body2, H3 } from '@/components/core/Typography'
import styled from 'styled-components'
import { EligibilityRequirements } from './EligibilityRequirements'

interface EligibilityProps {
  checked: boolean
  onEligibilityChange: (checked: boolean) => void
}

export const Eligibility = ({
  checked,
  onEligibilityChange,
}: EligibilityProps) => {
  return (
    <Container>
      <EligibilitySwitchContainer>
        <H3>Eligibility</H3>
        <EligibilityField>
          <Switch checked={checked} onChange={onEligibilityChange} />
          <StyledBody2>I want to limit who’s eligible to apply</StyledBody2>
        </EligibilityField>
      </EligibilitySwitchContainer>
      <EligibilityRequirements />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  gap: 3.6rem;
`

const EligibilitySwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: center;
`

const EligibilityField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
`

const StyledBody2 = styled(Body2)`
  opacity: 0.75;
`
