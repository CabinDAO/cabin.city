import { useLogTrackingEventMutation } from '@/generated/graphql'
import { TrackingEvent } from '@/lib/tracking-events'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { StepConfig, steps } from './setup/step-configuration'

export const SetupProfileView = ({}) => {
  const router = useRouter()
  const [logTrackingEvent] = useLogTrackingEventMutation()
  const { id: profileId } = router.query

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
      logTrackingEvent({
        variables: {
          key: TrackingEvent.profile_setup_finished,
        },
      })

      router.push('/profile/[id]', `/profile/${profileId}`)
    }
  }

  if (!profileId || !currentStep) {
    return null
  }

  const CurrentComponent = currentStep.component

  return (
    <SingleColumnLayout>
      <TitleCard title="Profile setup" icon="close" />
      <CurrentComponent
        name={currentStep.name}
        onNext={handleNext}
        onBack={handleBack}
      />
    </SingleColumnLayout>
  )
}
