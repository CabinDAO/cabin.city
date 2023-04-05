import styled from 'styled-components'

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  width: 95vw;

  ${({ theme }) => theme.bp.md} {
    height: 52.4rem;
    width: 44rem;
  }

  ${({ theme }) => theme.bp.lg} {
    height: 52.4rem;
    width: 44rem;
  }
`
