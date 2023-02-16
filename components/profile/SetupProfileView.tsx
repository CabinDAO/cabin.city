import { useRouter } from 'next/router'
import { TitleCard } from '../core/TitleCard'
import { OnboardingLayout } from '../layouts/OnboardingLayout'

export const SetupProfileView = ({}) => {
  const router = useRouter()
  const { id: profileId } = router.query

  if (!profileId) {
    return null
  }

  return (
    <OnboardingLayout>
      <TitleCard title={`Profile #${profileId} is coming`} icon="profile" />
    </OnboardingLayout>
  )
}
