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
import Link from 'next/link'
import { CartFragment } from '@/generated/graphql'
import {
  CreatePaymentIntentReq,
  CreatePaymentIntentRes,
} from '@/components/checkout/types'
import { usePrivy } from '@privy-io/react-auth'
import { useError } from '@/components/hooks/useError'

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
    appearance: {
      theme: 'stripe',
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

  const { getAccessToken } = usePrivy()

  const [isLoading, setIsLoading] = React.useState(true)

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

  const handleOnReady = async (element: StripePaymentElement) => {
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

        <Body1>
          I have read and agree to Cabin’s{' '}
          <Link href={''}>Liability Policy</Link>
        </Body1>

        <Button disabled={isLoading || !stripe || !elements}>
          {isLoading || !stripe || !elements ? <LoadingSpinner /> : 'Book now'}
        </Button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
`
