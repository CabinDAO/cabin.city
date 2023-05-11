import { LocationStepWrapper } from './LocationStepWrapper'
import { Subline2, h4Styles } from '@/components/core/Typography'
import styled from 'styled-components'
import { StepProps } from './location-wizard-configuration'
import { useUpdateLocation } from '../useUpdateLocation'
import { InputText } from '@/components/core/InputText'
import {
  MAX_LOCATION_BIO_LENGTH,
  MAX_LOCATION_TITLE_LENGTH,
} from '../constants'
import {
  LocationAddressInput,
  PartialUpdateLocationInput,
  useGetProfileByAddressLazyQuery,
  useGetProfilesLazyQuery,
} from '@/generated/graphql'
import { useEffect, useState } from 'react'
import { HorizontalDivider } from '@/components/core/Divider'
import { validTitle, validateLocationInput } from '../validations'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { Dropdown } from '@/components/core/Dropdown'
import { resolveAddressOrName } from '@/lib/ens'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { isNotNull } from '@/lib/data'

export const BasicDetailStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const { updateLocation } = useUpdateLocation(location._id)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, ...currentAddress } = location?.address ?? {}

  const [address, setAddress] = useState<LocationAddressInput | null>(
    currentAddress ?? {}
  )

  useEffect(() => {
    if (location.referrer) {
      const option: SelectOption = {
        label: location.referrer.name,
        value: location.referrer._id,
        imageSrc: location.referrer.avatar?.url,
      }

      setOptions([option])
      setSelectedOption(option)
    }
  }, [location.referrer])

  const [searchProfiles] = useGetProfilesLazyQuery({})
  const [getProfileByAddress] = useGetProfileByAddressLazyQuery()
  const [options, setOptions] = useState<SelectOption[]>([])
  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(undefined)

  const [locationInput, setLocationInput] =
    useState<PartialUpdateLocationInput>({
      name: location.name,
      caretakerEmail: location.caretakerEmail,
      tagline: location.tagline,
      sleepCapacity: location.sleepCapacity,
      internetSpeedMbps: location.internetSpeedMbps,
    })

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

    setLocationInput((prev) => ({
      ...prev,
      [field]:
        intFields.includes(field) && e.target.value !== ''
          ? parsedValue
          : e.target.value,
    }))
  }

  const handleLocationChange = (value: LocationAddressInput) => {
    setAddress(value)
  }

  const handleNext = async () => {
    if (validateLocationInput(locationInput)) {
      await updateLocation({ ...locationInput, address })
      onNext()
    }
  }

  const handleSearch = async (value: string) => {
    const resolvedAddress = await resolveAddressOrName(value)
    if (resolvedAddress) {
      const result = await getProfileByAddress({
        variables: { address: resolvedAddress },
      })
      if (
        result.data?.accountByAddress?.profile &&
        result.data?.accountByAddress?.profile?._id !== location.caretaker._id
      ) {
        setOptions([
          {
            label: result.data.accountByAddress.profile.name,
            value: result.data.accountByAddress.profile._id,
            imageSrc:
              result.data.accountByAddress.profile?.avatar?.url ??
              '/images/default-avatar.png',
          },
        ])
      }
    } else {
      const result = await searchProfiles({
        variables: {
          input: {
            searchQuery: value,
            roleTypes: [],
            levelTypes: [],
            citizenshipStatuses: [],
          },
          size: 3,
        },
      })

      if (result.data?.getProfiles?.data) {
        setOptions(
          result.data?.getProfiles?.data
            .filter(isNotNull)
            .map((profile) => ({
              label: profile?.name,
              value: profile?._id,
              imageSrc: profile?.avatar?.url ?? '/images/default-avatar.png',
            }))
            .filter((option) => option.value !== location.caretaker._id)
        )
      }
    }
  }

  const handleOnSelect = (option: SelectOption) => {
    setSelectedOption(option)

    if (option.value) {
      setLocationInput((prev) => ({
        ...prev,
        referrer: {
          connect: option.value.toLocaleString(),
        },
      }))
    }
  }

  return (
    <StyledLocationStepWrapper
      name={name}
      onNext={handleNext}
      onBack={onBack}
      steps={steps}
    >
      <InputCoupleContainer>
        <InputText
          required
          value={locationInput.name ?? ''}
          onChange={(event) => handleOnChange(event, 'name')}
          helperText={`${
            locationInput.name?.length ?? 0
          }/${MAX_LOCATION_TITLE_LENGTH}`}
          label="Listing title"
          placeholder="Title"
          error={!validTitle(locationInput.name)}
        />
      </InputCoupleContainer>
      <InputCoupleContainer>
        <InputText
          placeholder={location.caretaker.name ?? ''}
          label="Caretaker"
          disabled
        />
        <InputText
          value={locationInput.caretakerEmail ?? ''}
          onChange={(event) => handleOnChange(event, 'caretakerEmail')}
          label="Caretaker email"
          placeholder="Email"
        />
      </InputCoupleContainer>
      <FullWidthInputContainer>
        <InputText
          value={locationInput.tagline ?? ''}
          onChange={(event) => handleOnChange(event, 'tagline')}
          helperText={`${
            locationInput.tagline?.length ?? 0
          }/${MAX_LOCATION_BIO_LENGTH}`}
          label="Short bio"
          placeholder="1 sentence description of your property"
        />
      </FullWidthInputContainer>
      <FullWidthInputContainer>
        <LocationAutocompleteInput
          onLocationChange={handleLocationChange}
          initialValue={address}
        />
      </FullWidthInputContainer>
      <InputCoupleContainer>
        <InputText
          value={locationInput.sleepCapacity ?? ''}
          onChange={(event) => handleOnChange(event, 'sleepCapacity')}
          label="Number of beds"
          placeholder="Value"
        />
        <InputText
          value={locationInput.internetSpeedMbps ?? ''}
          onChange={(event) => handleOnChange(event, 'internetSpeedMbps')}
          label="Average internet speed"
          placeholder="Value"
          endAdornment={<Subline2 style={{ opacity: '0.5' }}>Mbps</Subline2>}
        />
      </InputCoupleContainer>
      <HorizontalDivider />
      <InputCoupleContainer>
        <StyledDropdown
          enableSearch
          onSearch={handleSearch}
          label="Did someone at Cabin refer you?"
          placeholder="Name"
          options={options}
          selectedOption={selectedOption}
          onSelect={handleOnSelect}
        />
      </InputCoupleContainer>
    </StyledLocationStepWrapper>
  )
}

interface InputContainerProps {
  fullWidth?: boolean
}

const StyledDropdown = styled(Dropdown)`
  ${Subline2} {
    ${h4Styles}
  }
`

const StyledLocationStepWrapper = styled(LocationStepWrapper)`
  min-height: calc(100vh - 4.8rem);
`

const InputCoupleContainer = styled.div<InputContainerProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2.4rem;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`

const FullWidthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
