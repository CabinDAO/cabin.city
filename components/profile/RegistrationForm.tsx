import React, { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '@/components/auth/useProfile'
import { useExternalUser } from '@/components/auth/useExternalUser'
import { ProfileAddressFragmentType } from '@/utils/types/profile'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { Checkbox } from '@/components/core/Checkbox'
import { RegistrationParams } from './RegistrationView'
import { isValidAddress, isValidName, isValidBio } from './validations'
import { AboutInput } from '@/components/profile/AboutInput'

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

  const [canShowErrors, setCanShowErrors] = useState(false)
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

  const handleSubmit = async () => {
    setCanShowErrors(true)

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
      <AboutInput
        values={{
          name,
          bio,
          address,
          avatarUrl,
        }}
        onNameChange={setName}
        onBioChange={setBio}
        onAddressChange={setAddress}
        onAvatarUrlChange={setAvatarUrl}
        canShowErrors={canShowErrors}
      />

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

const SubscribeContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`
