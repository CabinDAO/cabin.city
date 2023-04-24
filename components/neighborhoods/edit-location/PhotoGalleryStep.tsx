import { LocationStepWrapper } from './LocationStepWrapper'
import { StepProps } from './configuration'
import { useUpdateLocation } from '../useUpdateLocation'
import { useState } from 'react'
import { HorizontalDivider } from '@/components/core/Divider'
import { LocationPhotoGallerySection } from './LocationPhotoGallerySection'
import {
  LocationMediaCategory,
  PartialUpdateLocationInput,
} from '@/generated/graphql'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'

export const PhotoGalleryStep = ({
  name,
  onBack,
  onNext,
  location,
}: StepProps) => {
  const { updateLocation } = useUpdateLocation(location._id)

  const [locationInput, setLocationInput] =
    useState<PartialUpdateLocationInput>({
      bannerImageIpfsHash: location.bannerImageIpfsHash,
    })

  const handleNext = async () => {
    await updateLocation(locationInput)
    onNext()
  }

  const handleFilesUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap,
    category: LocationMediaCategory
  ) => {
    const currentCreatedImages = locationInput.mediaItems?.create || []
    const newImages = Object.values(fileNameIpfsHashMap).map(
      (imageIpfsHash) => ({
        imageIpfsHash,
        category,
      })
    )

    setLocationInput((prev) => ({
      ...prev,
      mediaItems: {
        create: [...currentCreatedImages, ...newImages],
      },
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

  return (
    <LocationStepWrapper name={name} onNext={handleNext} onBack={onBack}>
      <LocationPhotoGallerySection
        onFilesUploaded={handleBannerFileUploaded}
        title="Neighborhood banner image"
        instructions="This picture will be your banner on the listing page. It will be trimmed to a 7:3 ratio for desktop and 1:1 for mobile. Thus, it's best to put the main focus in the center to avoid unwanted trimming. Choose a JPG or PNG no larger than 5 MB."
      />
      <HorizontalDivider />
      <LocationPhotoGallerySection
        onFilesUploaded={(fileNameIpfsHashMap) =>
          handleFilesUploaded(
            fileNameIpfsHashMap,
            LocationMediaCategory.Sleeping
          )
        }
        title="sleeping arrangements"
        instructions="This is the maximum number of people who can sleep comfortably in a place. We recommend that neighborhoods have enough space for at least four people to sleep. Choose a JPG or PNG no larger than 5 MB."
      />
      <HorizontalDivider />
      <LocationPhotoGallerySection
        onFilesUploaded={(fileNameIpfsHashMap) =>
          handleFilesUploaded(
            fileNameIpfsHashMap,
            LocationMediaCategory.Working
          )
        }
        title="Work stations"
        instructions="This is a designated area where computer work, writing or other job duties are done. It should be equipped with the necessary tools and furniture. Choose a JPG or PNG no larger than 5 MB."
      />
      <HorizontalDivider />
      <LocationPhotoGallerySection
        onFilesUploaded={(fileNameIpfsHashMap) =>
          handleFilesUploaded(
            fileNameIpfsHashMap,
            LocationMediaCategory.Features
          )
        }
        title="Amenities"
        instructions="This entails any indoor or outdoor features like nearby nature or additional amenities your place offers. Choose a JPG or PNG no larger than 5 MB."
      />
    </LocationStepWrapper>
  )
}
