import { Circle } from './Circle'

interface AvatarProps {
  src?: string
  size?: number
  hoverShadow?: boolean
  onClick?: () => void
}

export const Avatar = ({ src, size, hoverShadow, onClick }: AvatarProps) => {
  return (
    <Circle
      onClick={onClick}
      size={size ?? 3.2}
      source={src ?? '/images/default-avatar.png'}
      shadowMode={hoverShadow ? 'hover' : 'never'}
    ></Circle>
  )
}
