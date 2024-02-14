import styled from 'styled-components'
import { HorizontalDivider } from '../core/Divider'
import { About } from './edit-profile/About'
import { Contact } from './edit-profile/Contact'
import { Identity } from './edit-profile/Identity'
import { Roles } from './edit-profile/Roles'
import { ProfileEditParams, RoleType, MeFragment } from '@/utils/types/profile'

interface EditProfileFormProps {
  user: MeFragment
  profileEditParams: ProfileEditParams['data'] | null
  onChange: (input: ProfileEditParams['data']) => void
  onRolesChange: (roleTypes: RoleType[]) => void
}

export const EditProfileForm = ({
  user,
  profileEditParams,
  onChange,
  onRolesChange,
}: EditProfileFormProps) => {
  if (!user) {
    return null
  }

  return (
    <InnerContainer>
      <Identity
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
      <HorizontalDivider />
      <About
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
      <HorizontalDivider />
      <Roles user={user} onChange={onRolesChange} />
      <HorizontalDivider />
      <Contact
        user={user}
        profileEditParams={profileEditParams}
        onChange={onChange}
      />
    </InnerContainer>
  )
}

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.6rem;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
  }
`
