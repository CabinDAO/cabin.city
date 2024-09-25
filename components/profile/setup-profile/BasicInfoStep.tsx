import React, { useState } from 'react'
import { isValidAddress, isValidBio, isValidName } from '../validations'
import styled from 'styled-components'
import { FormActions, StepProps } from '@/components/profile/RegistrationForm'
import { AboutInput } from '@/components/profile/AboutInput'
import { Checkbox } from '@/components/core/Checkbox'

export const BasicInfoStep = ({
  goNext,
  goBack,
  isFirstStep,
  isLastStep,
  data,
  setData,
}: StepProps) => {
  const [name, setName] = useState(data.name)
  const [bio, setBio] = useState(data.bio)
  const [address, setAddress] = useState(data.address)
  const [avatarCfId, setavatarCfId] = useState(data.avatarCfId || '')
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true)

  const [canShowErrors, setCanShowErrors] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleNext = async () => {
    setCanShowErrors(true)
    if (
      isValidName(name) &&
      isValidBio(bio) &&
      address &&
      isValidAddress(address) &&
      avatarCfId
    ) {
      setSubmitted(true)
      setData({
        ...data,
        ...{
          name,
          bio,
          address,
          avatarCfId,
          subscribeToNewsletter,
        },
      })
      goNext()
    }
  }

  return (
    <>
      <AboutInput
        values={{
          name,
          bio,
          address,
          avatarCfId,
        }}
        onNameChange={setName}
        onBioChange={setBio}
        onAddressChange={setAddress}
        onAvatarCfIdChange={setavatarCfId}
        canShowErrors={canShowErrors}
        disabled={submitted}
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
      <FormActions
        handleNext={handleNext}
        handleBack={goBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </>
  )
}

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  width: 100%;
`

const SubscribeContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`
