import { MeFragment, GetProfileByIdFragment } from '@/generated/graphql'
import { useRouter } from 'next/router'
import { Button } from '../core/Button'
import Icon from '../core/Icon'

interface ProfileHeaderButtonProps {
  profile: MeFragment | GetProfileByIdFragment | undefined | null
  isOwnProfile?: boolean
}

export const ProfileHeaderButton = ({
  profile,
  isOwnProfile,
}: ProfileHeaderButtonProps) => {
  const router = useRouter()

  const handleProfileHeaderButtonClick = () => {
    if (isOwnProfile) {
      router.push(`/profile/${profile?._id}/edit`)
    } else {
      // TODO: Add vouch logic
    }
  }
  if (isOwnProfile) {
    return (
      <Button variant="tertiary" onClick={handleProfileHeaderButtonClick}>
        Edit Profile
      </Button>
    )
  } else {
    return (
      <Button
        variant="tertiary"
        onClick={handleProfileHeaderButtonClick}
        startAdornment={<Icon name="thumb-up" size={1.7} />}
      >
        Vouch
      </Button>
    )
  }
}
