import styled from 'styled-components'
import { H6 } from './Typography'
import { ImageFlex } from './gallery/ImageFlex'

const IMAGE_SIZE = 176
const MOBILE_IMAGE_SIZE = 148
const TABLET_IMAGE_SIZE = 133

export const getBadgeImageUrl = (specId: number) => {
  return `/images/stamps/${specId}.png`
}

export const Badge = ({ name, specId }: { name: string; specId: number }) => {
  return (
    <BadgeContainer>
      <ImageContainer>
        <ImageFlex
          src={getBadgeImageUrl(specId)}
          alt={name}
          fill
          sizes={`${IMAGE_SIZE}px`}
          unoptimized
        />
      </ImageContainer>
      <NameContainer>
        <H6>{name}</H6>
      </NameContainer>
    </BadgeContainer>
  )
}

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.yellow200};
  border: 1px solid ${({ theme }) => theme.colors.green900};
  width: min-content;
  height: 100%;
  gap: 1.2rem;

  ${({ theme }) => theme.bp.lg} {
    padding: 0.8rem;
  }
`

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  width: ${MOBILE_IMAGE_SIZE}px;
  height: ${MOBILE_IMAGE_SIZE}px;

  ${({ theme }) => theme.bp.md} {
    width: ${TABLET_IMAGE_SIZE}px;
    height: ${TABLET_IMAGE_SIZE}px;
  }

  ${({ theme }) => theme.bp.lg} {
    width: min-content;
    height: min-content;
    width: ${IMAGE_SIZE}px;
    height: ${IMAGE_SIZE}px;
  }
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 1rem;

  ${H6} {
    text-align: center;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 0rem;
  }
`
