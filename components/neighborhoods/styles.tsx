import { pxToRem } from '@/utils/display-utils'
import styled from 'styled-components'

const IMAGE_HEIGHT_PX = 230.67
const IMAGE_MARGIN_PX = 24

interface PreviewProps {
  imageUrl: string
}

export const BannerPreviewContainer = styled.div`
  display: grid;
  grid-template-columns:
    calc(
      100% - (${pxToRem(IMAGE_HEIGHT_PX)}rem + ${pxToRem(IMAGE_MARGIN_PX)}rem)
    )
    auto;
  gap: ${pxToRem(IMAGE_MARGIN_PX)}rem;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const DesktopBanner = styled.div<PreviewProps>`
  display: flex;
  width: 100%;
  height: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
  background-color: #000;
  justify-content: center;
  align-items: center;
  background: url(${(props) => props.imageUrl}) no-repeat center center / cover;
`

export const MobileBanner = styled.div<PreviewProps>`
  height: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
  width: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
  display: flex;
  background: url(${(props) => props.imageUrl}) no-repeat center center / cover;
`

export const LocationListContainer = styled.div`
  width: 100%;

  .infinite-scroll-component {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
`
