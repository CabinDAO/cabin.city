import styled from 'styled-components'
import { ColorName } from '@/styles/theme'
import Image from 'next/image'
import { Circle } from './Circle'
import LoadingSpinner from './LoadingSpinner'

interface AvatarProps {
  src?: string
  size: number
  hoverShadow?: boolean
  onClick?: VoidFunction
  color?: ColorName
  isLoading?: boolean
  onRendered?: VoidFunction
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
      size={size}
      shadowMode={hoverShadow ? 'hover' : 'never'}
      color={color}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Image
          alt="Avatar"
          src={src || '/images/default-avatar.png'}
          width={size * 10}
          height={size * 10}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '50%',
          }}
        />
      )}
    </StyledCircle>
  )
}

const StyledCircle = styled(Circle)<{
  onClick?: VoidFunction
}>`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  position: relative; // need this because the image inside has 'fill' attribute
`
