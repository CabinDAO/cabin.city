import React, { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '../auth/useProfile'
import { useExternalUser } from '../auth/useExternalUser'
import styled from 'styled-components'
import { DisplayNameInputContainer } from './styles'
import { AvatarFragment } from '@/utils/types/profile'
import { Button } from '../core/Button'
import { InputText } from '../core/InputText'
import { AvatarSetup } from './AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from './constants'
import { RegistrationParams } from './RegistrationView'
import { isValidName } from './validations'

interface RegistrationFormProps {
  onSubmit: (params: RegistrationParams) => void
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<AvatarFragment | undefined>()
  const [displayUsernameError, setDisplayUsernameError] = useState(false)
  const { externalUser } = useExternalUser()
  const { linkEmail } = usePrivy()
  const [submitted, setSubmitted] = useState(false)
  const { user } = useProfile()

  useEffect(() => {
    if (
      externalUser?.email?.address &&
      externalUser.email.address !== email &&
      !submitted &&
      isValidName(displayName) &&
      !user
    ) {
      onSubmit({
        email: email.trim(),
        displayName: displayName.trim(),
        avatar,
      })
      setSubmitted(true)
      return
    }

    if (externalUser?.email?.address) {
      setEmail(externalUser.email?.address)
    }
  }, [externalUser, avatar, displayName, email, onSubmit, user, submitted])

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUsernameError(false)
    setDisplayName(e.target.value)
  }

  const handleSubmit = async () => {
    setDisplayUsernameError(true)

    if (isValidName(displayName)) {
      if (externalUser?.email?.address) {
        onSubmit({
          email: email.trim(),
          displayName: displayName.trim(),
          avatar,
        })
      } else {
        linkEmail()
      }
    }
  }

  return (
    <Container>
      <AvatarSetup onNftSelected={setAvatar} avatar={avatar} />
      <InputGroup>
        <DisplayNameInputContainer>
          <InputText
            id="displayName"
            error={displayUsernameError && !isValidName(displayName)}
            required
            disabled={!!user || submitted}
            label="Display Name"
            value={displayName}
            onChange={onDisplayNameChange}
            helperText={`${displayName.length}/${MAX_DISPLAY_NAME_LENGTH}`}
          />
        </DisplayNameInputContainer>
      </InputGroup>
      <Submission>
        <SubmitButton
          disabled={!!user || submitted}
          onClick={handleSubmit}
          variant="primary"
        >
          Save
        </SubmitButton>
      </Submission>
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

const Submission = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  position: relative;
  min-height: 4.8rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 5.2rem;
  }
`

const SubmitButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
    position: absolute;
    right: 0;
    top: 0;
  }
`
