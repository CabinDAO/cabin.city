import { CartFragment } from '@/utils/types/cart'
import { Button } from '@/components/core/Button'
import styled from 'styled-components'
import { Body1 } from '@/components/core/Typography'
import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const PostInviteFlow = ({ cart }: { cart: CartFragment }) => {
  const { login, authenticated } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      // todo: maybe send them to their profile? prompt them to add a photo?
      router.push('/dashboard').then()
    }
  }, [authenticated])

  return (
    <>
      <StyledBody>Thanks for buying a Cabin citizenship.</StyledBody>
      <StyledBody>Finish setting up your account to activate it.</StyledBody>
      <StyledBody>- processing payment</StyledBody>
      <StyledBody>- creating account</StyledBody>
      <StyledBody>- granting citizenship onchain</StyledBody>
      <StyledBody>- waiting for citizenship to confirm onchain</StyledBody>
      <StyledBody>DONE</StyledBody>
      <StyledBody>
        now click here to log in and start using your new account
      </StyledBody>
      <Button onClick={login}>Login</Button>
    </>
  )
}

export default PostInviteFlow

const StyledBody = styled(Body1)`
  text-align: center;
  margin-bottom: 3.2rem;
`
