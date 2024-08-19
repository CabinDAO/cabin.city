import { useProfile } from '@/components/auth/useProfile'
import { useRouter } from 'next/router'
import { Button } from '../../core/Button'
import styled from 'styled-components'
import { ProfileFragment } from '@/utils/types/profile'

interface ProfileHeaderButtonProps {
  profile: ProfileFragment
  refetchProfile: VoidFunction
}

export const ProfileHeaderButton = ({ profile }: ProfileHeaderButtonProps) => {
  const router = useRouter()
  const { user } = useProfile()

  if (!user) return null

  const isOwnProfile = user.externId === profile?.externId

  const handleProfileHeaderButtonClick = () => {
    router.push(`/profile/${profile?.externId}/edit`).then()
  }

  if (isOwnProfile && user.isProfileSetupFinished) {
    return (
      <StyledButton variant="tertiary" onClick={handleProfileHeaderButtonClick}>
        Edit Profile
      </StyledButton>
    )
  } else {
    return null
  }
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.bp.md} {
    margin-top: 0.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    margin-top: 0;
  }
`
