import { pxToRem } from '@/utils/display-utils'
import styled from 'styled-components'
import { Button } from '../core/Button'
import LoadingSpinner from '../core/LoadingSpinner'

const IMAGE_HEIGHT_PX = 230.67
const MOBILE_IMAGE_HEIGHT_PX = 127
const IMAGE_MARGIN_PX = 24

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

export const DesktopBanner = styled.div`
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

export const MobileBanner = styled.div`
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

export const VoteButton = styled(Button)`
  padding: 0;
  padding-bottom: 0.2rem;
  width: 4.8rem;
  height: 4.8rem;
`

export const LocationListContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  background-color: ${({ theme }) => theme.colors.yellow200};
  padding: 2.4rem;

  .infinite-scroll-component {
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    grid-gap: 1.6rem;
    width: 100%;

    ${({ theme }) => theme.bp.md} {
      grid-template-columns: 1fr 1fr;
      row-gap: 3.7rem;
    }
  }
`
