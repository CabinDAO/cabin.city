import Link from 'next/link'
import { useProfile } from '@/components/auth/useProfile'
import { ProfileFragment } from '@/utils/types/profile'
import styled from 'styled-components'
import { Button } from '../../core/Button'

export const ProfileHeaderButton = ({
  profile,
}: {
  profile: ProfileFragment
}) => {
  const { user } = useProfile()
  if (!user || user.externId !== profile.externId) {
    return null
  }

  return (
    <Link href={`/profile/${profile.externId}/edit`}>
      <StyledButton variant="tertiary">Edit Profile</StyledButton>
    </Link>
  )
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.bp.md} {
    margin-top: 0.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    margin-top: 0;
  }
`
