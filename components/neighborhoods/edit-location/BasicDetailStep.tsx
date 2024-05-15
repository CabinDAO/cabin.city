import React, { useState } from 'react'
import { useUpdateLocation } from '../useUpdateLocation'
import {
  AddressFragmentType,
  LocationEditParamsType,
} from '@/utils/types/location'
import { useError } from '@/components/hooks/useError'
import {
  MAX_LOCATION_BIO_LENGTH,
  MAX_LOCATION_TITLE_LENGTH,
} from '../constants'
import {
  REQUIRED_FIELDS_TOAST_ERROR,
  REQUIRED_FIELD_ERROR,
  truthyString,
} from '@/utils/validate'
import {
  validateBio,
  validateLocationInput,
  validateTitle,
} from '../validations'
import { StepProps } from './location-wizard-configuration'
import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import { LocationStepWrapper } from './LocationStepWrapper'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { emptyEditorValue } from '@/components/core/slate/slate-utils'
import { Descendant } from 'slate'
import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { Body2 } from '@/components/core/Typography'
import { InputLabel } from '@/components/core/InputLabel'

export const BasicDetailStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const { showError } = useError()
  const { updateLocation } = useUpdateLocation(location.externId)

  const [highlightErrors, setHighlightErrors] = useState(false)

  const [address, setAddress] = useState<AddressFragmentType | null>(
    location?.address
  )

  const [locationInput, setLocationInput] = useState<LocationEditParamsType>({
    name: location.name,
    tagline: location.tagline,
    description: location.description,
  })

  const emptyDescription = emptyEditorValue(locationInput?.description)
  const slateProps = locationInput?.description
    ? { value: JSON.parse(locationInput.description) }
    : {}

  const nameValidation = validateTitle(locationInput.name)
  const shortBioValidation = validateBio(locationInput.tagline)

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof LocationEditParamsType
  ) => {
    if (field === 'name') {
      setLocationInput((prev) => ({
        ...prev,
        [field]: e.target.value.slice(0, MAX_LOCATION_TITLE_LENGTH),
      }))
    } else if (field === 'tagline') {
      setLocationInput((prev) => ({
        ...prev,
        [field]: e.target.value.slice(0, MAX_LOCATION_BIO_LENGTH),
      }))
    } else {
      setLocationInput((prev) => ({
        ...prev,
        [field]: e.target.value,
      }))
    }
  }

  const handleEditorChange = (val: Descendant[]) => {
    setLocationInput({ ...locationInput, description: JSON.stringify(val) })
  }

  const handleLocationChange = (value: AddressFragmentType) => {
    setAddress(value)
  }

  const handleNext = async () => {
    if (validateLocationInput(locationInput) && !emptyDescription) {
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
          label="Neighborhood name"
          placeholder="Name"
          error={highlightErrors && !nameValidation.valid}
          errorMessage={nameValidation.error}
        />
      </FullWidthInputContainer>
      <FullWidthInputContainer>
        <InputText
          required
          value={locationInput.tagline ?? ''}
          onChange={(event) => handleOnChange(event, 'tagline')}
          helperText={`${
            locationInput.tagline?.length ?? 0
          }/${MAX_LOCATION_BIO_LENGTH}`}
          label="Short description"
          placeholder="1 sentence description of your neighborhood"
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
          placeholder={location.steward.name ?? ''}
          label="Steward"
          disabled
        />
      </InputCoupleContainer>
      <FullWidthInputContainer>
        <InputLabel label={'Description'} required />
        <div style={{ margin: '1rem 0' }}>
          <SlateEditor
            {...slateProps}
            placeholder="Share a description of your neighborhood here"
            onChange={handleEditorChange}
            error={highlightErrors && emptyDescription}
            errorMessage={REQUIRED_FIELD_ERROR}
          />
        </div>
        <Body2>
          Get specific, but be clear and brief. Describe what your neighborhood
          is about, what happens there, and what makes it special.
        </Body2>
      </FullWidthInputContainer>
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
