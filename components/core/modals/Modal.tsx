import { useEffect } from 'react'
import styled, { css } from 'styled-components'
import ClickAway from '../ClickAway'

const Wrapper = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.2);

  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      visibility: visible;
    `};
`

const Content = styled.div`
  backdrop-filter: blur(0.4rem);
  background-color: ${(props) => props.theme.colors.yellow100};
  border-width: 1px 4px 4px 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.green900};
`

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
  hideOnClickAway?: boolean
  active: boolean
}

const Modal = ({
  children,
  active,
  onClose,
  hideOnClickAway,
  ...props
}: ModalProps) => {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  })

  return (
    <Wrapper active={active}>
      <ClickAway onClickAway={hideOnClickAway && active ? onClose : null}>
        <Content {...props}>{children}</Content>
      </ClickAway>
    </Wrapper>
  )
}

export default Modal
