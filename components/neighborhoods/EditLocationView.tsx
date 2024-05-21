import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useError } from '@/components/hooks/useError'
import { useProfile } from '@/components/auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import {
  AddressFragmentType,
  LocationDeleteResponse,
  LocationEditParamsType,
  LocationEditResponse,
  LocationGetResponse,
  LocationMediaCategory,
} from '@/utils/types/location'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import {
  MAX_LOCATION_BIO_LENGTH,
  MAX_LOCATION_TITLE_LENGTH,
} from '@/components/neighborhoods/constants'
import {
  PHOTO_REQUIRED_ERROR,
  REQUIRED_FIELD_ERROR,
  REQUIRED_FIELDS_TOAST_ERROR,
  REQUIRED_SECTION_ERROR,
  truthyString,
} from '@/utils/validate'
import {
  validateBio,
  validateLocationInput,
  validateTitle,
} from '@/components/neighborhoods/validations'
import { unique } from '@/utils/array'
import { canEditLocation } from '@/utils/location'
import styled from 'styled-components'
import { Descendant } from 'slate'
import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { emptyEditorValue } from '@/components/core/slate/slate-utils'
import { TitleCard } from '@/components/core/TitleCard'
import { Body2, H3 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import { ActionBar } from '@/components/core/ActionBar'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { GalleryUploadSection } from '@/components/core/GalleryUploadSection'
import { HorizontalDivider } from '@/components/core/Divider'
import { InputLabel } from '@/components/core/InputLabel'
import { InputText } from '@/components/core/InputText'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'

export default EditLocationView

function EditLocationView() {
  const { showError } = useError()
  const router = useRouter()
  const { id: listingId, step } = router.query

  const { useGet, useMutate, useDelete } = useBackend()
  const { data, isLoading } = useGet<LocationGetResponse>(
    listingId ? ['LOCATION', { externId: listingId as string }] : null
  )
  const location = !data || 'error' in data ? null : data.location

  const { trigger: updateLocation } = useMutate<LocationEditResponse>(
    location ? ['LOCATION', { externId: location.externId }] : null
  )
  const { trigger: deleteLocation } = useDelete<LocationDeleteResponse>(
    location ? ['LOCATION', { externId: location.externId }] : null
  )

  const { user } = useProfile({ redirectTo: '/' })

  const [highlightErrors, setHighlightErrors] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [address, setAddress] = useState<AddressFragmentType | null>(
    location?.address || null
  )

  const [locationInput, setLocationInput] = useState<LocationEditParamsType>({
    name: location?.name,
    tagline: location?.tagline,
    description: location?.description,
    bannerImageIpfsHash: location?.bannerImageIpfsHash,
    mediaItems: location?.mediaItems?.map((mi) => ({
      ipfsHash: mi?.ipfsHash,
      category: mi?.category,
    })),
  })

  if (isLoading || !location || !canEditLocation(user, location)) {
    return null
  }

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

  const handleSave = async () => {
    if (
      validateLocationInput(locationInput) &&
      !emptyDescription &&
      locationInput.bannerImageIpfsHash &&
      locationInput.mediaItems?.length
    ) {
      await updateLocation({ ...locationInput, address })
      router.push(`/location/${location.externId}`).then()
    } else {
      setHighlightErrors(true)
      showError(REQUIRED_FIELDS_TOAST_ERROR)
    }
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
    <StyledLayout>
      <TitleCard
        title={`Edit Neighborhood`}
        icon="close"
        iconHref="/location"
      />
      <Container>
        <ContentCard shape="notch">
          <Contents>
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
                  error={
                    highlightErrors && !truthyString(address?.formattedAddress)
                  }
                  errorMessage={REQUIRED_FIELD_ERROR}
                />
              </FullWidthInputContainer>
              {user?.isAdmin && (
                <InputCoupleContainer>
                  <InputText
                    placeholder={location.steward?.name ?? 'no steward'}
                    label="Steward"
                    disabled
                  />
                </InputCoupleContainer>
              )}
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
                  Get specific, but be clear and brief. Describe what your
                  neighborhood is about, what happens there, and what makes it
                  special.
                </Body2>
              </FullWidthInputContainer>

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
                instructions="Add at least 3 images for the photo gallery. Choose JPG or PNG file formats no larger than 5 MB."
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
                  router.push(`/location/${location.externId}`).then()
                },
                label: 'Cancel',
              }}
              trashButton={{
                onClick: async () => {
                  await deleteLocation({})
                  router.push(`/city-directory`).then()
                },
                label: 'neighborhood',
              }}
            />
          </Contents>
        </ContentCard>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  padding-bottom: 20vh;

  ${({ theme }) => theme.bp.md} {
    padding-bottom: 0;
  }
`

const Contents = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const Container = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1.6rem;
  // margin-bottom: 4.8rem;
`

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
