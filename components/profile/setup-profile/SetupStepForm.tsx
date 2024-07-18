import React from 'react'
import styled from 'styled-components'
import { Button } from '../../core/Button'
import { ContentCard } from '../../core/ContentCard'
import { H3 } from '../../core/Typography'
import { steps } from './step-configuration'

interface SetupStepFormProps {
  stepName: string
  onNext?: VoidFunction
  onBack?: VoidFunction
  children: React.ReactNode
}

export const SetupStepForm = ({
  stepName,
  onNext = () => console.log('next'),
  onBack = () => console.log('back'),
  children,
}: SetupStepFormProps) => {
  const isFirstStep = steps[0].stepName === stepName
  const isLastStep = steps[steps.length - 1].stepName === stepName

  const stepIndicatorText = () => {
    const stepNames = steps.map((step) => step.stepName)
    const currentStepIndex = stepNames.indexOf(stepName)
    return `Step ${currentStepIndex + 1} of ${stepNames.length}`
  }

  return (
    <Container>
      <StepIndicator>
        <H3>{stepName}</H3>
        <H3>{stepIndicatorText()}</H3>
      </StepIndicator>
      <ContentCard shape="notch">
        <FormContainer>
          {children}
          <ButtonGroup>
            {!isFirstStep && (
              <Button variant="link" onClick={onBack}>
                Back
              </Button>
            )}
            <Button onClick={onNext} variant="primary">
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </ButtonGroup>
        </FormContainer>
      </ContentCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;
`

const StepIndicator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 2.4rem;
  gap: 2.4rem;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  width: 100%;

  button {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    width: auto;

    button {
      width: auto;
    }
  }
`
