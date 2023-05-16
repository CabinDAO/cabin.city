import { pxToRem } from '@/utils/display-utils'
import styled from 'styled-components'
import { Button } from '../core/Button'

const IMAGE_HEIGHT_PX = 230.67
const MOBILE_IMAGE_HEIGHT_PX = 127
const IMAGE_MARGIN_PX = 24

interface PreviewProps {
  imageUrl: string
}

export const BannerPreviewContainer = styled.div`
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

export const DesktopBanner = styled.div<PreviewProps>`
  display: flex;
  width: 100%;
  height: ${pxToRem(MOBILE_IMAGE_HEIGHT_PX)}rem;
  background-color: #000;
  justify-content: center;
  align-items: center;
  background: url(${(props) => props.imageUrl}) no-repeat center center / cover;

  ${(props) => props.theme.bp.md} {
    background: url(${(props) => props.imageUrl}) no-repeat center center /
      cover;
    height: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
  }
`

export const MobileBanner = styled.div<PreviewProps>`
  width: 29.6rem;
  height: 29.6rem;
  display: flex;
  background: url(${(props) => props.imageUrl}) no-repeat center center / cover;

  ${(props) => props.theme.bp.md} {
    height: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
    width: ${pxToRem(IMAGE_HEIGHT_PX)}rem;
  }
`

export const LocationListContainer = styled.div`
  width: 100%;

  .infinite-scroll-component {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
`

export const VoteButton = styled(Button)`
  padding: 0;
  padding-bottom: 0.2rem;
  width: 4.8rem;
  height: 4.8rem;
`
