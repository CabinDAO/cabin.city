import Icon from '@/components/core/Icon'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { cloudflareImageUrl } from '@/lib/image'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

export const ImagesPreview = ({
  cfIds,
  onDelete,
  uploading = false,
}: {
  cfIds: string[]
  onDelete?: (cfId: string) => void
  uploading?: boolean
}) => {
  const { deviceSize } = useDeviceSize()
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  const handleImageLoaded = (cfId: string) => {
    setLoadedImages((prev) => [...prev, cfId])
  }

  const imageSize = deviceSize === 'mobile' ? 95.3 : 152

  if (!cfIds?.length && uploading) {
    return (
      <Container>
        <ImageContainer>
          <div style={{ width: imageSize, height: imageSize }} />
          <LoadingSpinner />
        </ImageContainer>
      </Container>
    )
  }

  return (
    <Container>
      {cfIds.map((cfId) => (
        <ImageContainer key={cfId}>
          <StyledImage
            loaded={loadedImages.includes(cfId)}
            onLoadingComplete={() => handleImageLoaded(cfId)}
            src={cloudflareImageUrl(cfId)}
            width={imageSize}
            height={imageSize}
            alt="Media Item Preview"
          />
          {loadedImages.includes(cfId ?? '') ? null : <LoadingSpinner />}
          <DeleteContainer onClick={() => (onDelete ? onDelete(cfId) : null)}>
            <Icon
              name="trash"
              size={deviceSize === 'mobile' ? 1.6 : 1.8}
              color="green900"
            />
          </DeleteContainer>
        </ImageContainer>
      ))}
    </Container>
  )
}

interface StyledImageProps {
  loaded: boolean
}

const StyledImage = styled(Image)<StyledImageProps>`
  object-fit: cover;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  auto-rows: 1fr;
  cursor: pointer;

  width: 100%;
  grid-gap: 0.79rem;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: repeat(5, 1fr);
  }
`

const DeleteContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background: ${({ theme }) => theme.colors.yellow100};
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  cursor: pointer;

  ${({ theme }) => theme.bp.md} {
    display: none;
    top: 1.6rem;
    right: 1.6rem;
    width: 4rem;
    height: 4rem;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: min-content;

  &:hover {
    ${DeleteContainer} {
      display: flex;
    }
  }

  ${LoadingSpinner} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
