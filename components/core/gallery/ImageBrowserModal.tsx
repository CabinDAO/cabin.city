import { useEffect, useState } from 'react'
import { useEvent } from 'react-use'
import Image from 'next/image'
import { cloudflareImageUrl } from '@/lib/image'
import { useModal } from '@/components/hooks/useModal'
import { LocationFragment } from '@/utils/types/location'
import styled from 'styled-components'
import { H2 } from '../Typography'
import Icon from '../Icon'
import IconButton from '../IconButton'

export const ImageBrowserModal = ({
  images,
  initialImageIndex = 0,
}: {
  images: LocationFragment['mediaItems']
  initialImageIndex?: number
}) => {
  const { hideModal } = useModal()
  const [preloadImages, setPreloadImages] = useState<boolean>(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex)

  const imageCount = images.length
  const currentImage = images[currentImageIndex]

  useEvent('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      handleNextImage()
    } else if (event.key === 'ArrowLeft') {
      handlePreviousImage()
    } else if (event.key === 'Escape') {
      hideModal()
    }
  })

  const handleNextImage = () => {
    const nextImageIndex = currentImageIndex + 1
    if (nextImageIndex < imageCount) {
      setCurrentImageIndex(nextImageIndex)
    }
  }

  const handlePreviousImage = () => {
    const previousImageIndex = currentImageIndex - 1
    if (previousImageIndex >= 0) {
      setCurrentImageIndex(previousImageIndex)
    }
  }

  useEffect(() => {
    if (preloadImages) {
      setPreloadImages(false)
    }
  }, [preloadImages])

  return (
    <Container>
      {preloadImages && <PreloadedImages images={images} />}
      <Header>
        <CloseButton>
          <IconButton
            icon="close"
            color="yellow100"
            size={2.6}
            onClick={hideModal}
          />
        </CloseButton>
        <H2 $color="yellow100" style={{ margin: 'auto' }}>
          {currentImageIndex + 1}/{imageCount}
        </H2>
      </Header>

      <Images>
        <Arrow onClick={handlePreviousImage}>
          <Icon name="chevron-left" color="green900" size={1.7} />
        </Arrow>

        <Image
          src={cloudflareImageUrl(currentImage.cfId)}
          alt={`image ${currentImageIndex + 1}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
          onClick={() => {
            window.open(
              cloudflareImageUrl(currentImage.cfId),
              '_blank',
              'noopener,noreferrer'
            )
          }}
        />

        <Arrow onClick={handleNextImage}>
          <Icon name="chevron-right" color="green900" size={1.7} />
        </Arrow>
      </Images>
    </Container>
  )
}

const PreloadedImages = ({
  images,
}: {
  images: LocationFragment['mediaItems']
}) => {
  return (
    <div style={{ display: 'none' }}>
      {images.map((image, index) => {
        return (
          <Image
            key={index}
            src={cloudflareImageUrl(image.cfId)}
            priority
            width={1120}
            height={805}
            alt={'image'}
          />
        )
      })}
    </div>
  )
}

const Container = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.green900};
  padding: 2rem;
  gap: 2rem;

  ${({ theme }) => theme.bp.md} {
    padding: 3rem 4rem;
    gap: 3.6rem;
  }
`

const Header = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const Images = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
`

const Arrow = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow100};
  cursor: pointer;
`
