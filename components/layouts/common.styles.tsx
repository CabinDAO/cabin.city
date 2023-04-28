import styled, { css } from 'styled-components'

export type NotchPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'all'

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  height: 100%;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 84rem;
    align-self: flex-start;
  }

  ${({ theme }) => theme.bp.lg} {
    align-self: center;
  }
`

export const FixedWidthMainContent = styled(MainContent)`
  width: 100%;

  ${({ theme }) => theme.bp.lg} {
    width: 84rem;
  }
`

export const NavbarContainer = styled.div`
  ${({ theme }) => theme.bp.md} {
    display: flex;
  }

  ${({ theme }) => theme.bp.lg} {
    position: fixed;
    top: 4rem;
    left: 4rem;
  }
`

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
