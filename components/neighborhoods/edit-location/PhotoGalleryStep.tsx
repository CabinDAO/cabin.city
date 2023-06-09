import { LocationStepWrapper } from './LocationStepWrapper'
import { StepProps } from './location-wizard-configuration'
import { useUpdateLocation } from '../useUpdateLocation'
import { useState } from 'react'
import { HorizontalDivider } from '@/components/core/Divider'
import { GalleryUploadSection } from '../../core/GalleryUploadSection'
import {
  InputMaybe,
  LocationMediaCategory,
  PartialUpdateLocationInput,
} from '@/generated/graphql'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { unique } from '@/utils/array'
import {
  PHOTO_REQUIRED_ERROR,
  REQUIRED_SECTIONS_TOAST_ERROR,
  REQUIRED_SECTION_ERROR,
} from '@/utils/validate'
import { useError } from '@/components/hooks/useError'

export const PhotoGalleryStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const { updateLocation } = useUpdateLocation(location._id)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [highlightErrors, setHighlightErrors] = useState(false)
  const [uploadingByCategory, setUploadingByCategory] = useState<{
    [key in LocationMediaCategory]: boolean
  }>({
    [LocationMediaCategory.Sleeping]: false,
    [LocationMediaCategory.Working]: false,
    [LocationMediaCategory.Features]: false,
  })

  const [locationInput, setLocationInput] =
    useState<PartialUpdateLocationInput>({
      bannerImageIpfsHash: location.bannerImageIpfsHash,
      mediaItems: location.mediaItems?.map((mediaItem) => ({
        ipfsHash: mediaItem?.ipfsHash,
        category: mediaItem?.category,
      })),
    })

  const getImagesForCategory = (category: LocationMediaCategory) => {
    const imagesForCategory = locationInput.mediaItems?.filter(
      (mediaItem) => mediaItem?.category === category
    )

    if (!imagesForCategory) return []

    const ipfsHashList = imagesForCategory.map(
      (mediaItem) => mediaItem?.ipfsHash ?? ''
    ) as string[]

    return unique<string>(ipfsHashList)
  }

  const resolvedbannerImageIpfsHash = locationInput?.bannerImageIpfsHash

  const { showError } = useError()

  const handleNext = async () => {
    if (
      !locationInput.bannerImageIpfsHash ||
      !getImagesForCategory(LocationMediaCategory.Sleeping).length ||
      !getImagesForCategory(LocationMediaCategory.Working).length ||
      !getImagesForCategory(LocationMediaCategory.Features).length
    ) {
      setHighlightErrors(true)
      showError(REQUIRED_SECTIONS_TOAST_ERROR)
      return
    }
    await updateLocation(locationInput)
    onNext()
  }

  const handleFilesUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap,
    category: LocationMediaCategory
  ) => {
    setUploadingByCategory((prev) => ({
      ...prev,
      [category]: false,
    }))

    const newImages = Object.values(fileNameIpfsHashMap).map((ipfsHash) => ({
      ipfsHash,
      category,
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

  const deleteByIpfsHash = (ipfsHash: InputMaybe<string> | undefined) => {
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
        instructions="This picture will be your banner on the listing page. It will be trimmed to a 7:3 ratio for desktop and 1:1 for mobile. Thus, it's best to put the main focus in the center to avoid unwanted trimming. Choose a JPG or PNG no larger than 5 MB."
        isBanner
        ipfsHashList={
          resolvedbannerImageIpfsHash ? [resolvedbannerImageIpfsHash] : []
        }
        errorMessage={
          highlightErrors && !resolvedbannerImageIpfsHash
            ? REQUIRED_SECTION_ERROR
            : undefined
        }
      />
      <HorizontalDivider />
      <GalleryUploadSection
        onStartUploading={() =>
          setUploadingByCategory((prev) => ({
            ...prev,
            [LocationMediaCategory.Sleeping]: true,
          }))
        }
        uploading={uploadingByCategory[LocationMediaCategory.Sleeping]}
        onFilesUploaded={(fileNameIpfsHashMap) =>
          handleFilesUploaded(
            fileNameIpfsHashMap,
            LocationMediaCategory.Sleeping
          )
        }
        onDelete={deleteByIpfsHash}
        title="sleeping arrangements"
        instructions="Share images of the available sleeping arrangements at your place to provide potential guests with an idea of where they can rest. Choose JPG or PNG file formats no larger than 5 MB."
        ipfsHashList={getImagesForCategory(LocationMediaCategory.Sleeping)}
        errorMessage={
          highlightErrors &&
          !getImagesForCategory(LocationMediaCategory.Sleeping).length
            ? PHOTO_REQUIRED_ERROR
            : undefined
        }
      />
      <HorizontalDivider />
      <GalleryUploadSection
        onStartUploading={() =>
          setUploadingByCategory((prev) => ({
            ...prev,
            [LocationMediaCategory.Working]: true,
          }))
        }
        uploading={uploadingByCategory[LocationMediaCategory.Working]}
        onDelete={deleteByIpfsHash}
        onFilesUploaded={(fileNameIpfsHashMap) =>
          handleFilesUploaded(
            fileNameIpfsHashMap,
            LocationMediaCategory.Working
          )
        }
        title="Work stations"
        instructions="This is a designated area where computer work, writing or other job duties are done. It should be equipped with the necessary tools and furniture. Choose a JPG or PNG no larger than 5 MB."
        ipfsHashList={getImagesForCategory(LocationMediaCategory.Working)}
        errorMessage={
          highlightErrors &&
          !getImagesForCategory(LocationMediaCategory.Working).length
            ? PHOTO_REQUIRED_ERROR
            : undefined
        }
      />
      <HorizontalDivider />
      <GalleryUploadSection
        onStartUploading={() =>
          setUploadingByCategory((prev) => ({
            ...prev,
            [LocationMediaCategory.Features]: true,
          }))
        }
        uploading={uploadingByCategory[LocationMediaCategory.Features]}
        onDelete={deleteByIpfsHash}
        onFilesUploaded={(fileNameIpfsHashMap) =>
          handleFilesUploaded(
            fileNameIpfsHashMap,
            LocationMediaCategory.Features
          )
        }
        title="Amenities"
        instructions="This entails any indoor or outdoor features like nearby nature or additional amenities your place offers. Choose a JPG or PNG no larger than 5 MB."
        ipfsHashList={getImagesForCategory(LocationMediaCategory.Features)}
        errorMessage={
          highlightErrors &&
          !getImagesForCategory(LocationMediaCategory.Features).length
            ? PHOTO_REQUIRED_ERROR
            : undefined
        }
      />
    </LocationStepWrapper>
  )
}
