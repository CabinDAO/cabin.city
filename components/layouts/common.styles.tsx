import styled, { css } from 'styled-components'

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 4.8rem;
  height: 100%;
`

export const FixedWidthMainContent = styled(MainContent)`
  width: 60vw;
`

export const NavbarContainer = styled.div`
  position: fixed;
  top: 4rem;
  left: 4rem;
`

// Applies a square notch to the top left corner of the element
export const notch = (size = 1.6) => css`
  clip-path: polygon(
    0% ${size}rem,
    ${size}rem ${size}rem,
    ${size}rem 0%,
    100% 0%,
    100% 100%,
    0% 100%
  );
`
