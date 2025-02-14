import React, { useState } from 'react'
import Link from 'next/link'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import { RegistrationParams } from '@/components/profile/RegistrationView'
import {
  isValidAddress,
  isValidBio,
  isValidName,
} from '@/components/profile/validations'
import { BasicInfoStep } from '@/components/profile/setup-profile/BasicInfoStep'
import { ContactStep } from '@/components/profile/setup-profile/ContactStep'
import { TagsStep } from '@/components/profile/setup-profile/TagsStep'
import LoadingSpinner from '@/components/core/LoadingSpinner'

export type Step = (stepProps: StepProps) => JSX.Element | null

const steps: Step[] = [BasicInfoStep, ContactStep, TagsStep]

type ActionProps = {
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting: boolean
}

export type StepProps = {
  goNext: VoidFunction
  goBack: VoidFunction
  actionProps: ActionProps
  data: RegistrationParams
  setData: (data: RegistrationParams) => void
}

export const RegistrationForm = ({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (params: RegistrationParams) => void
  isSubmitting: boolean
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const [newParams, setNewParams] = useState<RegistrationParams>({
    name: '',
    bio: '',
    longBio: '',
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
    avatarCfId: '',
    subscribeToNewsletter: true,
    tags: [],
    contactFields: [],
  })

  const handleSubmit = () => {
    if (
      isValidName(newParams.name) &&
      isValidBio(newParams.bio) &&
      isValidAddress(newParams.address) &&
      newParams.avatarCfId
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
        actionProps={{ isFirstStep, isLastStep, isSubmitting }}
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
  actionProps: { isFirstStep, isLastStep, isSubmitting },
}: {
  handleNext: VoidFunction
  handleBack: VoidFunction
  actionProps: ActionProps
}) => {
  return (
    <ButtonGroup>
      {isFirstStep ? (
        <Link href={expandRoute('logout')}>
          <Button variant="link">
            <Icon name="sign-out" size={2} />
            Log Out
          </Button>
        </Link>
      ) : (
        <Button variant="link" onClick={handleBack}>
          Back
        </Button>
      )}
      <Button onClick={handleNext} variant="primary">
        {isSubmitting ? (
          <>
            <LoadingSpinner />
            &nbsp; {/* this keeps the button height from collapsing */}
          </>
        ) : isLastStep ? (
          'Finish'
        ) : (
          'Next'
        )}
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
