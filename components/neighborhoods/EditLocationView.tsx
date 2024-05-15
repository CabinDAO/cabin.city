import { useEffect, useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import { useRouter } from 'next/router'
import { useProfile } from '../auth/useProfile'
import { LocationGetResponse } from '@/utils/types/location'
import {
  StepConfig,
  editLocationSteps,
} from './edit-location/location-wizard-configuration'

export const EditLocationView = ({}) => {
  const router = useRouter()
  const { id: listingId, step } = router.query
  const stepNumber = step ? parseInt(step.toString()) : 0

  const { user } = useProfile({ redirectTo: '/' })
  const { useGet } = useBackend()
  const { data, isLoading } = useGet<LocationGetResponse>(
    listingId ? ['LOCATION', { externId: listingId as string }] : null
  )
  const location = data?.location

  const [currentStep, setCurrentStep] = useState<StepConfig>(
    editLocationSteps[0]
  )

  const handleNext = () => {
    resolveTransitionStep(
      editLocationSteps[editLocationSteps.indexOf(currentStep) + 1]
    )
  }

  const handleBack = () => {
    const newIndex = editLocationSteps.indexOf(currentStep) - 1

    if (newIndex >= 0) {
      resolveTransitionStep(editLocationSteps[newIndex])
    } else {
      router.push('/my-locations')
    }
  }

  const resolveTransitionStep = (targetStep: StepConfig) => {
    const isLastStep =
      editLocationSteps.indexOf(currentStep) === editLocationSteps.length - 1

    if (targetStep) {
      setCurrentStep(targetStep)
    } else if (isLastStep) {
      router.push('/location/[id]', `/location/${location?.externId}`)
    }
  }

  useEffect(() => {
    if (stepNumber) {
      const targetStep = editLocationSteps[stepNumber]

      if (targetStep) {
        setCurrentStep(targetStep)
      }
    }
  }, [stepNumber])

  const isEditable =
    user?.isAdmin || user?.externId === location?.steward.externId

  if (isLoading || !location || !isEditable) {
    return null
  }

  const CurrentStep = currentStep.component

  return (
    <CurrentStep
      key={stepNumber}
      location={location}
      name={currentStep.name}
      onNext={handleNext}
      onBack={handleBack}
      steps={editLocationSteps}
    />
  )
}
