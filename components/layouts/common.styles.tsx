import styled, { css } from 'styled-components'

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 4.8rem;
  height: 100%;
  width: 84rem;
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
// 400% is used to ensure the parent element has some space to overflow - the extra space does not affect the elements around it
export const notch = (size = 1.6) => css`
  clip-path: polygon(
    0% ${size}rem,
    ${size}rem ${size}rem,
    ${size}rem 0%,
    400% 0%,
    400% 400%,
    0% 400%
  );
`
