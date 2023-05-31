import styled from 'styled-components'
import Icon from '../Icon'
import { Body2 } from '../Typography'
import { useState } from 'react'

export const ErrorToast = ({
  visible,
  message,
}: {
  message: string
  visible: boolean
}) => {
  const [displayMessage, setDisplayMessage] = useState<boolean>(true)

  const handleClose = () => {
    setDisplayMessage(false)
  }

  return (
    <Container visible={visible && displayMessage}>
      <Icon name="alert" color="red600" size={1.4} />
      <TextContainer>
        <Body2 $color="red600">{message}</Body2>
      </TextContainer>
      <Close onClick={handleClose}>
        <Icon name="close" color="red600" size={1.4} />
      </Close>
    </Container>
  )
}

interface ToastProps {
  visible: boolean
}

const Container = styled.div<ToastProps>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? 'translateX(-50%)' : 'translateX(-50%) translateY(2rem)'};
  transition: opacity 0.5s ease-in-out;
  position: fixed;
  bottom: 8rem;
  padding: 1.3rem;
  gap: 1.3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background: ${({ theme }) => theme.colors.red100};
  border: 1px solid ${({ theme }) => theme.colors.red500};
  box-shadow: 0px 4px 12px rgba(123, 94, 53, 0.23);
  z-index: 10000000;
  cursor: pointer;
`

const Close = styled.div`
  display: flex;
  cursor: pointer;
`

const TextContainer = styled.div`
  display: flex;
  width: 23.2rem;
  text-align: left;

  ${({ theme }) => theme.bp.md} {
    width: 29.5rem;
  }
`
