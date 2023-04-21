import {
  useGetLocationByIdQuery,
  useLogTrackingEventMutation,
} from '@/generated/graphql'
import { TrackingEvent } from '@/lib/tracking-events'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '../auth/useUser'
import { StepConfig, steps } from './edit-location/configuration'

export const EditLocationView = ({}) => {
  const router = useRouter()
  const [logTrackingEvent] = useLogTrackingEventMutation()
  const { id: listingId } = router.query
  const { data, loading } = useGetLocationByIdQuery({
    variables: {
      id: listingId as string,
    },
    skip: !listingId,
  })
  const location = data?.findLocationByID
  const { user } = useUser({ redirectTo: '/login' })

  const [currentStep, setCurrentStep] = useState<StepConfig>(steps[0])

  const handleNext = () => {
    resolveTransitionStep(steps[steps.indexOf(currentStep) + 1])
  }

  const handleBack = () => {
    resolveTransitionStep(steps[steps.indexOf(currentStep) - 1])
  }

  const resolveTransitionStep = (targetStep: StepConfig) => {
    const isLastStep = steps.indexOf(currentStep) === steps.length - 1

    if (targetStep) {
      setCurrentStep(targetStep)
    } else if (isLastStep) {
      router.push('/location/[id]', `/location/${location?._id}`)
    }
  }

  const isMyListing = user?._id === location?.caretaker._id

  if (loading || !isMyListing || !location) {
    return null
  }

  const CurrentStep = currentStep.component

  return (
    <CurrentStep
      location={location}
      name={currentStep.name}
      onNext={handleNext}
      onBack={handleBack}
    />
  )
}
