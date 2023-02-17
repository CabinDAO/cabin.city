import styled from 'styled-components'

interface CircleProps {
  source: string
  size: number
  hoverShadow: boolean
}

const Circle = styled.div<CircleProps>`
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.green400};
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('${({ source }) => source}');
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};

  // Based on Design, it corresponds to 6% of the size
  --shadow-size: ${({ size }) => size * 0.06}rem;

  ${({ hoverShadow, theme }) =>
    hoverShadow &&
    `
      &:hover {
        box-shadow: var(--shadow-size) var(--shadow-size) 0px ${theme.colors.green900};
      }
    `}
`

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
      hoverShadow={!!hoverShadow}
    ></Circle>
  )
}
