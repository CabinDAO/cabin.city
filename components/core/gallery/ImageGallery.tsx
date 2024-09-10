import { forwardRef } from 'react'
import Image from 'next/image'
import { useModal } from '@/components/hooks/useModal'
import { cloudflareImageUrl } from '@/lib/image'
import { LocationFragment } from '@/utils/types/location'
import styled from 'styled-components'
import { H2 } from '../Typography'
import { ImageBrowserModal } from './ImageBrowserModal'

interface ImageGalleryProps {
  id?: string
  title: string
  images: LocationFragment['mediaItems']
  className?: string
  onImageClickOverride?: (image: LocationFragment['mediaItems'][0]) => void
}

export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  (
    {
      id,
      title,
      onImageClickOverride,
      images = [],
      className,
    }: ImageGalleryProps,
    forwardedRef
  ) => {
    const { showModal } = useModal()
    const filteredImages = images.filter((image) => image.cfId)

    const handleImageOnClick = (imageIndex: number) => {
      if (onImageClickOverride) {
        onImageClickOverride(filteredImages[imageIndex])
      } else {
        showModal(() => (
          <ImageBrowserModal images={images} initialImageIndex={imageIndex} />
        ))
      }
    }

    if (filteredImages.length === 0) {
      return null
    }

    return (
      <Container className={className} id={id} ref={forwardedRef}>
        {title && <H2>{title}</H2>}
        <ImageList>
          {filteredImages.map((image, index) => {
            return (
              <ImageSizeContainer key={index}>
                <StyledImage
                  onClick={() => handleImageOnClick(index)}
                  alt={`image ${index}`}
                  src={cloudflareImageUrl(image.cfId)}
                  fill
                  sizes="415px"
                />
              </ImageSizeContainer>
            )
          })}
        </ImageList>
      </Container>
    )
  }
)

ImageGallery.displayName = 'ImageGallery'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.2rem;
  width: 100%;

  ${({ theme }) => theme.bp.md_max} {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 0.8rem;
  }
`

const ImageSizeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;

  ${({ theme }) => theme.bp.md} {
    width: 41.5rem;
    height: 30rem;
  }
`

const StyledImage = styled(Image)`
  object-fit: cover;
  cursor: pointer;
  object-position: center;
`
