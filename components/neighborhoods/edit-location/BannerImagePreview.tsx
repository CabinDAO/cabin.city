import { useState } from 'react'
import { pxToRem } from '@/utils/display-utils'
import styled from 'styled-components'
import { Subline1 } from '@/components/core/Typography'
import { AutofitNextImage } from '@/components/core/AutofitNextImage'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { AutoImage } from '@/components/core/AutoImage'

export function BannerImagePreview({
  imageUrl,
  uploading,
}: {
  imageUrl?: string | undefined | null
  uploading?: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleOnLoad = () => {
    setImageLoaded(true)
  }

  const displaySpinner = uploading || !imageLoaded

  if (!uploading && !imageUrl) {
    return null
  }

  return (
    <Container>
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
    </Container>
  )
}

const IMAGE_HEIGHT_PX = 230.67
const MOBILE_IMAGE_HEIGHT_PX = 127
const IMAGE_MARGIN_PX = 24

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(IMAGE_MARGIN_PX)}rem;
  width: 100%;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.bp.md} {
    display: grid;
    grid-template-columns:
      calc(
        100% - (${pxToRem(IMAGE_HEIGHT_PX)}rem + ${pxToRem(IMAGE_MARGIN_PX)}rem)
      )
      auto;
  }
`
const Preview = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.7rem;
`

const LocationBanner = styled(AutofitNextImage)<{
  loaded: boolean
}>`
  object-fit: cover;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
    height: auto;
  }
`

const DesktopBanner = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: ${pxToRem(MOBILE_IMAGE_HEIGHT_PX)}rem;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.bp.md} {
    height: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
  }

  ${LoadingSpinner} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const MobileBanner = styled.div`
  width: 29.6rem;
  height: 29.6rem;
  display: flex;
  position: relative;

  ${(props) => props.theme.bp.md} {
    height: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
    width: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
  }

  ${LoadingSpinner} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
