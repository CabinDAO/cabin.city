import styled from 'styled-components'
import { ModalContainer } from './modals/ModalContainer'
import { ModalTitle } from './modals/ModalTitle'
import { Body2, H4 } from './Typography'
import { Button } from './Button'
import { useModal } from '@/components/hooks/useModal'

interface ChangeEmailConfirmationModalProps {
  onConfirm: () => void
}

export const ChangeEmailConfirmationModal = ({
  onConfirm,
}: ChangeEmailConfirmationModalProps) => {
  const { hideModal } = useModal()

  const handleConfirm = () => {
    onConfirm()
    hideModal()
  }

  return (
    <ChangeEmailConfirmationModalContainer>
      <ModalTitle text="Change Email" />
      <DeleteModalContent>
        <QuestionContainer>
          <Question>
            <H4>Are you sure you want to change your email?</H4>
          </Question>
          <Body2>
            Confirming this action will unlink your current email and prompt you
            to enter a new one.
          </Body2>
        </QuestionContainer>
        <Actions>
          <ActionButton isActive variant="tertiary" onClick={hideModal}>
            Cancel
          </ActionButton>
          <DeleteButton onClick={handleConfirm} variant="primary">
            Confirm
          </DeleteButton>
        </Actions>
      </DeleteModalContent>
    </ChangeEmailConfirmationModalContainer>
  )
}

const ChangeEmailConfirmationModalContainer = styled(ModalContainer)`
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
