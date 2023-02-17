import { OnboardingLayout } from '../layouts/OnboardingLayout'
import { TitleCard } from '../core/TitleCard'
import { ContentCard } from '../core/ContentCard'
import { RegistrationForm } from './RegistrationForm'

export const RegistrationView = () => {
  const handleRegistration = () => {
    console.log('Registration submitted')
  }

  return (
    <OnboardingLayout>
      <TitleCard title="Welcome to Cabin" icon="logo-cabin" />
      <ContentCard shape="notch">
        <RegistrationForm onSubmit={handleRegistration} />
      </ContentCard>
    </OnboardingLayout>
  )
}
