import { useState } from 'react'
import { useError } from '@/components/hooks/useError'
import { useUpdateLocation } from '../useUpdateLocation'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import {
  LocationEditParamsType,
  LocationMediaCategory,
} from '@/utils/types/location'
import {
  PHOTO_REQUIRED_ERROR,
  REQUIRED_SECTIONS_TOAST_ERROR,
  REQUIRED_SECTION_ERROR,
} from '@/utils/validate'
import { unique } from '@/utils/array'
import { StepProps } from './location-wizard-configuration'
import { LocationStepWrapper } from './LocationStepWrapper'
import { HorizontalDivider } from '@/components/core/Divider'
import { GalleryUploadSection } from '../../core/GalleryUploadSection'

export const PhotoGalleryStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const { showError } = useError()
  const { updateLocation } = useUpdateLocation(location.externId)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [highlightErrors, setHighlightErrors] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [locationInput, setLocationInput] = useState<LocationEditParamsType>({
    bannerImageIpfsHash: location.bannerImageIpfsHash,
    mediaItems: location.mediaItems?.map((mediaItem) => ({
      ipfsHash: mediaItem?.ipfsHash,
      category: mediaItem?.category,
    })),
  })

  const handleNext = async () => {
    if (
      !locationInput.bannerImageIpfsHash ||
      !locationInput.mediaItems?.length
    ) {
      setHighlightErrors(true)
      showError(REQUIRED_SECTIONS_TOAST_ERROR)
      return
    }
    await updateLocation(locationInput)
    onNext()
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
    <LocationStepWrapper
      name={name}
      onNext={handleNext}
      onBack={onBack}
      steps={steps}
    >
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
    </LocationStepWrapper>
  )
}
