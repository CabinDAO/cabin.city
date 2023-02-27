import { useRouter } from 'next/router'
import { ProfileProgressCard } from '../core/ProfileProgressCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import styled from 'styled-components'
import { useUser } from '../auth/useUser'
import { getCountForEvent } from '@/utils/events'

export const ProfileView = ({}) => {
  const router = useRouter()
  const { user } = useUser()
  const { id: profileId } = router.query

  if (!profileId) {
    return null
  }

  const complete = getCountForEvent(user, 'profile_setup_finished')

  return (
    <SingleColumnLayout>
      <InnerContainer>
        {user?._id === profileId && (
          <ProfileProgressCard
            progress={complete ? 100 : 25}
            profileId={profileId as string}
          />
        )}
      </InnerContainer>
    </SingleColumnLayout>
  )
}

const InnerContainer = styled.div`
  width: 100%;
`
