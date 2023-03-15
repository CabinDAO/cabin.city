import { useUser } from '@/components/auth/useUser'
import { useModal } from '@/components/hooks/useModal'
import {
  MeFragment,
  GetProfileByIdFragment,
  CitizenshipStatus,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import { Button } from '../../core/Button'
import Icon from '../../core/Icon'
import { VouchModal } from './VouchModal'

interface ProfileHeaderButtonProps {
  profile: MeFragment | GetProfileByIdFragment | undefined | null
  isOwnProfile?: boolean
}

export const ProfileHeaderButton = ({
  profile,
  isOwnProfile,
}: ProfileHeaderButtonProps) => {
  const router = useRouter()
  const { user } = useUser()
  const { showModal } = useModal()

  const handleProfileHeaderButtonClick = () => {
    if (isOwnProfile) {
      router.push(`/profile/${profile?._id}/edit`)
    } else if (profile) {
      showModal(() => (
        <VouchModal profile={profile as GetProfileByIdFragment} />
      ))
    }
  }
  if (isOwnProfile) {
    return (
      <Button variant="tertiary" onClick={handleProfileHeaderButtonClick}>
        Edit Profile
      </Button>
    )
  } else if (
    profile?.citizenshipStatus === CitizenshipStatus.VouchRequested &&
    user?.citizenshipStatus === CitizenshipStatus.Verified
  ) {
    return (
      <Button
        variant="tertiary"
        onClick={handleProfileHeaderButtonClick}
        startAdornment={<Icon name="thumb-up" size={1.7} />}
      >
        Vouch
      </Button>
    )
  } else {
    return null
  }
}
