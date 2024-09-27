import { useModal } from '@/components/hooks/useModal'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { LocationFragment } from '@/utils/types/location'
import { TitleCard } from '@/components/core/TitleCard'
import { ImageGallery } from '@/components/core/gallery/ImageGallery'
import { ImageBrowserModal } from '@/components/core/gallery/ImageBrowserModal'
import { expandRoute } from '@/utils/routing'

export const LocationPhotosView = ({
  location,
}: {
  location: LocationFragment
}) => {
  const { showModal } = useModal()
  const { deviceSize } = useDeviceSize()

  const handleImageClick = (
    clickedImage: LocationFragment['mediaItems'][0]
  ) => {
    if (deviceSize === 'mobile') {
      return
    }

    const index = location.mediaItems.findIndex(
      (img) => img.cfId === clickedImage.cfId
    )

    showModal(() => (
      <ImageBrowserModal
        images={location.mediaItems}
        initialImageIndex={index}
      />
    ))
  }

  return (
    <>
      <TitleCard
        title="Photo Gallery"
        icon="back-arrow"
        iconHref={expandRoute(['n_id', { id: location.externId }])}
      />
      <ImageGallery
        title={location.name}
        images={location.mediaItems}
        onImageClickOverride={handleImageClick}
      />
    </>
  )
}
