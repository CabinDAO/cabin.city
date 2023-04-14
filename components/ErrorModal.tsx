import styled from 'styled-components'
import { useModal } from '@/components/hooks/useModal'
import { ModalTitle } from './core/modals/ModalTitle'
import { H4 } from './core/Typography'
import { Button } from './core/Button'
import { ModalContainer } from './core/modals/ModalContainer'

interface ErrorModalProps {
  title: string
  description: string
}

export const ErrorModal = ({ title, description }: ErrorModalProps) => {
  const { hideModal } = useModal()

  return (
    <ErrorModalContainer>
      <ModalTitle text={title} />
      <DeleteModalContent>
        <H4>{description}</H4>
        <Button variant="primary" onClick={hideModal}>
          OK
        </Button>
      </DeleteModalContent>
    </ErrorModalContainer>
  )
}

const ErrorModalContainer = styled(ModalContainer)`
  height: min-content;
`

const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  padding-bottom: 3.2rem;
  gap: 3.2rem;
  text-align: center;
`
