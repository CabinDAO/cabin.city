import { Circle } from './Circle'
import styled from 'styled-components'
import { ColorName } from '@/styles/theme'
import Image from 'next/image'
import LoadingSpinner from './LoadingSpinner'
import { remToPx } from '@/utils/display-utils'

interface AvatarProps {
  src?: string
  size?: number
  hoverShadow?: boolean
  onClick?: () => void
  color?: ColorName
  isLoading?: boolean
  onRendered?: () => void
}

export const Avatar = ({
  src,
  size,
  hoverShadow,
  onClick,
  color,
  isLoading = false,
}: AvatarProps) => {
  return (
    <StyledCircle
      onClick={onClick}
      size={size ?? 3.2}
      shadowMode={hoverShadow ? 'hover' : 'never'}
      color={color}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <StyledImage
          fill
          sizes={`${remToPx(size ?? 3.2)}px`}
          alt="Avatar"
          src={src ?? '/images/default-avatar.png'}
        />
      )}
    </StyledCircle>
  )
}

const StyledCircle = styled(Circle)`
  cursor: pointer;
`

const StyledImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  width: auto;
  height: auto;
`
