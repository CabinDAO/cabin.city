import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  width: 95vw;

  ${({ theme }) => theme.bp.md} {
    height: 52.4rem;
    width: 44rem;
  }
`
