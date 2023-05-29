import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import { AvatarSetup } from '../AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from '../constants'
import { validEmail, validName } from '../validations'
import { UpdateProfileProps } from './UpdateProfileProps'
import { DisplayNameInputContainer } from '../styles'
import { FieldAvailability } from '@/components/core/FieldAvailability'
import { useGetProfileByNameLazyQuery } from '@/generated/graphql'
import { useState } from 'react'

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
  const [getProfileByName] = useGetProfileByNameLazyQuery()
  const [available, setAvailable] = useState(true)
  const [displayAvailability, setDisplayAvailability] = useState(false)

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayAvailability(false)
    onChange({ ...editProfileInput, name: e.target.value })
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...editProfileInput, email: e.target.value })
  }

  const handleDisplayNameValidation = async () => {
    setDisplayAvailability(false)
    const displayName = editProfileInput?.name ?? ''

    if (!validName(displayName) || displayName === user.name) {
      setAvailable(true)
      return
    }

    const response = await getProfileByName({
      variables: { name: displayName.trim() },
    })

    const existingName = response.data?.profileByName?.name

    if (existingName !== user?.name) {
      setDisplayAvailability(true)
      setAvailable(!response.data?.profileByName?._id)
    } else {
      setDisplayAvailability(false)
      setAvailable(true)
    }
  }

  return (
    <AboutContainer>
      <AvatarSetup
        avatar={avatar}
        onNftSelected={(avatar) => onChange({ ...editProfileInput, avatar })}
      />
      <InputGroup>
        <DisplayNameInputContainer>
          <InputText
            id="displayName"
            error={!validName(name, !available)}
            required
            label="Display Name"
            onBlur={handleDisplayNameValidation}
            value={name}
            onChange={onDisplayNameChange}
            helperText={`${name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
          />
          {displayAvailability && <FieldAvailability available={available} />}
        </DisplayNameInputContainer>
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
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    gap: 2.4rem;
  }
`
