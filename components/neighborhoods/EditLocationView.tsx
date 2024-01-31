import { useGetLocationByIdQuery } from '@/generated/graphql'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useProfile } from '../auth/useProfile'
import {
  StepConfig,
  editLocationSteps,
} from './edit-location/location-wizard-configuration'

export const EditLocationView = ({}) => {
  const router = useRouter()
  const { id: listingId, step } = router.query
  const stepNumber = step ? parseInt(step.toString()) : 0

  const { data, loading } = useGetLocationByIdQuery({
    variables: {
      id: listingId as string,
    },
    skip: !listingId,
  })
  const location = data?.findLocationByID
  const { user } = useProfile({ redirectTo: '/' })

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
      router.push('/location/[id]', `/location/${location?._id}`)
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

  const isEditable = user?.isAdmin || user?.externId === location?.caretaker._id

  if (loading || !location || !isEditable) {
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
