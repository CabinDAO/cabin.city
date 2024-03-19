import React, { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '../auth/useProfile'
import { useExternalUser } from '../auth/useExternalUser'
import styled from 'styled-components'
import { AvatarFragment } from '@/utils/types/profile'
import { Button } from '../core/Button'
import { InputText } from '../core/InputText'
import { AvatarSetup } from './AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from './constants'
import { RegistrationParams } from './RegistrationView'
import {
  INVALID_NAME_MESSAGE,
  isValidAddress,
  isValidName,
} from './validations'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { ADDRESS_ERROR } from '@/utils/validate'
import { AddressFragment } from '@/utils/types/location'

interface RegistrationFormProps {
  onSubmit: (params: RegistrationParams) => void
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const { linkEmail } = usePrivy()
  const { externalUser } = useExternalUser()
  const { user } = useProfile()
  const [email, setEmail] = useState('')

  const [avatar, setAvatar] = useState<AvatarFragment | undefined>()
  const [name, setName] = useState('')
  const [address, setAddress] = useState<AddressFragment>()

  const [canShowNameError, setCanShowNameError] = useState(false)
  const [canShowAddressError, setCanShowAddressError] = useState(false)

  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (
      externalUser?.email?.address &&
      externalUser.email.address !== email &&
      !submitted &&
      isValidName(name) &&
      address &&
      isValidAddress(address) &&
      !user
    ) {
      onSubmit({
        name: name.trim(),
        email: email.trim(),
        address,
        avatar,
      })
      setSubmitted(true)
      return
    }

    if (externalUser?.email?.address) {
      setEmail(externalUser.email?.address)
    }
  }, [externalUser, avatar, address, name, email, onSubmit, user, submitted])

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanShowNameError(false)
    setName(e.target.value)
  }

  const onAddressChange = (address: AddressFragment) => {
    setCanShowAddressError(false)
    setAddress(address)
  }

  const handleSubmit = async () => {
    setCanShowNameError(true)
    setCanShowAddressError(true)

    if (isValidName(name) && address && isValidAddress(address)) {
      if (externalUser?.email?.address) {
        onSubmit({
          email: email.trim(),
          name: name.trim(),
          address,
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
        <InputContainer>
          <InputText
            required
            disabled={!!user || submitted}
            label="Name"
            value={name}
            onChange={onNameChange}
            helperText={`${name.length}/${MAX_DISPLAY_NAME_LENGTH}`}
            error={canShowNameError && !isValidName(name)}
            errorMessage={INVALID_NAME_MESSAGE}
          />
        </InputContainer>
      </InputGroup>

      <InputGroup>
        <InputContainer>
          <LocationAutocompleteInput
            disabled={!!user || submitted}
            initialValue={address}
            onLocationChange={onAddressChange}
            // placeholder={'Start typing a address'}
            bottomHelpText={
              'Precise location will not be public. If nomadic, what city do you spend the biggest chunk of time?'
            }
            error={canShowAddressError && !isValidAddress(address)}
            errorMessage={ADDRESS_ERROR}
          />
        </InputContainer>
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 0.6rem;
`
