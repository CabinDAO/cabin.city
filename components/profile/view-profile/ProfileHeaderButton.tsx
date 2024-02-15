import { useProfile } from '@/components/auth/useProfile'
import { useModal } from '@/components/hooks/useModal'
import { useRouter } from 'next/router'
import { Button } from '../../core/Button'
import Icon from '../../core/Icon'
import { VouchModal } from './VouchModal'
import styled from 'styled-components'
import { ProfileFragment, CitizenshipStatus } from '@/utils/types/profile'

interface ProfileHeaderButtonProps {
  profile: ProfileFragment
  refetchProfile: () => void
}

export const ProfileHeaderButton = ({
  profile,
  refetchProfile,
}: ProfileHeaderButtonProps) => {
  const router = useRouter()
  const { user } = useProfile()
  const { showModal } = useModal()

  if (!user) return null

  const isOwnProfile = user.externId === profile?.externId

  const handleProfileHeaderButtonClick = () => {
    if (isOwnProfile) {
      router.push(`/profile/${profile?.externId}/edit`).then()
    } else if (profile) {
      showModal(() => (
        <VouchModal profile={profile} refetchProfile={refetchProfile} />
      ))
    }
  }

  if (isOwnProfile && user.isProfileSetupFinished) {
    return (
      <StyledButton variant="tertiary" onClick={handleProfileHeaderButtonClick}>
        Edit Profile
      </StyledButton>
    )
  } else if (
    user.citizenshipStatus === CitizenshipStatus.Verified &&
    (!profile?.citizenshipStatus ||
      profile.citizenshipStatus === CitizenshipStatus.VouchRequested)
  ) {
    return (
      <StyledButton
        variant="tertiary"
        onClick={handleProfileHeaderButtonClick}
        startAdornment={<Icon name="thumb-up" size={1.7} />}
      >
        Vouch
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
