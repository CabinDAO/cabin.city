import React, { useState } from 'react'
import { Button } from '@/components/core/Button'
import styled from 'styled-components'
import { RegistrationParams } from '@/components/profile/RegistrationView'
import {
  isValidAddress,
  isValidBio,
  isValidName,
} from '@/components/profile/validations'
import { BasicInfoStep } from '@/components/profile/setup-profile/BasicInfoStep'
import { ContactStep } from '@/components/profile/setup-profile/ContactStep'
import { TagsStep } from '@/components/profile/setup-profile/TagsStep'

export type Step = (stepProps: StepProps) => JSX.Element | null

const steps: Step[] = [BasicInfoStep, ContactStep, TagsStep]

export type StepProps = {
  goNext: VoidFunction
  goBack: VoidFunction
  isFirstStep: boolean
  isLastStep: boolean
  data: RegistrationParams
  setData: (data: RegistrationParams) => void
}

export const RegistrationForm = ({
  onSubmit,
}: {
  onSubmit: (params: RegistrationParams) => void
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const [newParams, setNewParams] = useState<RegistrationParams>({
    name: '',
    bio: '',
    address: {
      lat: null,
      lng: null,
      formattedAddress: null,
      locality: null,
      admininstrativeAreaLevel1: null,
      admininstrativeAreaLevel1Short: null,
      country: null,
      countryShort: null,
    },
    avatarUrl: '',
    subscribeToNewsletter: true,
    tags: [],
    contactFields: [],
  })

  const handleSubmit = () => {
    if (
      isValidName(newParams.name) &&
      isValidBio(newParams.bio) &&
      isValidAddress(newParams.address) &&
      newParams.avatarUrl
    ) {
      onSubmit(newParams)
    }
  }

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStep = steps[currentStep]

  return (
    <Container>
      <CurrentStep
        goNext={handleNext}
        goBack={handleBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        data={newParams}
        setData={setNewParams}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 2.4rem;
  gap: 2.4rem;
`

export const FormActions = ({
  handleNext,
  handleBack,
  isFirstStep,
  isLastStep,
}: {
  handleNext: VoidFunction
  handleBack: VoidFunction
  isFirstStep: boolean
  isLastStep: boolean
}) => {
  return (
    <ButtonGroup>
      {!isFirstStep && (
        <Button variant="link" onClick={handleBack}>
          Back
        </Button>
      )}
      <Button onClick={handleNext} variant="primary">
        {isLastStep ? 'Finish' : 'Next'}
      </Button>
    </ButtonGroup>
  )
}

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
