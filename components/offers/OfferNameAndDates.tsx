import styled, { css } from 'styled-components'
import Image from 'next/image'
import { isDate, parseISO } from 'date-fns'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { OfferPrice, OfferType } from '@/generated/graphql'
import { offerInfoFromType } from '@/utils/offer'
import { daysBetween, formatRange, EMPTY } from '@/utils/display-utils'
import { Caption, H1, H5 } from '@/components/core/Typography'
import { Price } from '@/components/offers/Price'

interface OfferNameAndDatesProps {
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  offerType: OfferType | null | undefined
  price: OfferPrice | null | undefined
  imageIpfsHash?: string | null
  location: {
    shortAddress: string
  }
}

export const OfferNameAndDates = ({
  offer,
  small = false,
  withPrice = false,
}: {
  offer: OfferNameAndDatesProps
  small?: boolean
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

  const duration =
    !small && offer.offerType == OfferType.CabinWeek
      ? `${daysBetween(startDate, endDate)} nights in`
      : ''

  return (
    <Container>
      {offer.imageIpfsHash && (
        <Image
          src={getImageUrlByIpfsHash(offer.imageIpfsHash) ?? ''}
          alt={offer.offerType ?? ''}
          width={72}
          height={72}
        ></Image>
      )}
      <Details>
        <Date small={small}>{formatRange(startDate, endDate)}</Date>
        <H1>{offerInfo?.name ?? EMPTY}</H1>
        <Location small={small}>
          {duration} {offer.location.shortAddress}
        </Location>
        {withPrice && offer.price && (
          <Price price={offer.price as OfferPrice} />
        )}
      </Details>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  width: 100%;
`

const Date = styled(H5)<{ small?: boolean }>`
  ${({ small }) =>
    small &&
    css`
      font-size: 1.3rem;
      opacity: 0.75;
    `}
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`

const Location = styled(Caption)<{ small?: boolean }>`
  line-height: 1.6;
  margin-bottom: 1rem;
`
