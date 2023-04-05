import { InputText } from '@/components/core/InputText'
import styled from 'styled-components'
import { AvatarSetup } from '../AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from '../constants'
import { validEmail, validName } from '../validations'
import { UpdateProfileProps } from './UpdateProfileProps'

export const Identity = ({
  editProfileInput,
  onChange,
  user,
}: UpdateProfileProps) => {
  const avatar = editProfileInput?.hasOwnProperty('avatar')
    ? editProfileInput.avatar
    : user?.avatar
  const email = editProfileInput?.email ?? user?.email
  const name = editProfileInput?.name ?? user?.name

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...editProfileInput, name: e.target.value })
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...editProfileInput, email: e.target.value })
  }

  return (
    <AboutContainer>
      <AvatarSetup
        avatar={avatar}
        onNftSelected={(avatar) => onChange({ ...editProfileInput, avatar })}
      />
      <InputGroup>
        <InputText
          id="displayName"
          error={!validName(name)}
          required
          label="Display Name"
          value={name}
          onChange={onDisplayNameChange}
          helperText={`${name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
        />
        <InputText
          id="email"
          error={!validEmail(email)}
          required
          label="Email"
          value={email}
          onChange={onEmailChange}
        />
      </InputGroup>
    </AboutContainer>
  )
}

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    gap: 2.4rem;
  }
`
