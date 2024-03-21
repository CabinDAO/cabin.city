import React, { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '@/components/auth/useProfile'
import { useExternalUser } from '@/components/auth/useExternalUser'
import { useBackend } from '@/components/hooks/useBackend'
import {
  NeighborhoodFragment,
  NeighborhoodListParamsType,
  NeighborhoodListResponse,
} from '@/utils/types/neighborhood'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import styled from 'styled-components'
import { AvatarFragmentType } from '@/utils/types/profile'
import { Button } from '@/components/core/Button'
import { Dropdown } from '@/components/core/Dropdown'
import { InputText } from '@/components/core/InputText'
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
import { AddressFragmentType } from '@/utils/types/location'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { InputLabel } from '@/components/core/InputLabel'
import { Caption } from '@/components/core/Typography'
import { ContactUsLink } from '@/components/core/ContactUsLink'

export const RegistrationForm = ({
  onSubmit,
}: {
  onSubmit: (params: RegistrationParams) => void
}) => {
  const { linkEmail } = usePrivy()
  const { externalUser } = useExternalUser()
  const { user } = useProfile()
  const [email, setEmail] = useState('')

  const [avatar, setAvatar] = useState<AvatarFragmentType | undefined>()
  const [name, setName] = useState('')
  const [address, setAddress] = useState<AddressFragmentType>()
  const [neighborhood, setNeighborhood] = useState<
    NeighborhoodFragment | undefined
  >()

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
        neighborhoodExternId: neighborhood?.externId,
      })
      setSubmitted(true)
      return
    }

    if (externalUser?.email?.address) {
      setEmail(externalUser.email?.address)
    }
  }, [
    externalUser,
    avatar,
    address,
    name,
    email,
    onSubmit,
    user,
    submitted,
    neighborhood?.externId,
  ])

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanShowNameError(false)
    setName(e.target.value)
  }

  const onAddressChange = (address: AddressFragmentType) => {
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
          neighborhoodExternId: neighborhood?.externId,
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

      <NeighborhoodSelect
        address={address}
        selected={neighborhood}
        onNeighborhoodChange={setNeighborhood}
      />

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

const NeighborhoodSelect = ({
  address,
  selected,
  onNeighborhoodChange,
}: {
  address: AddressFragmentType | undefined
  selected: NeighborhoodFragment | undefined
  onNeighborhoodChange: (n: NeighborhoodFragment | undefined) => void
}) => {
  const label = 'Cabin Neighborhood'
  const { useGet } = useBackend()
  const { data, isLoading } = useGet<NeighborhoodListResponse>(
    address ? 'NEIGHBORHOOD_LIST' : null,
    {
      lat: address?.lat,
      lng: address?.lng,
      maxDistance: 200,
    } as NeighborhoodListParamsType
  )

  const neighborhoods = !data || 'error' in data ? [] : data.neighborhoods

  const neighborhoodSelectOptions = neighborhoods.map((n) => {
    return {
      label: n.name,
      value: n.externId,
    }
  })

  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >()

  const selectNeighborhood = (o: SelectOption | undefined) => {
    setSelectedOption(o)
    const n = o && neighborhoods.find((ne) => ne.externId === o.value)
    onNeighborhoodChange(n)
  }

  useEffect(() => {
    if (neighborhoodSelectOptions.length > 0) {
      if (!selected) {
        selectNeighborhood(neighborhoodSelectOptions[0])
        return
      }

      const selectedInOptions = neighborhoodSelectOptions.find(
        (n) => n.value === selected.externId
      )

      if (!selectedInOptions) {
        selectNeighborhood(neighborhoodSelectOptions[0])
      }
    } else {
      selectNeighborhood(undefined)
    }
  }, [neighborhoodSelectOptions, selected])

  if (!address || neighborhoods.length == 0) {
    return (
      <InputGroup>
        <InputContainer>
          <InputLabel required={false} label={label} />
          <Caption>
            {!address ? (
              'Enter a location'
            ) : (
              <>
                No Cabin neighborhoods near you yet. Want to start one?{' '}
                <ContactUsLink
                  subject={'new Cabin neighborhood'}
                  body={`I wanna start a neighborhood in ${address.formattedAddress}.%0D%0A%0D%0AMy relevant background: `}
                >
                  Contact us
                </ContactUsLink>
              </>
            )}
          </Caption>
        </InputContainer>
      </InputGroup>
    )
  }

  return (
    <InputGroup>
      <InputContainer>
        {isLoading ? (
          <>
            <InputLabel required={false} label={label} />
            <LoadingSpinner />
          </>
        ) : (
          <Dropdown
            label={label}
            error={data && 'error' in data}
            options={neighborhoodSelectOptions}
            selectedOption={selectedOption}
            onSelect={(n) => selectNeighborhood(n)}
          />
        )}
      </InputContainer>
    </InputGroup>
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
