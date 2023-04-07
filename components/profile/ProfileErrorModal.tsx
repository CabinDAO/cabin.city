import styled from 'styled-components'
import { useModal } from '@/components/hooks/useModal'
import { ModalTitle } from '../core/modals/ModalTitle'
import { H4 } from '../core/Typography'
import { Button } from '../core/Button'
import { ModalContainer } from '../core/modals/ModalContainer'

interface ProfileErrorModalProps {
  error: string
}

export const ProfileErrorModal = ({ error }: ProfileErrorModalProps) => {
  const { hideModal } = useModal()

  return (
    <ProfileErrorModalContainer>
      <ModalTitle text="Profile Submission Error" />
      <DeleteModalContent>
        <H4>{error}</H4>
        <Button variant="primary" onClick={hideModal}>
          OK
        </Button>
      </DeleteModalContent>
    </ProfileErrorModalContainer>
  )
}

const ProfileErrorModalContainer = styled(ModalContainer)`
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
