import styled from 'styled-components'
import { Body1 } from '@/components/core/Typography'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalContent } from '@/components/core/modals/ModalContent'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import Icon from '@/components/core/Icon'

export const WalletModal = () => {
  return (
    <WalletModalContainer>
      <ModalTitle text="Connect wallet" />
      <ModalContent>
        <Container>
          <IconContainer>
            <Icon name="wallet" size={4.8} />
          </IconContainer>
          <Message>
            Sign a message with your wallet to prove your ownership of this
            wallet.
          </Message>
        </Container>
      </ModalContent>
    </WalletModalContainer>
  )
}

const WalletModalContainer = styled(ModalContainer)`
  height: auto;
`

const IconContainer = styled.div`
  padding: 2.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 4rem;
`

const Message = styled(Body1)`
  text-align: center;
`
