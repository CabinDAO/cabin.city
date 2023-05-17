import { useModal } from '@/components/hooks/useModal'
import { ReactNode } from 'react'
import styled from 'styled-components'
import IconButton from '../IconButton'
import { H3 } from '../Typography'

interface ModalTitleProps {
  text: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

export const ModalTitle = (props: ModalTitleProps) => {
  const { hideModal } = useModal()
  const { text, startAdornment, endAdornment } = props
  const theStartAdornment =
    typeof startAdornment !== 'undefined' ? (
      <AdornmentContainer position="start">{startAdornment}</AdornmentContainer>
    ) : (
      <AdornmentContainer onClick={hideModal} position="start">
        <IconButton
          animated
          onClick={hideModal}
          size={2}
          color="green900"
          icon="close"
        />
      </AdornmentContainer>
    )

  return (
    <Container>
      <AdornmentContainer position="start">
        {theStartAdornment}
      </AdornmentContainer>
      <StyledH3>{text}</StyledH3>
      {endAdornment && (
        <AdornmentContainer position="end">{endAdornment}</AdornmentContainer>
      )}
    </Container>
  )
}

interface AdornmentContainerProps {
  position: 'start' | 'end'
}

const AdornmentContainer = styled.div<AdornmentContainerProps>`
  position: absolute;
  cursor: pointer;
  ${(props) => (props.position === 'start' ? 'left' : 'right')}: 0;
  top: 0;
  display: flex;
  background-color: ${(props) => props.theme.colors.yellow200};
  padding: 1.9rem;
  align-items: center;
  justify-content: center;
`

const StyledH3 = styled(H3)`
  display: flex;
  align-items: center;
  text-transform: none;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.green900};
  min-height: 6rem;
  width: 100%;
`
