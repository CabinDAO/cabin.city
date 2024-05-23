import styled from 'styled-components'
import { CollapsibleData } from '@/components/landing/CollapsibleList'
import Image from 'next/image'
import { pxToRem } from '@/utils/display-utils'
import { CollapsibleList } from './CollapsibleList'
import { DeviceSize, useDeviceSize } from '../hooks/useDeviceSize'
import { ImageFlex } from '../core/gallery/ImageFlex'

interface CollapsibleInfoSectionProps {
  variant: 'left' | 'right'
  data: CollapsibleData
}

const IMAGE_WIDTH_PX = 720
const IMAGE_HEIGHT_PX = 730
const TABLET_IMAGE_WIDTH_PX = 300
const TABLET_IMAGE_HEIGHT_PX = 494

export const CollapsibleInfoSection = (props: CollapsibleInfoSectionProps) => {
  const { deviceSize } = useDeviceSize()

  const isMobile = deviceSize === 'mobile'
  return (
    <Container {...props}>
      <Content {...props}>
        <ImageContainer deviceSize={deviceSize}>
          {isMobile ? (
            <ImageFlex
              aspectRatio={1}
              src={props.data.image}
              alt={props.data.title}
              sizes={`${TABLET_IMAGE_WIDTH_PX}px`}
            />
          ) : (
            <Image
              fill
              src={props.data.image}
              alt={props.data.title}
              sizes={`${IMAGE_WIDTH_PX}px`}
            />
          )}
        </ImageContainer>
        <CollapsibleList data={props.data} />
      </Content>
    </Container>
  )
}

const Container = styled.div<CollapsibleInfoSectionProps>`
  display: flex;
  flex-direction: row;
  width: 100%;

  ${({ variant, theme }) => {
    if (variant === 'left') {
      return `
        justify-content: center;

        ${theme.bp.lg} {
          justify-content: flex-start;
        }
      `
    } else {
      return `
        justify-content: center;

        ${theme.bp.lg} {
          justify-content: flex-end;
        }
        `
    }
  }}
`

const ImageContainer = styled.div<{ deviceSize: DeviceSize }>`
  display: flex;
  user-select: none;
  position: relative;
  width: 100vw;

  img {
    object-fit: cover;
    object-position: center;
  }

  ${({ theme }) => theme.bp.md} {
    position: relative;
    width: ${({ deviceSize }) =>
      pxToRem(
        deviceSize === 'desktop' ? IMAGE_WIDTH_PX : TABLET_IMAGE_WIDTH_PX
      )}rem;
    height: ${({ deviceSize }) =>
      pxToRem(
        deviceSize === 'desktop' ? IMAGE_HEIGHT_PX : TABLET_IMAGE_HEIGHT_PX
      )}rem;
  }
`

const Content = styled.div<CollapsibleInfoSectionProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;

    ${({ variant }) => {
      if (variant === 'left') {
        return `
          flex-direction: row;
          justify-content: flex-start;
        `
      } else {
        return `
          flex-direction: row-reverse;
          justify-content: flex-end;
        `
      }
    }}
  }
`
