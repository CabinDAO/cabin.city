import Image from 'next/image'
import Link from 'next/link'
import { OfferFragment, OfferType } from '@/utils/types/offer'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { offerInfoFromType } from '@/utils/offer'
import { formatRange } from '@/utils/display-utils'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { Caption, H4 } from '@/components/core/Typography'
import { formatShortAddress } from '@/lib/address'

export const LocationLinkCard = ({
  location,
}: {
  location: OfferFragment['location']
}) => {
  return (
    <Container href={`/location/${location.externId}`}>
      <Image
        src={getImageUrlByIpfsHash(location.bannerImageIpfsHash) ?? ''}
        alt={location.name}
        width={72}
        height={72}
      ></Image>
      <Info>
        <FaintCaption>Location</FaintCaption>
        <H4>{location.name}</H4>
        <Caption>{formatShortAddress(location.address)}</Caption>
      </Info>
    </Container>
  )
}

interface OfferLinkCardProps {
  offer: {
    _id: string
    offerType: OfferType
    startDate: Date
    endDate: Date
    shortAddress: string
    imageIpfsHash: string
  }
}

export const OfferLinkCard = ({ offer }: OfferLinkCardProps) => {
  const offerType = offerInfoFromType(offer.offerType).name
  return (
    <Container href={`/event/${offer._id}`}>
      <Image
        src={getImageUrlByIpfsHash(offer.imageIpfsHash) ?? ''}
        alt={offerType}
        width={72}
        height={72}
      ></Image>
      <Info>
        <FaintCaption>{offerType}</FaintCaption>
        <H4>{formatRange(offer.startDate, offer.endDate)}</H4>
        <Caption>{offer.shortAddress}</Caption>
      </Info>
    </Container>
  )
}

const Container = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.green900}12;
  ${padding('xs')}
`
const FaintCaption = styled(Caption)`
  opacity: 0.75;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;

  ${H4} {
    margin: 0;
  }
`
