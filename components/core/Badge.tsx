import { getImageUrl } from '@/lib/image'
import { getOtterSpaceOpenseaUrl } from '@/utils/opensea'
import Image from 'next/image'
import styled from 'styled-components'
import Icon from './Icon'
import { NoWrap } from './NoWrap'
import { H6 } from './Typography'

interface BadgeProps {
  src: string
  name: string
  badgeId: string
}

const IMAGE_SIZE = 176

export const Badge = ({ name, src, badgeId }: BadgeProps) => {
  const imageUrl = getImageUrl(src)

  return (
    <BadgeContainer>
      <ImageContainer>
        <Image
          src={imageUrl}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          alt={name}
        />
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
  align-items: flex-start;
  justify-content: center;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.yellow200};
  border: 1px solid ${({ theme }) => theme.colors.green900};
  width: min-content;
  gap: 1.2rem;
`

const ImageContainer = styled.div`
  border-radius: 0px 0px 48px 0px;
  width: min-content;
  height: min-content;
  display: flex;
  overflow: hidden;
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-overflow: ellipsis;

  ${H6} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(${IMAGE_SIZE}px * 0.9);
  }
`
