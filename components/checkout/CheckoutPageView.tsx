import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { Body1, Caption, H2, H3, H4, H5 } from '@/components/core/Typography'
import { padding } from '@/styles/theme'
import { TwoColumnLayout } from '@/components/layouts/TwoColumnLayout'
import { ContentCard } from '@/components/core/ContentCard'
import { PaymentForm } from '@/components/checkout/PaymentForm'
import { ReservationForm } from '@/components/checkout/ReservationForm'
import { Button } from '@/components/core/Button'
import { useGetCartForUser } from '@/components/checkout/useGetCartForUser'
import { useProfile } from '@/components/auth/useProfile'
import { CartFragment } from '@/generated/graphql'
import Image from 'next/image'
import { formatShortAddress } from '@/lib/address'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { formatRange } from '@/utils/display-utils'
import { parseISO } from 'date-fns'
import Icon from '@/components/core/Icon'
import { useConfirmLoggedIn } from '@/components/auth/useConfirmLoggedIn'
import { usePrivy } from '@privy-io/react-auth'

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
        <PaymentForm cart={cart} />
      </FormContainer>
    </>
  )
}

type Step = ({ onComplete }: StepProps) => JSX.Element | null

const steps: Step[] = [StepDetails, StepPolicies, StepPayment]

const CheckoutPageView = () => {
  const router = useRouter()
  // const { confirmLoggedIn } = useConfirmLoggedIn()
  // const { getAccessToken } = usePrivy()
  const { user } = useProfile()

  const { cartId } = router.query
  const cart = useGetCartForUser(cartId as string, user?._id)

  const [currentStep, setCurrentStep] = useState(0)

  if (!user || !cart) {
    return null
  }

  const location = cart.offer.location
  const lodgingType = cart.lodgingType

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
        <Location>
          <Image
            src={getImageUrlByIpfsHash(location.bannerImageIpfsHash) ?? ''}
            alt={location.name ?? ''}
            width={72}
            height={72}
          />
          <LocationText>
            <H3>{location.name}</H3>
            <Caption emphasized>
              {formatRange(
                parseISO(cart.offer.startDate),
                parseISO(cart.offer.endDate)
              )}
            </Caption>
            <Caption>{formatShortAddress(location.address)}</Caption>
          </LocationText>
        </Location>
        <BookingSummary>
          <H5>Booking summary</H5>
          <Row>
            <Caption emphasized>{lodgingType.description}</Caption>
            <Caption emphasized>${lodgingType.priceCents / 100}</Caption>
          </Row>
          <Row>
            <Caption emphasized>
              1 yr cabin citizenship
              {/*<Icon name={'info'} size={1.6} />*/}
            </Caption>
            <Caption emphasized>$399</Caption>
          </Row>
          <Row>
            <Caption emphasized>Discount</Caption>
            <Caption emphasized>-$399</Caption>
          </Row>
          <Row className={'total'}>
            <H4>Total</H4>
            <H4>${lodgingType.priceCents / 100}</H4>
          </Row>
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
`

const RightSide = styled(ContentCard)`
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  ${padding('xs', 'xs')};
`

const Location = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

const LocationText = styled.div``

const BookingSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  &:nth-last-child(2) {
    padding-bottom: 0.8rem; // target padding is 2.4rem but parent has 1.6rem gap
  }

  &:last-child {
    ${padding.top('sm')};
    border-top: 1px solid ${({ theme }) => theme.colors.green900};
  }
`

const FormContainer = styled.div`
  display: flex;
  width: auto;
`
