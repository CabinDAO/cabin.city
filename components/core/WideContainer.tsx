import styled from 'styled-components'

// a container that's as wide as the screen minus the nav
export const WideContainer = styled.div<{ maxWidth?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: calc(100vw - 30rem);
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}}
  }
`
