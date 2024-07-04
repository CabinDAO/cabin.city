import React, { useState } from 'react'
import { useError } from '@/components/hooks/useError'
import { useProfile } from '@/components/auth/useProfile'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { useBackend } from '@/components/hooks/useBackend'
import {
  AddressFragmentType,
  LocationDeleteResponse,
  LocationEditParamsType,
  LocationEditResponse,
  LocationFragment,
  LocationMediaCategory,
} from '@/utils/types/location'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import {
  PHOTO_REQUIRED_ERROR,
  REQUIRED_FIELD_ERROR,
  REQUIRED_FIELDS_TOAST_ERROR,
  REQUIRED_SECTION_ERROR,
} from '@/utils/validate'
import {
  MAX_LOCATION_TITLE_LENGTH,
  validateLocationInput,
  validateTitle,
  truthyString,
} from '@/components/neighborhoods/validations'
import { unique } from '@/utils/array'
import styled from 'styled-components'
import { Descendant } from 'slate'
import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { isEmptyEditoryValue } from '@/components/core/slate/slate-utils'
import { Body2 } from '@/components/core/Typography'
import { ActionBar } from '@/components/core/ActionBar'
import { GalleryUploadSection } from '@/components/core/GalleryUploadSection'
import { HorizontalDivider } from '@/components/core/Divider'
import { InputLabel } from '@/components/core/InputLabel'
import { InputText } from '@/components/core/InputText'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { Dropdown } from '@/components/core/Dropdown'

export function LocationEditForm({
  location,
  afterSave,
  afterCancel,
  afterDelete,
}: {
  location: LocationFragment
  afterSave: () => void
  afterCancel: () => void
  afterDelete: () => void
}) {
  const { showError } = useError()
  const { user } = useProfile()
  const { useMutate, useDelete } = useBackend()

  const { trigger: updateLocation } = useMutate<LocationEditResponse>([
    'LOCATION',
    { externId: location.externId },
  ])
  const { trigger: deleteLocation } = useDelete<LocationDeleteResponse>([
    'LOCATION',
    { externId: location.externId },
  ])

  const [address, setAddress] = useState<AddressFragmentType | null>(
    location.address || null
  )

  const [locationInput, setLocationInput] = useState<LocationEditParamsType>({
    name: location.name,
    description: location.description,
    published: location.publishedAt ? 'true' : 'false',
    bannerImageIpfsHash: location.bannerImageIpfsHash,
    mediaItems: location.mediaItems?.map((mi) => ({
      ipfsHash: mi?.ipfsHash,
      category: mi?.category,
    })),
  })

  const [highlightErrors, setHighlightErrors] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [uploading, setUploading] = useState(false)

  const emptyDescription = isEmptyEditoryValue(locationInput?.description)
  const slateProps = locationInput?.description
    ? { value: JSON.parse(locationInput.description) }
    : {}

  const nameValidation = validateTitle(locationInput.name)

  const handleSave = async () => {
    if (
      validateLocationInput(locationInput) &&
      !emptyDescription &&
      !!locationInput.bannerImageIpfsHash &&
      !!locationInput.mediaItems?.length
    ) {
      await updateLocation({ ...locationInput, address })
      afterSave()
    } else {
      setHighlightErrors(true)
      showError(REQUIRED_FIELDS_TOAST_ERROR)
    }
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof LocationEditParamsType
  ) => {
    if (field === 'name') {
      setLocationInput((prev) => ({
        ...prev,
        [field]: e.target.value.slice(0, MAX_LOCATION_TITLE_LENGTH),
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

  const visibilityOptions = [
    {
      label: 'Public (anyone can see)',
      value: true,
    },
    {
      label: 'Private (only stewards can see)',
      value: false,
    },
  ]

  const handleVisibilityChange = (value: SelectOption) => {
    setLocationInput({
      ...locationInput,
      published: value.value ? 'true' : 'false',
    })
  }

  const handleFilesUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    setUploading(false)

    const newImages = Object.values(fileNameIpfsHashMap).map((ipfsHash) => ({
      ipfsHash,
      category: LocationMediaCategory.Features,
    }))

    const currentImages = locationInput.mediaItems ?? []

    setLocationInput((prev) => ({
      ...prev,
      mediaItems: [...currentImages, ...newImages],
    }))
  }

  const handleBannerFileUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    setUploadingBanner(false)
    setLocationInput((prev) => ({
      ...prev,
      bannerImageIpfsHash:
        fileNameIpfsHashMap[Object.keys(fileNameIpfsHashMap)[0]],
    }))
  }

  const deleteByIpfsHash = (ipfsHash: string) => {
    const foundCreatedMediaItem = locationInput.mediaItems?.find(
      (mediaItem) => mediaItem?.ipfsHash === ipfsHash
    )

    if (foundCreatedMediaItem) {
      setLocationInput((prev) => ({
        ...prev,
        mediaItems: prev.mediaItems?.filter(
          (mediaItem) => mediaItem?.ipfsHash !== foundCreatedMediaItem?.ipfsHash
        ),
      }))
    }
  }

  return (
    <>
      <FormContainer>
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
          <LocationAutocompleteInput
            onLocationChange={handleLocationChange}
            initialValue={address}
            error={highlightErrors && !truthyString(address?.formattedAddress)}
            errorMessage={REQUIRED_FIELD_ERROR}
          />
        </FullWidthInputContainer>

        <FullWidthInputContainer>
          <InputLabel label={'Description'} required />
          <div style={{ margin: '1rem 0' }}>
            <SlateEditor
              {...slateProps}
              placeholder="Share a description of your neighborhood here"
              onChange={handleEditorChange}
              error={
                highlightErrors && emptyDescription
                  ? REQUIRED_FIELD_ERROR
                  : null
              }
            />
          </div>
          <Body2>
            Get specific, but be clear and brief. Describe what your
            neighborhood is about, what happens there, and what makes it
            special.
          </Body2>
        </FullWidthInputContainer>

        <InputCoupleContainer>
          <Dropdown
            selectedOption={
              locationInput.published === 'true'
                ? visibilityOptions[0]
                : visibilityOptions[1]
            }
            onSelect={handleVisibilityChange}
            label="Visibility"
            options={visibilityOptions}
          />
          {user?.isAdmin && (
            <InputText
              placeholder={location.steward?.name ?? 'no steward'}
              label="Steward"
              disabled
            />
          )}
        </InputCoupleContainer>

        <HorizontalDivider />

        <GalleryUploadSection
          onStartUploading={() => setUploadingBanner(true)}
          onFilesUploaded={handleBannerFileUploaded}
          uploading={uploadingBanner}
          title="Neighborhood banner image"
          instructions="This picture will be your banner on the neighborhood page. It will be trimmed to a 7:3 ratio for desktop and 1:1 for mobile. Thus, it's best to put the main focus in the center to avoid unwanted trimming. Choose a JPG or PNG no larger than 5 MB."
          isBanner
          ipfsHashList={
            locationInput?.bannerImageIpfsHash
              ? [locationInput.bannerImageIpfsHash]
              : []
          }
          errorMessage={
            highlightErrors && !locationInput?.bannerImageIpfsHash
              ? REQUIRED_SECTION_ERROR
              : undefined
          }
        />

        <HorizontalDivider />

        <GalleryUploadSection
          onStartUploading={() => setUploading(true)}
          uploading={uploading}
          onFilesUploaded={(fileNameIpfsHashMap) =>
            handleFilesUploaded(fileNameIpfsHashMap)
          }
          onDelete={deleteByIpfsHash}
          title="Photos"
          instructions="Add images for the photo gallery. Choose JPG or PNG file formats no larger than 5 MB."
          multiple
          ipfsHashList={unique<string>(
            (locationInput.mediaItems || []).map((mi) => mi.ipfsHash)
          )}
          errorMessage={
            highlightErrors && !locationInput.mediaItems?.length
              ? PHOTO_REQUIRED_ERROR
              : undefined
          }
        />
      </FormContainer>
      <ActionBar
        primaryButton={{
          onClick: handleSave,
          label: 'Save',
        }}
        secondaryButton={{
          onClick: () => {
            afterCancel()
          },
          label: 'Cancel',
        }}
        trashButton={{
          onClick: async () => {
            await deleteLocation({})
            afterDelete()
          },
          label: 'neighborhood',
        }}
      />
    </>
  )
}

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 2.4rem;
  gap: 2.4rem;
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
