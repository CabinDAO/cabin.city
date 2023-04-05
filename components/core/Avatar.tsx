import { Circle } from './Circle'
import styled from 'styled-components'

interface AvatarProps {
  src?: string
  size?: number
  hoverShadow?: boolean
  onClick?: () => void
}

export const Avatar = ({ src, size, hoverShadow, onClick }: AvatarProps) => {
  return (
    <StyledCircle
      onClick={onClick}
      size={size ?? 3.2}
      source={src ?? '/images/default-avatar.png'}
      shadowMode={hoverShadow ? 'hover' : 'never'}
    ></StyledCircle>
  )
}

const StyledCircle = styled(Circle)`
  cursor: pointer;
`
