import { Caption, H1, H5 } from '@/components/core/Typography'
import { daysBetween, formatRange } from '@/utils/display-utils'
import { OfferPrice, OfferType } from '@/generated/graphql'
import { Price } from '@/components/offers/Price'
import styled from 'styled-components'
import { offerInfoFromType } from '@/utils/offer'
import { EMPTY } from '@/utils/display-utils'
import { isDate, parseISO } from 'date-fns'

interface OfferNameAndDatesProps {
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  offerType: OfferType | null | undefined
  price: OfferPrice | null | undefined
  location: {
    shortAddress: string
  }
}

export const OfferNameAndDates = ({
  offer,
  withPrice = false,
}: {
  offer: OfferNameAndDatesProps
  withPrice?: boolean
}) => {
  const offerInfo = offer.offerType ? offerInfoFromType(offer.offerType) : null

  const startDate = isDate(offer.startDate)
    ? offer.startDate
    : typeof offer.startDate === 'string'
    ? parseISO(offer.startDate)
    : null

  const endDate = isDate(offer.endDate)
    ? offer.endDate
    : typeof offer.endDate === 'string'
    ? parseISO(offer.endDate)
    : null

  return (
    <OfferDetailsOverview>
      <H5>{formatRange(startDate, endDate)}</H5>
      <H1>{offerInfo?.name ?? EMPTY}</H1>
      <Location>
        {offer.offerType == OfferType.CabinWeek && offer.price && (
          <>
            {daysBetween(startDate, endDate)} nights {''}
          </>
        )}
        in {offer.location.shortAddress}
      </Location>
      {withPrice && <Price price={offer.price as OfferPrice} />}
    </OfferDetailsOverview>
  )
}

const OfferDetailsOverview = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.4rem;

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
  }
`
const Location = styled(Caption)`
  line-height: 1.6;
  margin-bottom: 1rem;
`
