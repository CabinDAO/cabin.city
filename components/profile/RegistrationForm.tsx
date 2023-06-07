import {
  ProfileAvatarInput,
  useGetProfileByNameLazyQuery,
} from '@/generated/graphql'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../core/Button'
import { InputText } from '../core/InputText'
import { AvatarSetup } from './AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from './constants'
import { RegistrationParams } from './RegistrationView'
import { validEmail, validName } from './validations'
import { FieldAvailability } from '../core/FieldAvailability'
import { DisplayNameInputContainer } from './styles'
import { Message } from '../auth/Message'

interface RegistrationFormProps {
  onSubmit: (params: RegistrationParams) => void
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<ProfileAvatarInput | undefined>()
  const [getProfileByName] = useGetProfileByNameLazyQuery()
  const [isUniqueName, setIsUniqueName] = useState(true)
  const [displayAvailability, setDisplayAvailability] = useState(false)
  const [displayUsernameError, setDisplayUsernameError] = useState(false)
  const [displayEmailError, setDisplayEmailError] = useState(false)
  const [displaySignMessageInfoText, setDisplaySignMessageInfoText] =
    useState(false)

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUniqueName(true)
    setDisplayUsernameError(false)
    setDisplayAvailability(false)
    setDisplayName(e.target.value)
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayEmailError(false)
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    setDisplayEmailError(true)
    setDisplayUsernameError(true)

    if (validName(displayName, !isUniqueName) && validEmail(email)) {
      setDisplaySignMessageInfoText(true)
      onSubmit({ email: email.trim(), displayName: displayName.trim(), avatar })
    }
  }

  const handleDisplayNameValidation = async () => {
    if (!validName(displayName)) return

    const name = await getProfileByName({
      variables: { name: displayName.trim() },
    })

    setDisplayUsernameError(true)
    setDisplayAvailability(true)

    setIsUniqueName(!name.data?.profileByName?._id)
  }

  return (
    <Container>
      <AvatarSetup onNftSelected={setAvatar} avatar={avatar} />
      <InputGroup>
        <DisplayNameInputContainer>
          <InputText
            id="displayName"
            error={
              displayUsernameError && !validName(displayName, !isUniqueName)
            }
            required
            label="Display Name"
            value={displayName}
            onBlur={handleDisplayNameValidation}
            onChange={onDisplayNameChange}
            helperText={`${displayName.length}/${MAX_DISPLAY_NAME_LENGTH}`}
          />
          {displayAvailability && (
            <FieldAvailability available={isUniqueName} />
          )}
        </DisplayNameInputContainer>
        <InputText
          id="email"
          error={displayEmailError && !validEmail(email)}
          required
          label="Email"
          value={email}
          onChange={onEmailChange}
        />
      </InputGroup>
      <Submission>
        {displaySignMessageInfoText && (
          <Message>Sign a message in your wallet to continue</Message>
        )}
        <SubmitButton
          onClick={handleSubmit}
          disabled={displaySignMessageInfoText}
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
