import { InputText } from '@/components/core/InputText'
import { useState } from 'react'
import styled from 'styled-components'
import { AvatarSetup } from '../AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from '../constants'
import { UpdateProfileProps } from './UpdateProfileProps'

export const Identity = ({
  editProfileInput,
  onChange,
  user,
}: UpdateProfileProps) => {
  const [displayError, setDisplayError] = useState(false)
  const email = editProfileInput?.email ?? user?.email
  const name = editProfileInput?.name ?? user?.name

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayError(false)
    if (e.target.value.length > MAX_DISPLAY_NAME_LENGTH) return
    onChange({ ...editProfileInput, name: e.target.value })
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayError(false)
    onChange({ ...editProfileInput, email: e.target.value })
  }

  return (
    <AboutContainer>
      <AvatarSetup
        avatar={editProfileInput?.avatar}
        onNftSelected={(avatar) => onChange({ ...editProfileInput, avatar })}
      />
      <InputGroup>
        <InputText
          id="displayName"
          error={((displayError && name.length) ?? 0) === 0}
          required
          label="Display Name"
          value={name}
          onChange={onDisplayNameChange}
          helperText={`${name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
        />
        <InputText
          id="email"
          error={((displayError && email.length) ?? 0) === 0}
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
`
