import { Circle } from './Circle'
import styled from 'styled-components'
import { ColorName } from '@/styles/theme'

interface AvatarProps {
  src?: string
  size?: number
  hoverShadow?: boolean
  onClick?: () => void
  color?: ColorName
}

export const Avatar = ({
  src,
  size,
  hoverShadow,
  onClick,
  color,
}: AvatarProps) => {
  return (
    <StyledCircle
      onClick={onClick}
      size={size ?? 3.2}
      source={src ?? '/images/default-avatar.png'}
      shadowMode={hoverShadow ? 'hover' : 'never'}
      color={color}
    ></StyledCircle>
  )
}

const StyledCircle = styled(Circle)`
  cursor: pointer;
`
