import { usePrivy } from '@privy-io/react-auth'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Button } from '@/components/core/Button'
import { Body1 } from '@/components/core/Typography'

export default function Page() {
  const { user, login } = usePrivy()

  if (user) {
    console.log('user', user)
  }

  return (
    <BaseLayout>
      <StyledContentCard>
        {user ? (
          <Body1>
            Log out first before logging in with an external wallet.
          </Body1>
        ) : (
          <Button
            onClick={() =>
              login({ loginMethods: ['wallet'], disableSignup: true })
            }
          >
            Login with Wallet
          </Button>
        )}
      </StyledContentCard>
    </BaseLayout>
  )
}

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  padding: 1.6rem;
`
