import { ColorName } from '@/styles/theme'
import styled from 'styled-components'

interface NotchProps {
  color?: ColorName
  borderColor?: ColorName
  size?: number
}

const Corner = styled.div<NotchProps>`
  position: relative;
  align-self: flex-start;
  background-color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.yellow200};
  top: -0.1rem;
  left: -0.1rem;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  margin-bottom: -${({ size }) => size}rem;
  margin-right: -${({ size }) => size}rem;

  ${({ borderColor, theme, color }) => {
    const notchBorderColor = borderColor
      ? theme.colors[borderColor]
      : theme.colors.yellow900
    return `
      border-top: 0.1rem solid ${color};
      border-bottom: 0.1rem solid ${notchBorderColor};
      border-right: 0.1rem solid ${notchBorderColor};
      `
  }}
`

export const Notch = (props: NotchProps) => {
  return <Corner className="Corner" {...props} size={props.size ?? 1.6} />
}
