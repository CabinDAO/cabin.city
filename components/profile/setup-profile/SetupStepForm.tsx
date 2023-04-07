import styled from 'styled-components'
import { Button } from '../../core/Button'
import { ContentCard } from '../../core/ContentCard'
import { H3 } from '../../core/Typography'
import { steps } from './step-configuration'

interface SetupStepFormProps {
  onNext?: VoidFunction
  onBack?: VoidFunction
  children: React.ReactNode
  name: string
}

export const SetupStepForm = ({
  onNext = () => console.log('next'),
  onBack = () => console.log('back'),
  children,
  name,
}: SetupStepFormProps) => {
  const isFirstStep = steps[0].name === name
  const isLastStep = steps[steps.length - 1].name === name

  const stepIndicatorText = () => {
    const names = steps.map((step) => step.name)
    const currentStepIndex = names.indexOf(name)
    return `Step ${currentStepIndex + 1} of ${names.length}`
  }

  return (
    <Container>
      <StepIndicator>
        <H3>{name}</H3>
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
