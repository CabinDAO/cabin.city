import { useModal } from '@/components/hooks/useModal'
import { useRouter, Route } from '@/components/hooks/useRouter'
import styled from 'styled-components'
import { ModalContainer } from './modals/ModalContainer'
import { ModalTitle } from './modals/ModalTitle'
import { Body2, H4 } from './Typography'
import { Button } from './Button'

export const DiscardChangesModal = ({ leaveRoute }: { leaveRoute: Route }) => {
  const { hideModal } = useModal()
  const router = useRouter()

  const handleLeave = () => {
    router.push(leaveRoute)
    hideModal()
  }

  return (
    <DiscardChangesModalContainer>
      <ModalTitle text="Unsaved Changes" />
      <DeleteModalContent>
        <QuestionContainer>
          <Question>
            <H4>Are you sure you want to go?</H4>
          </Question>
          <Body2>
            Leaving this page will discard any changes you’ve made. Do you want
            to continue?
          </Body2>
        </QuestionContainer>
        <Actions>
          <ActionButton isActive variant="tertiary" onClick={hideModal}>
            Stay
          </ActionButton>
          <DeleteButton onClick={handleLeave} variant="primary">
            Leave
          </DeleteButton>
        </Actions>
      </DeleteModalContent>
    </DiscardChangesModalContainer>
  )
}

const DiscardChangesModalContainer = styled(ModalContainer)`
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
