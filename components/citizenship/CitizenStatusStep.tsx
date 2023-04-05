import styled from 'styled-components'
import Icon, { IconName } from '../core/Icon'
import { Body2, Subline1 } from '../core/Typography'

interface CitizenshipStatusStepProps {
  step: number
  description: string
  icon: IconName
  enabled?: boolean
}

export const CitizenStatusStep = ({
  step,
  description,
  icon,
  enabled = true,
}: CitizenshipStatusStepProps) => {
  return (
    <Step>
      <Body2>Step {step}</Body2>
      <StepDescription enabled={enabled}>
        <Icon size={1.4} name={icon} />
        <Subline1>{description}</Subline1>
      </StepDescription>
    </Step>
  )
}

const Step = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`
const StepDescription = styled.div<{ enabled: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
  justify-content: flex-start;

  opacity: ${({ enabled }) => (enabled ? 1 : 0.75)};

  ${({ theme }) => theme.bp.md} {
    justify-content: center;
    gap: 0.45rem;
  }
`
