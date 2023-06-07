import { Body2, H2 } from '../core/Typography'
import { ModalContainer } from '../core/modals/ModalContainer'
import { ModalContent } from '../core/modals/ModalContent'
import { ConnectKitButton } from 'connectkit'
import { LoginLogic, LoginStatus } from './LoginLogic'
import { Button } from '../core/Button'
import styled from 'styled-components'
import { ModalTitle } from '../core/modals/ModalTitle'
import Icon from '../core/Icon'
import { Message } from './Message'

interface LoginModalProps {
  onLogin?: () => void
}

export const LoginModal = (props: LoginModalProps) => {
  const { onLogin } = props
  return (
    <ConnectKitButton.Custom>
      {(buttonRendererProps) => {
        return (
          <StyledModalContainer>
            <ModalTitle text="" />
            <ModalContent>
              <Container>
                <CabinCircle>
                  <Icon name="logo-cabin" size={2.56} color="green400" />
                </CabinCircle>
                <Heading>Log in or Sign up</Heading>
                <Body2>by connecting your Ethereum wallet</Body2>

                <LoginLogic {...buttonRendererProps} onLogin={onLogin}>
                  {({ loginState, startAuthentication }) => (
                    <>
                      <ConnectButton onClick={startAuthentication}>
                        Connect wallet
                      </ConnectButton>
                      {loginState.status === LoginStatus.AWAITING_SIGNATURE ? (
                        <Message>
                          Sign a message in your wallet to continue
                        </Message>
                      ) : null}
                      {loginState.status === LoginStatus.FORWARDING ? (
                        <Message>Hold tight, we’re logging you in!</Message>
                      ) : null}
                      {buttonRendererProps.unsupported ? (
                        <Message error>
                          Unsupported chain. Please switch to Optimism.
                        </Message>
                      ) : null}
                      {loginState.status === LoginStatus.ERROR ? (
                        <Message error>
                          An error occurred. Please try again.
                        </Message>
                      ) : null}
                    </>
                  )}
                </LoginLogic>
              </Container>
            </ModalContent>
          </StyledModalContainer>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

const StyledModalContainer = styled(ModalContainer)`
  height: min-content;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0 4rem 0;
`

const Heading = styled(H2)`
  margin: 0.8rem 0;
`

const ConnectButton = styled(Button)`
  margin-top: 3.2rem;
  margin-bottom: 2.4rem;
`

export interface MessageProps {
  children: React.ReactNode
  error?: boolean
}
const CabinCircle = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.green900};
  display: flex;
  align-items: center;
  justify-content: center;
`
