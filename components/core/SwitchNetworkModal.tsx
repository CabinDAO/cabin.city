import styled from 'styled-components'
import { ModalContainer } from './modals/ModalContainer'
import { ModalTitle } from './modals/ModalTitle'
import { Body2, H4 } from './Typography'
import { Button } from './Button'
import { appChain } from '@/lib/wagmi/wagmi-client'

interface SwitchNetworkModalProps {
  onSwitch?: () => void
  onLeave?: () => void
}

export const SwitchNetworkModal = ({
  onSwitch,
  onLeave,
}: SwitchNetworkModalProps) => {
  return (
    <SwitchNetworkModalContainer>
      <ModalTitle text="Switch Network" />
      <DeleteModalContent>
        <QuestionContainer>
          <Question>
            <H4>Do you agree to switch the network?</H4>
          </Question>
          <Body2>
            Minting your Citizenship NFT requires you to switch to the{' '}
            {appChain.name} network.
          </Body2>
        </QuestionContainer>
        <Actions>
          <ActionButton variant="secondary" onClick={onLeave}>
            Back
          </ActionButton>
          <ActionButton variant="primary" onClick={onSwitch}>
            Switch Network
          </ActionButton>
        </Actions>
      </DeleteModalContent>
    </SwitchNetworkModalContainer>
  )
}

const SwitchNetworkModalContainer = styled(ModalContainer)`
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
