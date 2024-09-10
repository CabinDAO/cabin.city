import { useEffect, useState } from 'react'
import { useEvent } from 'react-use'
import NextImage from 'next/image'
import { useModal } from '@/components/hooks/useModal'
import { LocationFragment } from '@/utils/types/location'
import { cloudflareImageUrl } from '@/lib/image'
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
  const imageCount = images.length
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex)
  const currentImage = images[currentImageIndex]
  const [preloadImages, setPreloadImages] = useState<boolean>(true)

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
    <ImageBrowserContainer>
      {preloadImages && <PreloadedImages images={images} />}
      <ModalHeader>
        <IconContainer>
          <IconButton
            icon="close"
            color="yellow100"
            size={2.6}
            onClick={hideModal}
          />
        </IconContainer>
        <H2 $color="yellow100">
          {currentImageIndex + 1}/{imageCount}
        </H2>
      </ModalHeader>
      <ImagePager key={currentImageIndex}>
        <ChevronCircle onClick={handlePreviousImage}>
          <Icon name="chevron-left" color="green900" size={1.7} />
        </ChevronCircle>
        <StyledImageNextImage
          src={cloudflareImageUrl(currentImage.cfId)}
          width={1120}
          height={805}
          alt={`image ${currentImageIndex + 1}`}
        />
        <ChevronCircle onClick={handleNextImage}>
          <Icon name="chevron-right" color="green900" size={1.7} />
        </ChevronCircle>
      </ImagePager>
    </ImageBrowserContainer>
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
          <NextImage
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

const ModalHeader = styled.div`
  display: flex;
`

const IconContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 4rem;
`

const ImagePager = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const ChevronCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`

const ImageBrowserContainer = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.green900};
  padding: 3rem 4rem;
  gap: 3.6rem;
`

const StyledImageNextImage = styled(NextImage)`
  object-fit: cover;
`
