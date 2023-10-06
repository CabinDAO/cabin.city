import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { CartFragment, OfferType, PaymentStatus } from '@/generated/graphql'
import { useProfile } from '@/components/auth/useProfile'
import { Body2, H2, H4 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { ContentCard } from '@/components/core/ContentCard'
import { useGetCartForUser } from '@/components/checkout/useGetCartForUser'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { Button } from '@/components/core/Button'
import Link from 'next/link'
import { HorizontalDivider } from '@/components/core/Divider'
import { CostBreakdown } from '@/components/checkout/CostBreakdown'
import { format, parseISO } from 'date-fns'
import { OfferNameAndDates } from '@/components/offers/OfferNameAndDates'
import { formatShortAddress } from '@/lib/address'
import {
  LocationLinkCard,
  OfferLinkCard,
} from '@/components/neighborhoods/LinkCards'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { ContactUsLink } from '@/components/core/ContactUsLink'

const CheckoutConfirmPageView = () => {
  const router = useRouter()
  const { user } = useProfile()

  const { cartId } = router.query
  const { cart, startPolling, stopPolling } = useGetCartForUser(
    cartId as string,
    user?._id
  )

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

  if (!cart || !isPaid) {
    startPolling(1000)
  } else {
    stopPolling()
  }

  if (!user || !cart) {
    return null
  }

  return (
    <SingleColumnLayout withFooter>
      <TitleCard icon="backpack" title="Reservation" />
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
  const offerProps = {
    startDate: cart.offer.startDate ?? null,
    endDate: cart.offer.endDate ?? null,
    offerType: cart.offer.offerType ?? null,
    price: cart.offer.price ?? null,
    location: {
      shortAddress: formatShortAddress(cart.offer.location.address ?? null),
    },
  }
  return (
    <Content>
      {showFirstTimeSection && (
        <>
          <FirstTimeSection>
            <FirstTimeSectionPart>
              <StyledIcon
                name={'check-circle'}
                size={9.6}
                color={'yellow600'}
              />
              <H2>Thank you for booking through Cabin</H2>
              <Body2>
                We’ll be in touch with more details as we get closer to arrival.
              </Body2>
            </FirstTimeSectionPart>
            <FirstTimeSectionPart>
              <H4>Before you go</H4>
              <Body2>
                Help others get to know you by keeping your profile up to date
              </Body2>
            </FirstTimeSectionPart>
            <Link
              href={`/profile/${cart.profile._id}`}
              target={'_blank'}
              rel={'noreferer'}
            >
              <Button>Customize profile</Button>
            </Link>
          </FirstTimeSection>
          <DividerWithMargin />
        </>
      )}

      <ReservationDetails>
        <LeftSide>
          <OfferNameAndDates offer={offerProps} />
          <H4>Check-in</H4>
          <Body2>
            1pm, {format(parseISO(cart.offer.startDate), 'E, LLL Lo, y')}
          </Body2>
          <H4>Check-out</H4>
          <Body2>
            10am, {format(parseISO(cart.offer.endDate), 'E, LLL Lo, y')}
          </Body2>
          <H4>Address</H4>
          <Body2>
            {cart.offer.location.name}
            <br />
            {cart.offer.location.address?.formattedAddress}
          </Body2>
          <H4>Transportation</H4>
          <Body2>
            Now that you’re confirmed, please go ahead and book your travel.
            There will be shuttles from the airport to the retreat location at
            12 PM and 4 PM on Sunday, so please plan to arrive by 3 PM local
            time at the latest.
          </Body2>
          <H4>Cancellation Policy</H4>
          <Body2>
            For a full refund, guests must cancel within 48 hours of booking and
            at least 28 days before check-in. Email{' '}
            <Link
              href={`mailto:${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}`}
              style={{ textDecoration: 'underline' }}
              target={'_blank'}
              rel={'noreferer'}
            >
              {EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}
            </Link>{' '}
            for more information.
          </Body2>
          <H4>Have a question?</H4>
          <Body2>
            Don’t hesitate to <ContactUsLink>contact us</ContactUsLink> with any
            questions or concerns.
          </Body2>
          <HorizontalDivider />
          <OfferLinkCard
            offer={{
              _id: cart.offer._id,
              offerType: cart.offer.offerType ?? OfferType.CabinWeek,
              startDate: parseISO(cart.offer.startDate),
              endDate: parseISO(cart.offer.endDate),
              shortAddress: formatShortAddress(cart.offer.location.address),
              imageIpfsHash: cart.offer.imageIpfsHash ?? '',
            }}
          />
          <LocationLinkCard
            location={{
              _id: cart.offer.location._id,
              name: cart.offer.location.name ?? '',
              shortAddress: formatShortAddress(cart.offer.location.address),
              bannerImageIpfsHash:
                cart.offer.location.bannerImageIpfsHash ?? '',
            }}
          />
        </LeftSide>

        <RightSide>
          <H4>Payment summary</H4>
          <CostBreakdown
            lodgingType={cart.lodgingType}
            startDate={parseISO(cart.offer.startDate)}
            endDate={parseISO(cart.offer.endDate)}
          />
        </RightSide>
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

const FirstTimeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin-bottom: 4rem;

  ${H2}, ${Body2} {
    text-align: center;
  }
`

const DividerWithMargin = styled(HorizontalDivider)`
  margin-bottom: 4rem;
`

const FirstTimeSectionPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`
const SideBySide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

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

  > ${H4}:first-of-type {
    margin-top: 2rem;
  }

  > ${Body2} {
    margin-bottom: 1rem;
  }

  ${HorizontalDivider} {
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
  }
`

const RightSide = styled.div`
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 40rem;
  }
`
