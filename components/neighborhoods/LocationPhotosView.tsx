import { TitleCard } from '@/components/core/TitleCard'
import { ImageGallery } from '@/components/core/gallery/ImageGallery'
import { LocationMediaCategory } from '@/generated/graphql'
import { useEffect, useRef } from 'react'
import { LocationProps } from '@/components/neighborhoods/LocationView'
import { TempImage } from '@/lib/image'
import { useModal } from '../hooks/useModal'
import { ImageBrowserModal } from '../core/gallery/ImageBrowserModal'
import { useDeviceSize } from '../hooks/useDeviceSize'

export const LocationPhotosView = ({
  location,
  gallery,
}: {
  location: LocationProps
  gallery?: string | string[] | null | undefined
}) => {
  const { deviceSize } = useDeviceSize()
  const { _id: locationId, mediaItems } = location
  const galleryPreviewSleepingRef = useRef<HTMLDivElement>(null)
  const galleryPreviewWorkingRef = useRef<HTMLDivElement>(null)
  const galleryPreviewFeaturesRef = useRef<HTMLDivElement>(null)
  const galleryPreviewSleeping = mediaItems
    .filter(({ category }) => category === LocationMediaCategory.Sleeping)
    .map((image) => ({
      ...image,
      name: `${image.category}-${image.ipfsHash}`,
    }))
  const galleryPreviewWorking = mediaItems
    .filter(({ category }) => category === LocationMediaCategory.Working)
    .map((image) => ({
      ...image,
      name: `${image.category}-${image.ipfsHash}`,
    }))
  const galleryPreviewFeatures = mediaItems
    .filter(({ category }) => category === LocationMediaCategory.Features)
    .map((image) => ({
      ...image,
      name: `${image.category}-${image.ipfsHash}`,
    }))

  useEffect(() => {
    if (gallery === 'sleeping' && galleryPreviewSleepingRef.current) {
      galleryPreviewSleepingRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (gallery === 'working' && galleryPreviewWorkingRef.current) {
      galleryPreviewWorkingRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (gallery === 'features' && galleryPreviewFeaturesRef.current) {
      galleryPreviewFeaturesRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [gallery])

  const { showModal } = useModal()

  const allImages = [
    ...galleryPreviewFeatures,
    ...galleryPreviewSleeping,
    ...galleryPreviewWorking,
  ]

  const handleImageClick = (image: TempImage) => {
    if (deviceSize === 'mobile') {
      return
    }

    const index = allImages.findIndex((img) => img.ipfsHash === image.ipfsHash)

    showModal(() => (
      <ImageBrowserModal images={allImages} initialImageIndex={index} />
    ))
  }

  return (
    <>
      <TitleCard
        title="Photo Gallery"
        icon="back-arrow"
        iconHref={`/location/${locationId}`}
      />
      <ImageGallery
        id="features"
        ref={galleryPreviewFeaturesRef}
        images={galleryPreviewFeatures}
        title="Amenities"
        onImageClickOverride={handleImageClick}
      />
      <ImageGallery
        id="sleeping"
        ref={galleryPreviewSleepingRef}
        images={galleryPreviewSleeping}
        title="Sleeping arrangements"
        onImageClickOverride={handleImageClick}
      />
      <ImageGallery
        id="working"
        ref={galleryPreviewWorkingRef}
        images={galleryPreviewWorking}
        title="Work stations"
        onImageClickOverride={handleImageClick}
      />
    </>
  )
}
