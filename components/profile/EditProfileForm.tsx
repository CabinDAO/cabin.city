import {
  MeFragment,
  ProfileRoleType,
  UpdateProfileInput,
} from '@/generated/graphql'
import styled from 'styled-components'
import { Button } from '../core/Button'
import { HorizontalDivider } from '../core/Divider'
import { About } from './edit-profile/About'
import { Contact } from './edit-profile/Contact'
import { Identity } from './edit-profile/Identity'
import { Roles } from './edit-profile/Roles'

interface EditProfileFormProps {
  onSubmit: () => void
  editProfileInput: UpdateProfileInput | null
  onChange: (input: UpdateProfileInput) => void
  user: MeFragment
  onRolesChange: (roleTypes: ProfileRoleType[]) => void
}

export const EditProfileForm = ({
  editProfileInput,
  onChange,
  onRolesChange,
  user,
  onSubmit,
}: EditProfileFormProps) => {
  if (!user) {
    return null
  }

  return (
    <InnerContainer>
      <Identity
        user={user}
        editProfileInput={editProfileInput}
        onChange={onChange}
      />
      <HorizontalDivider />
      <About
        user={user}
        editProfileInput={editProfileInput}
        onChange={onChange}
      />
      <HorizontalDivider />
      <Roles user={user} onChange={onRolesChange} />
      <HorizontalDivider />
      <Contact
        user={user}
        editProfileInput={editProfileInput}
        onChange={onChange}
      />
      <HorizontalDivider />
      <StyledButton onClick={onSubmit}>Save profile</StyledButton>
    </InnerContainer>
  )
}

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2.4rem;
  gap: 2.4rem;
`

const StyledButton = styled(Button)`
  align-self: flex-end;
`
