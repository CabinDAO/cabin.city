import React from 'react'
import { useModal } from '@/components/hooks/useModal'
import styled from 'styled-components'
import { Body2, H4 } from './Typography'
import { Button } from './Button'
import { ModalContainer } from './modals/ModalContainer'
import { ModalTitle } from './modals/ModalTitle'

export const ActionConfirmationModal = ({
  onConfirm,
  text,
  title,
  helpText,
  confirmText,
}: {
  onConfirm: VoidFunction
  text: string
  title?: string
  helpText?: string
  confirmText?: string
}) => {
  const { hideModal } = useModal()

  const handleConfirm = () => {
    onConfirm()
    hideModal()
  }

  return (
    <DeleteConfirmationModalContainer>
      <ModalTitle text={title || 'Confirm Action'} />
      <DeleteModalContent>
        <QuestionContainer>
          <Question>
            <H4>{text}</H4>
          </Question>
          <Body2>{helpText || 'This action cannot be undone.'}</Body2>
        </QuestionContainer>
        <Actions>
          <ActionButton isActive variant="tertiary" onClick={hideModal}>
            Cancel
          </ActionButton>
          <ConfirmButton variant="primary" onClick={handleConfirm}>
            {confirmText || 'Confirm'}
          </ConfirmButton>
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
  padding: 4rem 4rem 3.2rem;
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

const ConfirmButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.red600};
  color: ${({ theme }) => theme.colors.yellow100};
`
