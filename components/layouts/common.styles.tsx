import styled, { css } from 'styled-components'

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
    gap: 4.8rem;
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
