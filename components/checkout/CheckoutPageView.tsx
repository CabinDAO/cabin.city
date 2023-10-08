import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { Body2, H2, H4, H5 } from '@/components/core/Typography'
import { padding } from '@/styles/theme'
import { TwoColumnLayout } from '@/components/layouts/TwoColumnLayout'
import { ContentCard } from '@/components/core/ContentCard'
import { PaymentForm } from '@/components/checkout/PaymentForm'
import { ReservationForm } from '@/components/checkout/ReservationForm'
import { useGetCartForUser } from '@/components/checkout/useGetCartForUser'
import { useProfile } from '@/components/auth/useProfile'
import { CartFragment, PaymentStatus } from '@/generated/graphql'
import { formatShortAddress } from '@/lib/address'
import { parseISO } from 'date-fns'
import { CostBreakdown } from '@/components/checkout/CostBreakdown'
import { OfferNameAndDates } from '@/components/offers/OfferNameAndDates'
import { ContactUsLink } from '@/components/core/ContactUsLink'
import { COCForm } from '@/components/checkout/COCForm'

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

const StepPolicies = ({ cart, onComplete }: StepProps) => {
  return (
    <>
      <H2>Code of Conduct</H2>
      <COCForm cart={cart} onComplete={onComplete} />
    </>
  )
}

const StepPayment = ({ cart }: StepProps) => {
  // no onComplete here because stripe form redirects user to confirm page
  return (
    <>
      <H2>Payment</H2>
      <Body2>
        If you prefer paying in USDC or ETH,{' '}
        <ContactUsLink>contact us</ContactUsLink> to complete your booking.
      </Body2>
      <FormContainer>
        <PaymentForm cart={cart} />
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
  const { cart } = useGetCartForUser(cartId as string, user?._id)

  const [currentStep, setCurrentStep] = useState(1)

  if (!user || !cart) {
    return null
  }

  if (router.query.step) {
    // step cant be less than 1
    const stepInQuery = Math.min(
      Math.max(parseInt(router.query.step as string), 1),
      steps.length
    )
    if (stepInQuery != currentStep) {
      setCurrentStep(stepInQuery)
    }
  }

  if (cart.paymentStatus == PaymentStatus.Paid) {
    router.push(`/checkout/${cart._id}/confirmation`).then()
    return null
  }

  const lodgingType = cart.lodgingType

  if (lodgingType.spotsTaken >= lodgingType.quantity) {
    return <H4>Sold Out</H4>
  }

  const advanceStep = () => {
    const isLastStep = currentStep >= steps.length

    if (isLastStep) {
      // on the last step, the stripe form redirects them to the confirm page
      // router.push(`/trip/${offer._id}`)
    } else {
      setCurrentStep(currentStep + 1)
      router.query.step = `${currentStep + 1}`
      router.push({ query: router.query }).then()
    }
  }

  const handleBackClick = () => {
    if (currentStep == 1) {
      router.push(`/experience/${cart.offer._id}`).then()
    } else {
      setCurrentStep(currentStep - 1)
      router.query.step = `${currentStep - 1}`
      router.push({ query: router.query }).then()
    }
  }

  const CurrentComponent = steps[currentStep - 1]

  return (
    <TwoColumnLayout
      title={'Reservation'}
      icon="back-arrow"
      onIconClick={handleBackClick}
      subheader={`Step ${currentStep} of ${steps.length}`}
      withFooter
    >
      <LeftSide shape="notch" notchSize={1.6}>
        <CurrentComponent cart={cart} onComplete={advanceStep} />
      </LeftSide>
      <RightSide shape="notch" notchPosition={'top-right'} notchSize={1.6}>
        <OfferNameAndDates
          small
          offer={{
            startDate: cart.offer.startDate ?? null,
            endDate: cart.offer.endDate ?? null,
            offerType: cart.offer.offerType ?? null,
            price: cart.offer.price ?? null,
            imageIpfsHash: cart.offer.imageIpfsHash ?? null,
            location: {
              shortAddress: formatShortAddress(
                cart.offer.location.address ?? null
              ),
            },
          }}
        />
        <BookingSummary>
          <H5>Booking summary</H5>
          <CostBreakdown
            lodgingType={lodgingType}
            startDate={parseISO(cart.offer.startDate)}
            endDate={parseISO(cart.offer.endDate)}
          />
        </BookingSummary>
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
  justify-content: flex-start;
  width: 100%;
  ${padding('md', 'sm')};

  ${({ theme }) => theme.bp.lg_max} {
    order: 2;
  }
`

const RightSide = styled(ContentCard)`
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  ${padding('xs', 'xs')};
`

const BookingSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

const FormContainer = styled.div`
  display: flex;
  width: 100%;
`
