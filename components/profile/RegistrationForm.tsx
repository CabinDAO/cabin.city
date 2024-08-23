import React, { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '@/components/auth/useProfile'
import { useExternalUser } from '@/components/auth/useExternalUser'
import {
  ProfileAddressFragmentType,
  toFullAddress,
  toProfileAddress,
} from '@/utils/types/profile'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { Checkbox } from '@/components/core/Checkbox'
import { InputText } from '@/components/core/InputText'
import { AvatarSetup } from './AvatarSetup'
import { RegistrationParams } from './RegistrationView'
import {
  INVALID_NAME_MESSAGE,
  MAX_DISPLAY_NAME_LENGTH,
  isValidAddress,
  isValidName,
  MAX_BIO_LENGTH,
  isValidBio,
} from './validations'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { ADDRESS_ERROR, BIO_ERROR } from '@/utils/validate'
import { InputTextArea } from '@/components/core/InputTextArea'

export function RegistrationForm({
  onSubmit,
}: {
  onSubmit: (params: RegistrationParams) => void
}) {
  const { linkEmail } = usePrivy()
  const { externalUser } = useExternalUser()
  const { user } = useProfile()
  const [email, setEmail] = useState('')

  const [avatarUrl, setAvatarUrl] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [address, setAddress] = useState<ProfileAddressFragmentType>()
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true)

  const [canShowNameError, setCanShowNameError] = useState(false)
  const [canShowBioError, setCanShowBioError] = useState(false)
  const [canShowAddressError, setCanShowAddressError] = useState(false)
  const [canShowAvatarError, setCanShowAvatarError] = useState(false)

  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // if (
    //   externalUser?.email?.address &&
    //   externalUser.email.address !== email &&
    //   !submitted &&
    //   isValidName(name) &&
    //   address &&
    //   isValidAddress(address) &&
    //   !user
    // ) {
    //   onSubmit({
    //     name: name.trim(),
    //     email: email.trim(),
    //     address,
    //     avatar,
    //   })
    //   setSubmitted(true)
    //   return
    // }

    if (externalUser?.email?.address) {
      setEmail(externalUser.email.address)
    }
  }, [
    externalUser,
    setEmail,
    // avatar,
    // address,
    // name,
    // email,
    // onSubmit,
    // user,
    // submitted,
  ])

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanShowNameError(false)
    setName(e.target.value)
  }

  const onBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCanShowBioError(false)
    setBio(e.target.value)
  }

  const onAddressChange = (address: ProfileAddressFragmentType) => {
    setCanShowAddressError(false)
    setAddress(address)
  }

  const onAvatarChange = (avatarUrl: string) => {
    setCanShowAvatarError(false)
    setAvatarUrl(avatarUrl)
  }

  const handleSubmit = async () => {
    setCanShowNameError(true)
    setCanShowBioError(true)
    setCanShowAddressError(true)
    setCanShowAvatarError(true)

    if (
      isValidName(name) &&
      isValidBio(bio) &&
      address &&
      isValidAddress(address) &&
      avatarUrl
    ) {
      if (externalUser?.email?.address) {
        setSubmitted(true)
        onSubmit({
          email: email.trim(),
          name: name.trim(),
          bio: bio.trim(),
          address,
          avatarUrl: avatarUrl,
          subscribeToNewsletter,
        })
      } else {
        linkEmail()
      }
    }
  }

  return (
    <Container>
      <AvatarSetup
        onSelected={onAvatarChange}
        avatarUrl={avatarUrl}
        error={canShowAvatarError && !avatarUrl}
        required
      />
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

      <InputContainer>
        <InputTextArea
          label="Bio"
          required
          disabled={!!user || submitted}
          value={bio}
          onChange={onBioChange}
          helperText={`${bio.length}/${MAX_BIO_LENGTH}`}
          placeholder={'What do you want your neighbors to know about you?'}
          error={canShowBioError && !isValidBio(bio)}
          errorMessage={BIO_ERROR}
        />
      </InputContainer>

      <InputGroup>
        <InputContainer>
          <LocationAutocompleteInput
            disabled={!!user || submitted}
            initialValue={toFullAddress(address)}
            onLocationChange={(address) =>
              onAddressChange(toProfileAddress(address))
            }
            bottomHelpText={'What city do you spend most of your time in?'}
            error={canShowAddressError && !isValidAddress(address)}
            errorMessage={ADDRESS_ERROR}
          />
        </InputContainer>
      </InputGroup>

      <InputGroup>
        <SubscribeContainer>
          <Checkbox
            selected={subscribeToNewsletter}
            label={`Subscribe to Cabin's newsletter`}
            onClick={() => setSubscribeToNewsletter(!subscribeToNewsletter)}
          />
        </SubscribeContainer>
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

const SubscribeContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`
