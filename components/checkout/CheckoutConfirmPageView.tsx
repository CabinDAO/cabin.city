import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import { CartFragment, CartResponse, PaymentStatus } from '@/utils/types/cart'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { Body1, Body2, H2 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { ContentCard } from '@/components/core/ContentCard'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { Button } from '@/components/core/Button'
import PostInviteFlow from '@/components/checkout/PostInviteFlow'

const CheckoutConfirmPageView = () => {
  const router = useRouter()
  const { useGet } = useBackend()

  const cartId = router.query.externId
  const { data, mutate: refetchCart } = useGet<CartResponse>(
    cartId ? ['CART', { externId: cartId as string }] : null
  )

  const cart = !data || 'error' in data ? null : data

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null
    const shouldPoll = !cart || cart.paymentStatus != PaymentStatus.Paid
    if (!timer && shouldPoll) {
      timer = setInterval(() => {
        refetchCart()
      }, 3 * 1000)
    }
    if (timer && !shouldPoll) {
      clearInterval(timer)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [cart])

  const [firstTime, setFirstTime] = useState(false)

  // remove stripe query params from url so it looks nicer
  useEffect(() => {
    const { pathname, query } = router
    if (!pathname) return

    let replaced = false

    if (router.query.payment_intent) {
      delete router.query.payment_intent
      replaced = true
    }
    if (router.query.payment_intent_client_secret) {
      delete router.query.payment_intent_client_secret
      replaced = true
    }
    if (router.query.redirect_status) {
      delete router.query.redirect_status
      replaced = true
    }

    if (replaced) {
      router
        .replace({ pathname, query }, undefined, {
          shallow: true,
        })
        .then()
      setFirstTime(true)
    }
  }, [router])

  const isPaid = cart?.paymentStatus == PaymentStatus.Paid
  const isError = cart?.paymentStatus == PaymentStatus.Error

  if (!cart) {
    return null
  }

  return (
    <SingleColumnLayout withFooter>
      <TitleCard icon="citizen" title="Checkout" />
      <Outline shape="notch" notchSize={1.6}>
        {isPaid ? (
          <Paid showFirstTimeSection={firstTime} cart={cart} />
        ) : isError ? (
          <Error cart={cart} />
        ) : (
          <Waiting />
        )}
      </Outline>
    </SingleColumnLayout>
  )
}

export default CheckoutConfirmPageView

const Paid = ({
  showFirstTimeSection,
  cart,
}: {
  showFirstTimeSection: boolean
  cart: CartFragment
}) => {
  return (
    <Content>
      <StyledIcon name={'citizen'} size={9.6} color={'green800'} />
      <StyledH2>Paid</StyledH2>
      <PostInviteFlow cart={cart} />
    </Content>
  )
}

const Waiting = () => {
  return (
    <Content>
      <StyledIcon name={'lock'} size={9.6} color={'yellow600'} />
      <H2>Processing your payment...</H2>
      <Body2>This should only take a moment.</Body2>
      <LoadingSpinner></LoadingSpinner>
    </Content>
  )
}

const Error = ({ cart }: { cart: CartFragment }) => {
  return (
    <Content>
      <ErrorIcon name={'exclamation-mark'} size={9.6} color={'red600'} />
      <H2>Error processing payment</H2>
      <Body2>Please check your card details and try again.</Body2>
      <Link href={`/checkout/${cart.externId}`}>
        <Button className={'error-button'}>Back to payment selection</Button>
      </Link>
    </Content>
  )
}

const Outline = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  ${padding('md', 'sm')};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 100%;

  .error-button {
    margin-top: 2.4rem;
  }

  ${LoadingSpinner} {
    margin-top: 3.2rem;
  }
`

const StyledIcon = styled(Icon)`
  padding: 2.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  margin-bottom: 3.2rem;
`

const ErrorIcon = styled(StyledIcon)`
  background-color: ${({ theme }) => theme.colors.red300};
`

const StyledH2 = styled(H2)`
  text-align: center;
  margin-bottom: 3.2rem;
`

const StyledBody = styled(Body1)`
  text-align: center;
  margin-bottom: 3.2rem;
`
