import { useModal } from '@/components/hooks/useModal'
import { ReactNode } from 'react'
import styled from 'styled-components'
import IconButton from '../IconButton'
import {
  modalContentHorizontalPadding,
  modalContentVerticalPadding,
} from '../modals/modal.styles'
import { H2 } from '../Typography'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${modalContentVerticalPadding} ${modalContentHorizontalPadding};
  border-bottom: 1px solid ${(props) => props.theme.colors.green900};
`

interface ModalTitleProps {
  text: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

export const ModalTitle = (props: ModalTitleProps) => {
  const { text, startAdornment, endAdornment } = props
  const theStartAdornment =
    typeof startAdornment !== 'undefined' ? startAdornment : <ModalTitleClose />

  return (
    <Container>
      <div>{theStartAdornment}</div>
      <H2>{text}</H2>
      <div>{endAdornment}</div>
    </Container>
  )
}

const ModalTitleClose = () => {
  const { hideModal } = useModal()
  return (
    <IconButton onClick={hideModal} size={2} color="green900" icon="close" />
  )
}
