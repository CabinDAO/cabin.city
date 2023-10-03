import { useRouter } from 'next/router'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { CartFragment, PaymentStatus } from '@/generated/graphql'
import { useProfile } from '@/components/auth/useProfile'
import { Body1, Body2, H2, H3 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { ContentCard } from '@/components/core/ContentCard'
import { useGetCartForUser } from '@/components/checkout/useGetCartForUser'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { Button } from '@/components/core/Button'
import Link from 'next/link'
import { ResponsiveDivider } from '@/components/core/Divider'
import { useEffect } from 'react'

const CheckoutConfirmPageView = () => {
  const router = useRouter()
  const { user } = useProfile()

  const { cartId } = router.query
  const { cart, startPolling, stopPolling } = useGetCartForUser(
    cartId as string,
    user?._id
  )

  // remove stripe query params from url so it looks nicer
  // useEffect(() => {
  //   const { pathname, query } = router
  //   delete router.query.payment_intent
  //   delete router.query.payment_intent_client_secret
  //   delete router.query.redirect_status
  //   router
  //     .replace({ pathname, query }, undefined, {
  //       shallow: true,
  //     })
  //     .then()
  // }, [router])

  const isPaid = cart?.paymentStatus == PaymentStatus.Paid
  const isError = cart?.paymentStatus == PaymentStatus.Error

  if (!cart || !isPaid) {
    startPolling(1000)
  } else {
    stopPolling()
  }

  if (!user || !cart) {
    return null
  }

  const justConfirmed = false // their first time on this page, so show the top part

  return (
    <SingleColumnLayout>
      <TitleCard icon="backpack" title="Reservation" />
      <Outline shape="notch" notchSize={1.6}>
        {isPaid ? (
          <Paid showTopSection={justConfirmed} />
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

const Paid = ({ showTopSection }: { showTopSection: boolean }) => {
  return (
    <Content>
      {showTopSection && (
        <>
          <H2>Thank you for booking through Cabin</H2>
          <Body2>
            We’ll be in touch with more details as we get closer to arrival.
          </Body2>
          <ResponsiveDivider />
        </>
      )}
      <ReservationDetails>
        <LeftSide>Details</LeftSide>
        <RightSide>Cabin Week</RightSide>
      </ReservationDetails>
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
      <Link href={`/checkout/${cart._id}`}>
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
const ReservationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  ${padding('md', 'sm')};

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  ${padding('md', 'sm')};
`

const RightSide = styled.div`
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  ${padding('xs', 'xs')};

  ${({ theme }) => theme.bp.md} {
    width: 30rem;
  }
`
