import { ProfileAvatarInput } from '@/generated/graphql'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../core/Button'
import { InputText } from '../core/InputText'
import { AvatarSetup } from './AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from './constants'
import { RegistrationParams } from './RegistrationView'

interface RegistrationFormProps {
  onSubmit: (params: RegistrationParams) => void
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<ProfileAvatarInput | undefined>()
  const [displayError, setDisplayError] = useState(false)

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayError(false)
    if (e.target.value.length > MAX_DISPLAY_NAME_LENGTH) return
    setDisplayName(e.target.value)
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayError(false)
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    setDisplayError(true)
    onSubmit({ email, displayName, avatar })
  }

  return (
    <Container>
      <AvatarSetup onNftSelected={setAvatar} avatar={avatar} />
      <InputGroup>
        <InputText
          id="displayName"
          error={displayError && displayName.length === 0}
          required
          label="Display Name"
          value={displayName}
          onChange={onDisplayNameChange}
          helperText={`${displayName.length}/${MAX_DISPLAY_NAME_LENGTH}`}
        />
        <InputText
          id="email"
          error={displayError && email.length === 0}
          required
          label="Email"
          value={email}
          onChange={onEmailChange}
        />
      </InputGroup>
      <SubmitButton onClick={handleSubmit} variant="primary">
        Save
      </SubmitButton>
    </Container>
  )
}

const Container = styled.div`
  margin: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    margin: 3rem;
  }
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  width: 100%;
`

const SubmitButton = styled(Button)`
  align-self: flex-end;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
  }
`
