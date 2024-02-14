import Image from 'next/image'
import { OfferFragment, OfferType } from '@/utils/types/offer'
import { parseISO } from 'date-fns'
import { formatShortAddress } from '@/lib/address'
import { daysBetween, formatRange } from '@/utils/display-utils'
import { getImageUrlByIpfsHash } from '@/lib/image'
import styled, { css } from 'styled-components'
import { Caption, H1, H4, H5 } from '@/components/core/Typography'
import { Price } from '@/components/offers/Price'

export const OfferNameAndDates = ({
  offer,
  small = false,
  withPrice = false,
}: {
  offer: OfferFragment
  small?: boolean
  withPrice?: boolean
}) => {
  // TODO: once dates are optional, always show them (if set)
  const showDates = offer.type !== OfferType.PaidColiving

  const startDate = parseISO(offer.startDate)
  const endDate = parseISO(offer.endDate)

  const duration =
    offer.type == OfferType.CabinWeek
      ? small
        ? ''
        : `${daysBetween(startDate, endDate)} nights in`
      : 'In'

  return (
    <Container>
      {offer.imageIpfsHash && (
        <Image
          src={getImageUrlByIpfsHash(offer.imageIpfsHash) ?? ''}
          alt={offer.type}
          width={72}
          height={72}
          style={{
            objectFit: 'cover',
          }}
        ></Image>
      )}

      <Details>
        {showDates && (
          <Date small={small}>{formatRange(startDate, endDate)}</Date>
        )}

        {small ? <H4>{offer.title}</H4> : <H1>{offer.title}</H1>}

        <Location small={small}>
          {duration} {formatShortAddress(offer.location.address)}
        </Location>

        {withPrice && offer.price && (
          <Price price={offer.price} priceInterval={offer.priceInterval} />
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
