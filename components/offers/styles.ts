import styled, { css } from 'styled-components'

export const experienceListStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: column;
  grid-gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr;
  }
`

export const ExperienceListContainer = styled.div<{ withScroll?: boolean }>`
  display: grid;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  background-color: ${({ theme }) => theme.colors.yellow200};
  padding: 2.4rem;

  ${({ withScroll }) => {
    if (withScroll) {
      return css`
        .infinite-scroll-component {
          ${experienceListStyles}
        }
      `
    } else {
      return css`
        ${experienceListStyles}
      `
    }
  }}
`
