import { TempImage } from '@/lib/image'
import { useModal } from '../hooks/useModal'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { LocationFragment } from '@/utils/types/location'
import { TitleCard } from '@/components/core/TitleCard'
import { ImageGallery } from '@/components/core/gallery/ImageGallery'
import { ImageBrowserModal } from '@/components/core/gallery/ImageBrowserModal'

export const LocationPhotosView = ({
  location,
}: {
  location: LocationFragment
  gallery?: string | string[] | null | undefined
}) => {
  const { showModal } = useModal()
  const { deviceSize } = useDeviceSize()

  const images = location.mediaItems.map((image) => ({
    ...image,
    name: `${image.category}-${image.ipfsHash}`,
  }))

  const handleImageClick = (image: TempImage) => {
    if (deviceSize === 'mobile') {
      return
    }

    const index = images.findIndex((img) => img.ipfsHash === image.ipfsHash)

    showModal(() => (
      <ImageBrowserModal images={images} initialImageIndex={index} />
    ))
  }

  return (
    <>
      <TitleCard
        title="Photo Gallery"
        icon="back-arrow"
        iconHref={`/location/${location.externId}`}
      />
      <ImageGallery
        title={location.name}
        images={images}
        onImageClickOverride={handleImageClick}
      />
    </>
  )
}
