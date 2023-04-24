import styled from 'styled-components'
import { H2 } from '../Typography'
import Image from 'next/image'
import { useModal } from '@/components/hooks/useModal'
import { ImageBrowserModal } from './ImageBrowserModal'
import { TempImage, resolveImageUrl } from '@/lib/image'

interface ImageGalleryProps {
  title: string
  images: TempImage[]
}

export const ImageGallery = ({ title, images = [] }: ImageGalleryProps) => {
  const { showModal } = useModal()
  const filteredImages = images.filter((image) => image.url || image.ipfsHash)

  const handleImageOnClick = (imageIndex: number) => {
    showModal(() => (
      <ImageBrowserModal images={images} initialImageIndex={imageIndex} />
    ))
  }

  if (filteredImages.length === 0) {
    return null
  }

  return (
    <Container>
      <H2>{title}</H2>
      <ImageList>
        {filteredImages.slice(0, 4).map((image, index) => {
          const imageUrl = resolveImageUrl(image)
          return imageUrl ? (
            <StyledImage
              onClick={() => handleImageOnClick(index)}
              key={image.name}
              alt={image.name}
              src={imageUrl}
              width={415}
              height={300}
            />
          ) : null
        })}
      </ImageList>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2.4rem;
`

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  auto-flow: column;
  grid-gap: 1.2rem;
`

const StyledImage = styled(Image)`
  cursor: pointer;
`
