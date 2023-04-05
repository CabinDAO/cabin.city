import styled from 'styled-components'

export const ProfileInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    gap: 4.8rem;
    width: 100%;
    padding: 0;
  }
`
