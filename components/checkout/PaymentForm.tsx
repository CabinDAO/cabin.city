import { Elements } from '@stripe/react-stripe-js'
import {
  Layout,
  loadStripe,
  StripeElementsOptionsMode,
  StripePaymentElement,
} from '@stripe/stripe-js'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import styled from 'styled-components'
import React, { FormEvent } from 'react'
import { appDomainWithProto } from '@/utils/display-utils'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { Button } from '@/components/core/Button'
import { Body1 } from '@/components/core/Typography'
import { CartFragment } from '@/generated/graphql'
import {
  CreatePaymentIntentReq,
  CreatePaymentIntentRes,
} from '@/components/checkout/types'
import { usePrivy } from '@privy-io/react-auth'
import { useError } from '@/components/hooks/useError'
import { useModal } from '@/components/hooks/useModal'
import { LiabilityPolicyModal } from '@/components/checkout/LiabilityPolicyModal'
import { Checkbox } from '@/components/core/Checkbox'

// Call this outside the render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
)

export const PaymentForm = ({ cart }: { cart: CartFragment }) => {
  // const [clientSecret, setClientSecret] = React.useState('')

  // React.useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //
  //   const reqBody: CreatePaymentIntentBody = props
  //
  //   fetch('/api/checkout/create-payment-intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(reqBody),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret))
  // }, [])

  const options: StripeElementsOptionsMode = {
    // clientSecret: clientSecret,
    mode: 'payment',
    amount: cart.amountCents,
    currency: 'usd',
    fonts: [
      {
        cssSrc:
          'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600&display=swap',
      },
    ],
    // https://stripe.com/docs/elements/appearance-api?platform=web#variables
    appearance: {
      theme: 'stripe',
      variables: {
        fontFamily: 'IBM Plex Mono', // make sure you import this font above too
        // fontSizeBase: '10px',
        fontWeightMedium: '600',
        // colorPrimary: '#0570de',
        // colorBackground: '#ffffff',
        // colorText: '#30313d',
        // colorDanger: '#df1b41',
      },
      // rules: {
      // p-Fade: { margin-bottom: 2.4rem } // bottom of zip code gets cut off on mobile
      // },
    },
  }

  return (
    <>
      {/*{clientSecret && (*/}
      <Elements stripe={stripePromise} options={options}>
        <StripeForm cart={cart} />
      </Elements>
      {/*)}*/}
    </>
  )
}

const StripeForm = ({ cart }: { cart: CartFragment }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { showError } = useError()
  const { showModal } = useModal()

  const { getAccessToken } = usePrivy()

  const [isLoading, setIsLoading] = React.useState(true)

  const [checkboxChecked, setCheckboxChecked] = React.useState(false)
  const formDisabled = isLoading || !stripe || !elements

  const handleModalClick = () => {
    showModal(() => <LiabilityPolicyModal />)
  }

  // React.useEffect(() => {
  //   if (!stripe) {
  //     return
  //   }
  //
  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     'payment_intent_client_secret'
  //   )
  //
  //   if (!clientSecret) {
  //     return
  //   }
  //
  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     switch (paymentIntent?.status) {
  //       case 'succeeded':
  //         setMessage('Payment succeeded!')
  //         break
  //       case 'processing':
  //         setMessage('Your payment is processing.')
  //         break
  //       case 'requires_payment_method':
  //         setMessage('Your payment was not successful, please try again.')
  //         break
  //       default:
  //         setMessage('Something went wrong.')
  //         break
  //     }
  //   })
  // }, [stripe])

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    if (!checkboxChecked) {
      showError(
        'Please read the Liability Policy and check the box indicating you agree to it.'
      )
      setIsLoading(false)
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      console.log('stripe elements submit error', submitError)
      showError(submitError.message ?? 'An unexpected stripe error occurred.')
      setIsLoading(false)
      return
    }

    const token = await getAccessToken()
    const intentRes = await fetch('/api/checkout/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartId: cart._id,
        agreedToTerms: checkboxChecked,
      } as CreatePaymentIntentReq),
    })

    if (!intentRes.ok) {
      showError('An unexpected error occurred while creating payment intent.')
      setIsLoading(false)
      return
    }

    const { clientSecret } = (await intentRes.json()) as CreatePaymentIntentRes

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: appDomainWithProto + `/checkout/${cart._id}/confirmation`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    console.log(error)
    // Show error to your customer (for example, payment details incomplete)
    if (error.type === 'card_error' || error.type === 'validation_error') {
      showError(
        error.message ?? 'An unexpected card or validation error occurred.'
      )
    } else {
      showError('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  // const handleOnReady = async (element: StripePaymentElement) => {
  const handleOnReady = async () => {
    setIsLoading(false)
  }

  const paymentElementOptions: { layout: Layout } = {
    layout: 'tabs',
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <PaymentElement
          options={paymentElementOptions}
          onReady={handleOnReady}
        />

        <CheckboxRow>
          <Checkbox
            selected={checkboxChecked}
            onClick={() => {
              setCheckboxChecked(!checkboxChecked)
            }}
            disabled={formDisabled}
          />
          <Body1>
            <span
              onClick={() => {
                setCheckboxChecked(!checkboxChecked)
              }}
            >
              I have read and agree to Cabin’s
            </span>{' '}
            <a
              onClick={handleModalClick}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Liability Policy
            </a>
          </Body1>
        </CheckboxRow>

        <Button disabled={formDisabled}>
          {formDisabled ? <LoadingSpinner /> : 'Book now'}
        </Button>
      </form>
    </Container>
  )
}

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;

  > :first-child {
    flex-shrink: 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;

  > form {
    width: 100%;
  }
`
