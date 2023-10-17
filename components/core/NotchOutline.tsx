import { ColorName } from '@/styles/theme'
import styled, { css } from 'styled-components'
import { NotchPosition } from '../layouts/common.styles'

interface NotchOutlineProps {
  notchSize: number
  notchPosition?: NotchPosition
  color?: ColorName
}

export const NotchOutline = ({
  notchSize,
  notchPosition = 'top-left',
}: NotchOutlineProps) => {
  return <Container notchSize={notchSize} notchPosition={notchPosition} />
}

const Container = styled.div<NotchOutlineProps>`
  position: absolute;
  --calculated-color: var(
    --border-color,
    ${({ theme, color }) => theme.colors[color ?? 'black']}
  );
  width: ${(props) => props.notchSize}rem;
  height: ${(props) => props.notchSize}rem;
  background-color: var(--calculated-color);
  border: solid 1px var(--calculated-color);
  ${({ notchPosition }) => {
    switch (notchPosition) {
      case 'top-left':
        return css`
          top: 0;
          left: 0;
        `
      case 'top-right':
        return css`
          top: 0;
          right: 0;
        `
      case 'bottom-left':
        return css`
          bottom: 0;
          left: 0;
        `
      case 'bottom-right':
        return css`
          bottom: 0;
          right: 0;
        `
      default:
        return css`
          top: 0;
          left: 0;
        `
    }
  }}
`
