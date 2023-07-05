import { getImageUrl } from '@/lib/image'
import { getOtterSpaceOpenseaUrl } from '@/utils/opensea'
import styled from 'styled-components'
import Icon from './Icon'
import { NoWrap } from './NoWrap'
import { H6 } from './Typography'
import { ImageFlex } from './gallery/ImageFlex'

interface BadgeProps {
  src: string
  name: string
  badgeId: string
}

const IMAGE_SIZE = 176
const MOBILE_IMAGE_SIZE = 148
const TABLET_IMAGE_SIZE = 133

export const Badge = ({ name, src, badgeId }: BadgeProps) => {
  const imageUrl = getImageUrl(src)

  return (
    <BadgeContainer>
      <ImageContainer>
        <ImageFlex src={imageUrl} alt={name} fill sizes={`${IMAGE_SIZE}px`} />
      </ImageContainer>
      <NameContainer>
        <NoWrap>
          <H6>{name}</H6>
        </NoWrap>
        <a
          href={getOtterSpaceOpenseaUrl(badgeId)}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="up-right-arrow" color="green900" size={1.1} />
        </a>
      </NameContainer>
    </BadgeContainer>
  )
}

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.yellow200};
  border: 1px solid ${({ theme }) => theme.colors.green900};
  width: min-content;
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
  justify-content: space-between;
  width: 100%;
  text-overflow: ellipsis;
  padding-bottom: 1rem;

  ${H6} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(${IMAGE_SIZE}px * 0.9);
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 0rem;
  }
`
