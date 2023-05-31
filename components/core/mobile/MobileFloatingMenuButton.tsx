import { notch } from '@/components/layouts/common.styles'
import styled from 'styled-components'
import Icon from '../Icon'

interface Props {
  onClick: () => void
  open: boolean
}

export const MobileFloatingMenuButton = ({ open, onClick }: Props) => {
  if (open) {
    return null
  }

  return (
    <Container onClick={onClick}>
      <Icon name={open ? 'close' : 'menu'} size={2.4} color={'green400'} />
      <Notch notchSize={1} />
    </Container>
  )
}
const Container = styled.nav`
  position: fixed;
  z-index: 100;
  cursor: pointer;
  padding: 1.6rem;
  bottom: 9.3rem;
  left: 2.4rem;
  background-color: ${({ theme }) => theme.colors.green800};
  justify-content: center;
  align-items: center;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  border-bottom-right-radius: 2.5rem;
  box-shadow: 0.8rem 0.8rem 0rem ${({ theme }) => theme.colors.yellow900};
  ${notch(1)}
`

const Notch = styled.div<{ notchSize: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.notchSize}rem};
  height: ${(props) => props.notchSize}rem};
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
`
