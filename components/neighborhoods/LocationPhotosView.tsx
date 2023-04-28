import { TitleCard } from '@/components/core/TitleCard'
import { ImageGallery } from '@/components/core/gallery/ImageGallery'
import { LocationMediaCategory } from '@/generated/graphql'
import { useEffect, useRef } from 'react'
import { LocationProps } from '@/components/neighborhoods/LocationView'

export const LocationPhotosView = ({
  location,
  gallery,
}: {
  location: LocationProps
  gallery?: string | string[] | null | undefined
}) => {
  const { _id: locationId, mediaItems } = location
  const galleryPreviewSleepingRef = useRef<HTMLDivElement>(null)
  const galleryPreviewWorkingRef = useRef<HTMLDivElement>(null)
  const galleryPreviewFeaturesRef = useRef<HTMLDivElement>(null)
  const galleryPreviewSleeping = mediaItems
    .filter(({ category }) => category === LocationMediaCategory.Sleeping)
    .map((image) => ({
      ...image,
      name: `${image.category}-${image.imageIpfsHash}`,
    }))
  const galleryPreviewWorking = mediaItems
    .filter(({ category }) => category === LocationMediaCategory.Working)
    .map((image) => ({
      ...image,
      name: `${image.category}-${image.imageIpfsHash}`,
    }))
  const galleryPreviewFeatures = mediaItems
    .filter(({ category }) => category === LocationMediaCategory.Features)
    .map((image) => ({
      ...image,
      name: `${image.category}-${image.imageIpfsHash}`,
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

  return (
    <>
      <TitleCard
        title="Photo Gallery"
        icon="back-arrow"
        iconHref={`/location/${locationId}`}
      />
      <ImageGallery
        id="sleeping"
        ref={galleryPreviewSleepingRef}
        images={galleryPreviewSleeping}
        title="Sleeping arrangements"
      />
      <ImageGallery
        id="working"
        ref={galleryPreviewWorkingRef}
        images={galleryPreviewWorking}
        title="Work stations"
      />
      <ImageGallery
        id="features"
        ref={galleryPreviewFeaturesRef}
        images={galleryPreviewFeatures}
        title="Amenities"
      />
    </>
  )
}
