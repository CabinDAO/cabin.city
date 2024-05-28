import styled, { css } from 'styled-components'
import { ColorName } from '@/styles/theme'

export type NotchPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'all'

// Applies a square notch to the top left corner of the element
// 400% is used to ensure the parent element has some space to overflow - the extra space does not affect the elements around it
export const notch = (size = 1.6, position: NotchPosition = 'top-left') => {
  switch (position) {
    case 'top-left':
      return css`
        clip-path: polygon(
          0% ${size}rem,
          ${size}rem ${size}rem,
          ${size}rem 0%,
          400% 0%,
          400% 400%,
          0% 400%
        );
      `
    case 'top-right':
      return css`
        clip-path: polygon(
          100% ${size}rem,
          calc(100% - ${size}rem) ${size}rem,
          calc(100% - ${size}rem) 0%,
          0% 0%,
          0% 400%,
          100% 400%
        );
      `
    case 'bottom-left':
      return css`
        clip-path: polygon(
          0% calc(100% - ${size}rem),
          ${size}rem calc(100% - ${size}rem),
          ${size}rem 100%,
          400% 100%,
          400% 0%,
          0% 0%
        );
      `
    case 'bottom-right':
      return css`
        clip-path: polygon(
          100% calc(100% - ${size}rem),
          calc(100% - ${size}rem) calc(100% - ${size}rem),
          calc(100% - ${size}rem) 100%,
          0% 100%,
          0% 0%,
          100% 0%
        );
      `
    case 'all':
      return css`
        clip-path: polygon(
          ${size}rem 0,
          ${size}rem ${size}rem,
          0 ${size}rem,
          0 calc(100% - ${size}rem),
          ${size}rem calc(100% - ${size}rem),
          ${size}rem 100%,
          calc(100% - ${size}rem) 100%,
          calc(100% - ${size}rem) calc(100% - ${size}rem),
          100% calc(100% - ${size}rem),
          100% ${size}rem,
          calc(100% - ${size}rem) ${size}rem,
          calc(100% - ${size}rem) 0
        );
      `
    default:
      return ''
  }
}

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
