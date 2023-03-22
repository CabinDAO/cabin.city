import styled from 'styled-components'

export const ProfileInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100vw;
  padding: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    gap: 4.8rem;
    min-width: 60vw;
    width: 100%;
    padding: 0;
  }
`
