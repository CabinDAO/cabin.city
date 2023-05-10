import { useEffect, useState } from 'react'
import Router from 'next/router'
import { disconnect } from '@wagmi/core'
import { ConnectKitButton } from 'connectkit'
import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import { Body1, H1, H3 } from '../core/Typography'
import { Button } from '../core/Button'
import { Circle } from '../core/Circle'
import Icon from '../core/Icon'
import { LoginLogic, LoginStatus } from './LoginLogic'

export const Login = () => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Disconnect before displaying login to prevent message signing request before the user does anything
    disconnect().then(() => {
      setInitialized(true)
    })
  }, [])

  if (!initialized) {
    return null
  }

  return (
    <LoginContainer>
      <ContentCard shadow shape="notch">
        <LoginContentContainer>
          <Circle
            size={6.4}
            shadowMode="always"
            source="/images/welcome-logo.png"
          />
          <H1>Welcome to Cabin</H1>
          <Body1>Discover, build & explore within the Cabin network</Body1>
          <ConnectKitButton.Custom>
            {(buttonRendererProps) => (
              <LoginLogic
                {...buttonRendererProps}
                onLogin={() => Router.push('/dashboard')}
              >
                {({ loginState, startAuthentication }) => (
                  <>
                    <Button onClick={startAuthentication}>
                      Sign in with Ethereum
                    </Button>
                    {loginState.status === LoginStatus.AWAITING_SIGNATURE ? (
                      <Body1>Sign a message in your wallet to continue</Body1>
                    ) : null}
                    {loginState.status === LoginStatus.FORWARDING ? (
                      <Body1>Hold tight, we’re logging you in!</Body1>
                    ) : null}
                    {buttonRendererProps.unsupported ? (
                      <Body1 $color="red600">
                        Unsupported chain. Please switch to Optimism.
                      </Body1>
                    ) : null}
                    {loginState.status === LoginStatus.ERROR ? (
                      <Body1 $color="red600">
                        An error occurred. Please try again.
                      </Body1>
                    ) : null}
                  </>
                )}
              </LoginLogic>
            )}
          </ConnectKitButton.Custom>
          <CabinCityLink href="https://cabin.city">
            <Icon name="back-arrow" size={1.6} />
            <H3>Back to cabin.city</H3>
          </CabinCityLink>
        </LoginContentContainer>
      </ContentCard>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  margin: 3.2rem;
`

const LoginContentContainer = styled.div`
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2.4rem;
`

const CabinCityLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`
