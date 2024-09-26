import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import { useUser } from '@/components/auth/useUser'
import { useRouter } from '@/components/hooks/useRouter'
import { ReactNode, useEffect, useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import { CartFragment, CartResponse, PaymentStatus } from '@/utils/types/cart'
import styled, { css } from 'styled-components'
import { padding } from '@/styles/theme'
import { Body1, H2 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { ContentCard } from '@/components/core/ContentCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Button } from '@/components/core/Button'
import { ContactUsLink } from '@/components/core/ContactUsLink'
import { AutoImage } from '@/components/core/AutoImage'

const CheckoutConfirmPageView = () => {
  const router = useRouter()
  const { useGet } = useBackend()

  const [firstTime, setFirstTime] = useState(false)
  const cartId = router.query.externId
  const { data, mutate: refetchCart } = useGet<CartResponse>(
    cartId ? ['api_cart_externId', { externId: cartId as string }] : null
  )

  const cart = !data || 'error' in data ? null : data
  const processingStep =
    !cart || !cart.accountSetupStatus
      ? 0
      : cart.paymentStatus != PaymentStatus.Paid
      ? 1
      : !cart.accountSetupStatus.privyAccountExists
      ? 2
      : !cart.accountSetupStatus.localProfileExists
      ? 3
      : !cart.accountSetupStatus.grantTxSent
      ? 4
      : !cart.accountSetupStatus.grantTxConfirmed
      ? 5
      : 6
  const finishedProcessingPayment = processingStep == 6

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null
    const shouldPoll =
      !finishedProcessingPayment && !cart?.accountSetupStatus?.error
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
  }, [finishedProcessingPayment, refetchCart, cart?.accountSetupStatus?.error])

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

  if (!cart) {
    return null
  }

  return (
    <BaseLayout>
      <TitleCard icon="citizen" title="Checkout" />
      <Outline shape="notch" notchSize={1.6}>
        <Progress
          cart={cart}
          processingStep={processingStep}
          firstTime={firstTime}
        />
      </Outline>
    </BaseLayout>
  )
}

export default CheckoutConfirmPageView

const Progress = ({
  cart,
  processingStep,
  firstTime,
}: {
  cart: CartFragment
  processingStep: number
  firstTime: boolean
}) => {
  const { login } = usePrivy()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (
      processingStep == 6 &&
      firstTime &&
      user &&
      user.externId == cart.accountSetupStatus?.profileExternId
    ) {
      router.push(['profile_id', { id: user.externId }]).then()
    }
  }, [
    router,
    user,
    firstTime,
    ,
    processingStep,
    cart.accountSetupStatus?.profileExternId,
  ])

  const error =
    cart.accountSetupStatus?.error ||
    (cart.paymentStatus == PaymentStatus.Error
      ? 'Error processing payment. Please check your card details and try again.'
      : null)

  return (
    <Content>
      {error ? (
        <ErrorIcon name={'exclamation-mark'} size={9.6} color={'red600'} />
      ) : processingStep == 6 ? (
        <StyledIcon name={'citizen'} size={9.6} color={'green800'} />
      ) : (
        <StyledIcon name={'lock'} size={9.6} color={'yellow600'} />
      )}
      <Steps>
        <H2>Activating Citizenship</H2>
        <Body1>This could take up to 60 seconds...</Body1>
        <Step
          cart={cart}
          step={1}
          processingStep={processingStep}
          error={error}
        >
          Processing payment
        </Step>
        {!cart.accountSetupStatus?.existingAccount && (
          <>
            <Step
              cart={cart}
              step={2}
              processingStep={processingStep}
              error={error}
            >
              Creating account
            </Step>
            <Step
              cart={cart}
              step={3}
              processingStep={processingStep}
              error={error}
            >
              Linking account
            </Step>
          </>
        )}
        <Step
          cart={cart}
          step={4}
          processingStep={processingStep}
          error={error}
        >
          Granting citizenship onchain
        </Step>
        <Step
          cart={cart}
          step={5}
          processingStep={processingStep}
          error={error}
        >
          Waiting for onchain confirmation
        </Step>
        {processingStep == 6 && (
          <>
            <Step cart={cart} step={0} processingStep={1}>
              Done!
            </Step>
            {user ? (
              <Link href={'/citizenship'}>
                <Button>Go to your citizenship page</Button>
              </Link>
            ) : (
              <>
                {!cart.accountSetupStatus?.hasWallet && (
                  <>
                    <Body1>
                      Log in with the
                      {cart.accountSetupStatus?.providedEmailDomain &&
                        ' @' +
                          cart.accountSetupStatus.providedEmailDomain +
                          ' '}
                      email you provided by clicking the button below and
                      selecting Email as shown in the image.
                    </Body1>
                    <AutoImage
                      src={'/images/email-login-demo.png'}
                      alt={'email login demo'}
                    />
                  </>
                )}
                <Button onClick={login}>Login to your new account</Button>
              </>
            )}
          </>
        )}
      </Steps>
    </Content>
  )
}

const Step = ({
  cart,
  step,
  processingStep,
  error,
  children,
}: {
  cart: CartFragment
  step: number
  processingStep: number
  error?: string | null
  children: ReactNode
}) => {
  if (error && step > processingStep) {
    return null
  }
  const loading = !error && step == processingStep
  return (
    <>
      <StyledStep>
        {step < processingStep ? (
          <Icon name={'check'} size={1.4} color={'green600'} />
        ) : error && step == processingStep ? (
          <Icon name={'alert'} size={1.4} color={'red600'} />
        ) : (
          <Icon
            name={'right-arrow'}
            size={1.4}
            color={step > processingStep ? 'gray' : 'green800'}
          />
        )}

        <StyledBody variant={getVariant(step, processingStep)}>
          {children}
          {loading && <Ellipsis />}
        </StyledBody>
      </StyledStep>
      {error && step == processingStep && (
        <>
          <Error>
            <Body1>Error: {error}</Body1>
          </Error>
          {step == 1 ? (
            <Link href={`/checkout/${cart.externId}`}>
              <Button>Back to payment selection</Button>
            </Link>
          ) : (
            <StyledBody>
              We're sorry about that!{' '}
              <ContactUsLink
                underline
                subject={'Error during invite process'}
                body={`\r\n\r\n\r\n--------\r\nTo help us fix the problem, include this string: ${cart.externId}`}
              >
                Shoot us an email
              </ContactUsLink>{' '}
              and we will take care of this for you.
            </StyledBody>
          )}
        </>
      )}
    </>
  )
}

const Steps = styled.div`
  display: flex;
  max-width: 27rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2.4rem;
`
const StyledStep = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  gap: 1rem;
`

const Error = styled.div`
  width: 100%;
  // background-color: ${({ theme }) => theme.colors.red100};
  //padding: 1rem 0.6rem;

  ${Body1} {
    color: ${({ theme }) => theme.colors.red600};
  }
`

function getVariant(thisStep: number, processingStep: number) {
  if (thisStep < processingStep) {
    return 'completed'
  }
  if (thisStep == processingStep) {
    return 'current'
  }
  return 'upcoming'
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

const StyledBody = styled(Body1)<{
  variant?: 'upcoming' | 'current' | 'completed'
}>`
  ${({ variant }) => {
    switch (variant) {
      case 'upcoming':
        return css`
          color: ${({ theme }) => theme.colors.gray};
        `
      case 'completed':
        return css`
          color: ${({ theme }) => theme.colors.green600};
          // background-color: ${({ theme }) => theme.colors.yellow200};
        `
      case 'current':
      default:
        return css`
          // background-color: ${({ theme }) => theme.colors.yellow100};
          color: ${({ theme }) => theme.colors.green900};
        `
    }
  }};
`

const Ellipsis = styled.span`
  @keyframes ellipsis {
    0%,
    33% {
      content: ' .';
    }
    66% {
      content: ' ..';
    }
    100% {
      content: ' ...';
    }
  }

  &::after {
    content: ' .';
    animation: ellipsis 2.5s infinite step-start;
  }
`
