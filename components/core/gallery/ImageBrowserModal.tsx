import { H2 } from '../Typography'
import styled from 'styled-components'
import { useState } from 'react'
import { useModal } from '@/components/hooks/useModal'
import NextImage from 'next/image'
import { TempImage, resolveImageUrl } from '@/lib/image'
import Icon from '../Icon'
import IconButton from '../IconButton'
import { useEvent } from 'react-use'

interface ImageBrowserModalProps {
  images: TempImage[]
  initialImageIndex?: number
}

export const ImageBrowserModal = ({
  images,
  initialImageIndex = 0,
}: ImageBrowserModalProps) => {
  const { hideModal } = useModal()
  const imageCount = images.length
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex)
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

  const imageUrl = resolveImageUrl(currentImage, true)

  return (
    <ImageBrowserContainer>
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
        {imageUrl ? (
          <StyledImageNextImage
            src={imageUrl}
            priority
            width={1120}
            height={805}
            alt={currentImage?.name ?? ''}
          />
        ) : null}
        <ChevronCircle onClick={handleNextImage}>
          <Icon name="chevron-right" color="green900" size={1.7} />
        </ChevronCircle>
      </ImagePager>
    </ImageBrowserContainer>
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
