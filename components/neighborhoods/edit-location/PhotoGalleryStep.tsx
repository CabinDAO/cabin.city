import { LocationStepWrapper } from './LocationStepWrapper'
import { StepProps } from './location-wizard-configuration'
import { useUpdateLocation } from '../useUpdateLocation'
import { useState } from 'react'
import { HorizontalDivider } from '@/components/core/Divider'
import { LocationPhotoGallerySection } from './LocationPhotoGallerySection'
import {
  InputMaybe,
  LocationMediaCategory,
  PartialUpdateLocationInput,
} from '@/generated/graphql'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { unique } from '@/utils/array'

export const PhotoGalleryStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const { updateLocation } = useUpdateLocation(location._id)

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

  const handleNext = async () => {
    await updateLocation(locationInput)
    onNext()
  }

  const handleFilesUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap,
    category: LocationMediaCategory
  ) => {
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
      <LocationPhotoGallerySection
        onFilesUploaded={handleBannerFileUploaded}
        title="Neighborhood banner image"
        instructions="This picture will be your banner on the listing page. It will be trimmed to a 7:3 ratio for desktop and 1:1 for mobile. Thus, it's best to put the main focus in the center to avoid unwanted trimming. Choose a JPG or PNG no larger than 5 MB."
        isBanner
        ipfsHashList={
          resolvedbannerImageIpfsHash ? [resolvedbannerImageIpfsHash] : []
        }
      />
      <HorizontalDivider />
      <LocationPhotoGallerySection
        onFilesUploaded={(fileNameIpfsHashMap) =>
          handleFilesUploaded(
            fileNameIpfsHashMap,
            LocationMediaCategory.Sleeping
          )
        }
        onDelete={deleteByIpfsHash}
        title="sleeping arrangements"
        instructions="This is the maximum number of people who can sleep comfortably in a place. We recommend that neighborhoods have enough space for at least four people to sleep. Choose a JPG or PNG no larger than 5 MB."
        ipfsHashList={getImagesForCategory(LocationMediaCategory.Sleeping)}
      />
      <HorizontalDivider />
      <LocationPhotoGallerySection
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
      />
      <HorizontalDivider />
      <LocationPhotoGallerySection
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
      />
    </LocationStepWrapper>
  )
}
