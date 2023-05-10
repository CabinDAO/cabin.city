import { Switch } from '@/components/core/Switch'
import { Body2, H3 } from '@/components/core/Typography'
import styled from 'styled-components'
import { EligibilityRequirements } from './EligibilityRequirements'
import { ProfileRoleConstraint } from '@/generated/graphql'

interface EligibilityProps {
  checked: boolean
  onEligibilityChange: (checked: boolean) => void
  profileRoleConstraints?: ProfileRoleConstraint[]
  onProfileRoleConstraintsChange?: (
    profileRoleConstraints: ProfileRoleConstraint[]
  ) => void
  citizenshipRequired?: boolean
  onCitizenshipRequiredChange?: (checked: boolean) => void
  minimumCabinBalance?: number | null
  onMinimumCabinBalanceChange?: (value: number | null) => void
}

export const Eligibility = ({
  checked,
  onEligibilityChange,
  profileRoleConstraints,
  onProfileRoleConstraintsChange,
  citizenshipRequired,
  onCitizenshipRequiredChange,
  minimumCabinBalance,
  onMinimumCabinBalanceChange,
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
      {checked && (
        <EligibilityRequirements
          onRoleConstraintsChange={onProfileRoleConstraintsChange}
          profileRoleConstraints={profileRoleConstraints}
          citizenshipRequired={citizenshipRequired}
          onCitizenshipRequiredChange={onCitizenshipRequiredChange}
          minimumCabinBalance={minimumCabinBalance}
          onMinimumCabinBalanceChange={onMinimumCabinBalanceChange}
        />
      )}
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
