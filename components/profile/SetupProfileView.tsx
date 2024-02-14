import { useRouter } from 'next/router'
import { useState } from 'react'
import { useProfile } from '../auth/useProfile'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { StepConfig, steps } from './setup-profile/step-configuration'
import { ProfileSetupStateParams } from '@/utils/types/profile'
import { useBackend } from '@/components/hooks/useBackend'

export const SetupProfileView = ({}) => {
  const router = useRouter()
  const { id: profileId } = router.query
  const { user } = useProfile({ redirectTo: '/' })
  const { post } = useBackend()

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
      post('PROFILE_SETUP_STATE', {
        state: 'finished',
      } as ProfileSetupStateParams).then(() => {
        router.push('/profile/[id]', `/profile/${profileId}`)
      })
    }
  }

  const ownProfile = user?.externId === profileId

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
