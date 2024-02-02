import React, { useState } from 'react'
import { LocationStepWrapper } from './LocationStepWrapper'
import { Subline2 } from '@/components/core/Typography'
import styled from 'styled-components'
import { StepProps } from './location-wizard-configuration'
import { useUpdateLocation } from '../useUpdateLocation'
import { InputText } from '@/components/core/InputText'
import {
  MAX_LOCATION_BIO_LENGTH,
  MAX_LOCATION_TITLE_LENGTH,
} from '../constants'
import { PartialUpdateLocationInput } from '@/generated/graphql'
import { HorizontalDivider } from '@/components/core/Divider'
import {
  validateBio,
  validateEmail,
  validateLocationInput,
  validateTitle,
} from '../validations'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import {
  REQUIRED_FIELDS_TOAST_ERROR,
  REQUIRED_FIELD_ERROR,
  isNumber,
  truthyString,
} from '@/utils/validate'
import { useError } from '@/components/hooks/useError'
import { AddressFragment } from '@/utils/types/location'

export const BasicDetailStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const { updateLocation } = useUpdateLocation(location.externId)

  const [address, setAddress] = useState<AddressFragment | null>(
    location?.address
  )

  const [highlightErrors, setHighlightErrors] = useState(false)

  const { showError } = useError()

  const [locationInput, setLocationInput] =
    useState<PartialUpdateLocationInput>({
      name: location.name,
      caretakerEmail: location.caretakerEmail,
      tagline: location.tagline,
      sleepCapacity: location.sleepCapacity,
      internetSpeedMbps: location.internetSpeedMbps,
    })

  const nameValidation = validateTitle(locationInput.name)
  const contactEmailValidation = validateEmail(locationInput.caretakerEmail)
  const shortBioValidation = validateBio(locationInput.tagline)

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PartialUpdateLocationInput
  ) => {
    const intFields = ['sleepCapacity', 'internetSpeedMbps']

    let parsedValue = 0

    if (intFields.includes(field) && e.target.value !== '') {
      parsedValue = parseInt(e.target.value)
      if (isNaN(parsedValue)) {
        return
      }
    }

    if (field === 'name') {
      setLocationInput((prev) => ({
        ...prev,
        [field]: e.target.value.slice(0, MAX_LOCATION_TITLE_LENGTH),
      }))
      return
    } else if (field === 'tagline') {
      setLocationInput((prev) => ({
        ...prev,
        [field]: e.target.value.slice(0, MAX_LOCATION_BIO_LENGTH),
      }))
      return
    }

    setLocationInput((prev) => ({
      ...prev,
      [field]:
        intFields.includes(field) && e.target.value !== ''
          ? parsedValue
          : e.target.value,
    }))
  }

  const handleLocationChange = (value: AddressFragment) => {
    setAddress(value)
  }

  const handleNext = async () => {
    if (validateLocationInput(locationInput)) {
      await updateLocation({ ...locationInput, address })
      onNext()
    } else {
      setHighlightErrors(true)
      showError(REQUIRED_FIELDS_TOAST_ERROR)
    }
  }

  return (
    <StyledLocationStepWrapper
      name={name}
      onNext={handleNext}
      onBack={onBack}
      steps={steps}
    >
      <FullWidthInputContainer>
        <InputText
          required
          value={locationInput.name ?? ''}
          onChange={(event) => handleOnChange(event, 'name')}
          helperText={`${
            locationInput.name?.length ?? 0
          }/${MAX_LOCATION_TITLE_LENGTH}`}
          label="Listing title"
          placeholder="Title"
          error={highlightErrors && !nameValidation.valid}
          errorMessage={nameValidation.error}
        />
      </FullWidthInputContainer>
      <InputCoupleContainer>
        <InputText
          placeholder={location.caretaker.name ?? ''}
          label="Caretaker"
          disabled
        />
        <InputText
          required
          value={locationInput.caretakerEmail ?? ''}
          onChange={(event) => handleOnChange(event, 'caretakerEmail')}
          label="Contact email"
          placeholder="Email"
          error={highlightErrors && !contactEmailValidation.valid}
          errorMessage={contactEmailValidation.error}
        />
      </InputCoupleContainer>
      <FullWidthInputContainer>
        <InputText
          required
          value={locationInput.tagline ?? ''}
          onChange={(event) => handleOnChange(event, 'tagline')}
          helperText={`${
            locationInput.tagline?.length ?? 0
          }/${MAX_LOCATION_BIO_LENGTH}`}
          label="Short bio"
          placeholder="1 sentence description of your property"
          error={highlightErrors && !shortBioValidation.valid}
          errorMessage={shortBioValidation.error}
        />
      </FullWidthInputContainer>
      <FullWidthInputContainer>
        <LocationAutocompleteInput
          onLocationChange={handleLocationChange}
          initialValue={address}
          error={highlightErrors && !truthyString(address?.formattedAddress)}
          errorMessage={REQUIRED_FIELD_ERROR}
        />
      </FullWidthInputContainer>
      <InputCoupleContainer>
        <InputText
          required
          value={locationInput.sleepCapacity ?? ''}
          onChange={(event) => handleOnChange(event, 'sleepCapacity')}
          label="Number of beds"
          placeholder="Value"
          error={highlightErrors && !isNumber(locationInput.sleepCapacity)}
          errorMessage={REQUIRED_FIELD_ERROR}
        />
        <InputText
          required
          value={locationInput.internetSpeedMbps ?? ''}
          onChange={(event) => handleOnChange(event, 'internetSpeedMbps')}
          label="Average internet speed"
          placeholder="Value"
          endAdornment={<Subline2 style={{ opacity: '0.5' }}>Mbps</Subline2>}
          error={highlightErrors && !isNumber(locationInput.internetSpeedMbps)}
          errorMessage={REQUIRED_FIELD_ERROR}
        />
      </InputCoupleContainer>
      <HorizontalDivider />
    </StyledLocationStepWrapper>
  )
}

const StyledLocationStepWrapper = styled(LocationStepWrapper)`
  min-height: calc(100vh - 4.8rem);
`

const InputCoupleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr;
  }
`

const FullWidthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
