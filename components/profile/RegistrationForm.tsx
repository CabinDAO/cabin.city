import { useState } from 'react'
import styled from 'styled-components'
import { Avatar } from '../core/Avatar'
import { Button } from '../core/Button'
import { InputText } from '../core/InputText'

const Container = styled.div`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
`

const AvatarSetup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 2.4rem;
  width: 100%;
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
`

const MAX_DISPLAY_NAME_LENGTH = 48

interface RegistrationFormProps {
  onSubmit: () => void
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_DISPLAY_NAME_LENGTH) return
    setDisplayName(e.target.value)
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <Container>
      <AvatarSetup>
        <Avatar size={8.8} hoverShadow />
        <Button variant="tertiary">Remove</Button>
      </AvatarSetup>
      <InputGroup>
        <InputText
          id="displayName"
          required
          label="Display Name"
          value={displayName}
          onChange={onDisplayNameChange}
          helperText={`${displayName.length}/${MAX_DISPLAY_NAME_LENGTH}`}
        />
        <InputText
          id="email"
          required
          label="Email"
          value={email}
          onChange={onEmailChange}
        />
      </InputGroup>
      <SubmitButton onClick={onSubmit} variant="primary">
        Continue
      </SubmitButton>
    </Container>
  )
}
