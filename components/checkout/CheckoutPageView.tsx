import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { Body1, H2 } from '@/components/core/Typography'
import { padding } from '@/styles/theme'
import { TwoColumnLayout } from '@/components/layouts/TwoColumnLayout'
import { ContentCard } from '@/components/core/ContentCard'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { ReservationForm } from '@/components/checkout/ReservationForm'
import { Button } from '@/components/core/Button'
import { useGetCartForUser } from '@/components/checkout/useGetCartForUser'
import { useProfile } from '@/components/auth/useProfile'
import { CartFragment } from '@/generated/graphql'

type StepProps = {
  onComplete: () => void
  cart: CartFragment
}

const StepDetails = ({ cart, onComplete }: StepProps) => {
  return (
    <>
      <H2>Traveler Details</H2>
      <ReservationForm cart={cart} onComplete={onComplete} />
    </>
  )
}

const StepPolicies = ({ onComplete }: StepProps) => {
  return (
    <>
      <H2>Safety & Policies</H2>
      <Button onClick={onComplete}>Agree & Continue</Button>
    </>
  )
}

const StepPayment = ({ cart }: StepProps) => {
  // no onComplete here because stripe form redirects user to confirm page
  return (
    <>
      <H2>Payment</H2>
      <FormContainer>
        <CheckoutForm cart={cart} />
      </FormContainer>
    </>
  )
}

type Step = ({ onComplete }: StepProps) => JSX.Element | null

const steps: Step[] = [StepDetails, StepPolicies, StepPayment]

const CheckoutPageView = () => {
  const router = useRouter()
  const { user } = useProfile()

  const { cartId } = router.query
  const cart = useGetCartForUser(cartId as string, user?._id)

  const [currentStep, setCurrentStep] = useState(0)

  if (!user || !cart) {
    return null
  }

  const advanceStep = () => {
    const isLastStep = currentStep >= steps.length - 1

    if (isLastStep) {
      // on the last step, the stripe form redirects them to the confirm page
      // router.push(`/trip/${offer._id}`)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const CurrentComponent = steps[currentStep]

  return (
    <TwoColumnLayout
      title={'Reservation'}
      icon="back-arrow"
      iconHref={`/experience/${cart.offer._id}`}
      subheader={`Step ${currentStep + 1} of ${steps.length}`}
    >
      <LeftSide shape="notch" notchSize={1.6}>
        <CurrentComponent cart={cart} onComplete={advanceStep} />
      </LeftSide>
      <RightSide shape="notch" notchPosition={'top-right'} notchSize={1.6}>
        <Body1>Details, booking summary, total, etc</Body1>
      </RightSide>
    </TwoColumnLayout>
  )
}

export default CheckoutPageView

const LeftSide = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: ${padding('md', 'sm')};
`

const RightSide = styled(ContentCard)`
  height: min-content;
  display: flex;
`

const FormContainer = styled.div`
  display: flex;
  width: auto;
`
