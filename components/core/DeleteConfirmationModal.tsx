import styled from 'styled-components'
import { ModalContainer } from './modals/ModalContainer'
import { ModalTitle } from './modals/ModalTitle'
import { Body2, H4 } from './Typography'
import { Button } from './Button'
import { useModal } from '@/components/hooks/useModal'

interface DeleteConfirmationModalProps {
  onDelete: VoidFunction
  entityName: string
}

export const DeleteConfirmationModal = ({
  entityName,
  onDelete,
}: DeleteConfirmationModalProps) => {
  const { hideModal } = useModal()

  const handleDelete = () => {
    onDelete()
    hideModal()
  }

  return (
    <DeleteConfirmationModalContainer>
      <ModalTitle text={`Delete ${entityName}`} />
      <DeleteModalContent>
        <QuestionContainer>
          <Question>
            <H4>Are you sure you want to delete</H4>
            <H4>{`this ${entityName}?`}</H4>
          </Question>
          <Body2>This action cannot be undone.</Body2>
        </QuestionContainer>
        <Actions>
          <ActionButton isActive variant="tertiary" onClick={hideModal}>
            Cancel
          </ActionButton>
          <DeleteButton variant="primary" onClick={handleDelete}>
            Delete
          </DeleteButton>
        </Actions>
      </DeleteModalContent>
    </DeleteConfirmationModalContainer>
  )
}

const DeleteConfirmationModalContainer = styled(ModalContainer)`
  height: min-content;
`

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.8rem;
`

const Question = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`

const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  padding-bottom: 3.2rem;
  gap: 3.2rem;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`

const ActionButton = styled(Button)`
  width: 100%;
`

const DeleteButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.red600};
  color: ${({ theme }) => theme.colors.yellow100};
`
