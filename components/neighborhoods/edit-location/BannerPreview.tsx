import { Subline1 } from '@/components/core/Typography'
import styled from 'styled-components'
import { BannerPreviewContainer, DesktopBanner, MobileBanner } from '../styles'
import { AutofitNextImage } from '@/components/core/AutofitNextImage'
import { useState } from 'react'
import LoadingSpinner from '@/components/core/LoadingSpinner'

interface BannerPreviewProps {
  imageUrl?: string | undefined | null
  uploading?: boolean
}

export const BannerPreview = ({ imageUrl, uploading }: BannerPreviewProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleOnLoad = () => {
    setImageLoaded(true)
  }

  const displaySpinner = uploading || !imageLoaded

  if (!uploading && !imageUrl) {
    return null
  }

  return (
    <BannerPreviewContainer>
      <Preview>
        <Subline1>Desktop preview</Subline1>
        <DesktopBanner>
          {imageUrl ? (
            <LocationBanner
              onLoadingComplete={handleOnLoad}
              loaded={imageLoaded}
              src={imageUrl}
              alt="banner"
            />
          ) : null}
          {displaySpinner ? <LoadingSpinner /> : null}
        </DesktopBanner>
      </Preview>
      <Preview>
        <Subline1>Mobile preview</Subline1>
        <MobileBanner>
          {imageUrl ? (
            <LocationBanner
              onLoadingComplete={handleOnLoad}
              loaded={imageLoaded}
              src={imageUrl}
              alt="banner"
            />
          ) : null}
          {displaySpinner ? <LoadingSpinner /> : null}
        </MobileBanner>
      </Preview>
    </BannerPreviewContainer>
  )
}

const Preview = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.7rem;
`

interface LocationBannerProps {
  loaded: boolean
}

const LocationBanner = styled(AutofitNextImage)<LocationBannerProps>`
  object-fit: cover;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
    height: auto;
  }
`
