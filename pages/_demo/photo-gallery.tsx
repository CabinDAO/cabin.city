import { TitleCard } from '@/components/core/TitleCard'
import { ImageGallery } from '@/components/core/gallery/ImageGallery'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TempImage } from '@/lib/image'

const imagesList1: TempImage[] = [
  {
    name: 'Image 1',
    ipfsHash: 'QmaFKezRWFfpZ6Wu2sz7yNrPKU8r7EtdJwy6ncCqX5xvw3',
  },
  {
    name: 'Image 2',
    ipfsHash: 'QmeHuuumTXDPHQi8Mtyg6p2QNqGqHdaHjY6CTzxzpeaR3A',
  },
]

const imagesList2: TempImage[] = [
  ...imagesList1,
  {
    name: 'Image 3',
    ipfsHash: 'Qmc7R9bwERoZHBBCaZeWoY3D2JgWhxUUbMbKCwqvBkDTTJ',
  },
  {
    name: 'Image 4',
    ipfsHash: 'QmYnt42rqpWWGkgWPPtvAx8FxqyVqTK8yqVy3nr3Qh5Qrt',
  },
]

const PhotoGalleryDemo = () => {
  return (
    <SingleColumnLayout>
      <TitleCard
        title="Photo Gallery"
        icon="back-arrow"
        iconHref={`/dashboard`}
      />
      <ImageGallery images={imagesList1} title="Sleeping arrangements" />
      <ImageGallery images={imagesList2} title="Work stations" />
    </SingleColumnLayout>
  )
}

export default PhotoGalleryDemo
