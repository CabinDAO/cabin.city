import { useLogTrackingEventMutation } from '@/generated/graphql'
import { TrackingEvent } from '@/lib/tracking-events'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '../auth/useUser'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { StepConfig, steps } from './setup-profile/step-configuration'

export const SetupProfileView = ({}) => {
  const router = useRouter()
  const [logTrackingEvent] = useLogTrackingEventMutation()
  const { id: profileId } = router.query
  const { user } = useUser({ redirectTo: '/' })

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

  const ownProfile = user?._id === profileId

  if (!user || !ownProfile || !currentStep) {
    return null
  }

  const CurrentComponent = currentStep.component

  return (
    <SingleColumnLayout>
      <TitleCard
        title="Profile setup"
        icon="close"
        iconHref={`/profile/${profileId}`}
      />
      <CurrentComponent
        name={currentStep.name}
        onNext={handleNext}
        onBack={handleBack}
      />
    </SingleColumnLayout>
  )
}
