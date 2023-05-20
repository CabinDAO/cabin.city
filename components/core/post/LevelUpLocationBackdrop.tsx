import styled from 'styled-components'

export const LevelUpLocationBackdrop = styled.div`
  padding: 2.4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  background: url('/images/confetti.svg') no-repeat;
  background-size: cover;
  padding: 2.4rem 1.6rem;
  height: 100%;

  ${({ theme }) => theme.bp.md} {
    height: 49rem;
    padding: 0 2.4rem;
  }
`
