import Image from 'next/image'
import { LocationType, OfferType } from '@/generated/graphql'
import styled from 'styled-components'
import { Caption, H4 } from './Typography'
import Icon from './Icon'
import { format } from 'date-fns'
import { offerInfoFromType } from '@/utils/offer'
import { ListItem } from './ListItem'

export interface OfferListItemProps {
  _id: string
  offerType: OfferType | null | undefined
  locationType: LocationType
  title: string | null | undefined
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  imageUrl: string | null | undefined
  location: {
    _id: string
    name: string | null | undefined
    shortAddress: string | null | undefined
  }
}

export const OfferListItem = (props: OfferListItemProps) => {
  const { _id, offerType, title, startDate, endDate, imageUrl, location } =
    props

  const offerInfo = offerType ? offerInfoFromType(offerType) : null
  const formattedStartDate = startDate ? format(startDate, 'MMM') : null
  const formattedEndDate = endDate ? format(endDate, 'MMM yyyy') : null
  const formattedLocation = `${location.name ?? '-'} · ${
    location.shortAddress ?? '-'
  }`

  return (
    <ListItem href={`/offer/${_id}`}>
      <InnerContainer>
        <ImageContainer>
          {imageUrl ? (
            <StyledImage src={imageUrl} fill alt={title ?? 'Offer'} />
          ) : (
            <EmptyImageContainer>
              <Icon name="offer" size={3.2} color="yellow500" />
            </EmptyImageContainer>
          )}
          <LocationTag {...props} />
        </ImageContainer>
        <ContentContainer>
          <Caption
            emphasized
          >{`${formattedStartDate} - ${formattedEndDate} · ${offerInfo?.name}`}</Caption>
          <H4>{title}</H4>
          <Caption>{formattedLocation}</Caption>
        </ContentContainer>
      </InnerContainer>
    </ListItem>
  )
}

const LocationTag = (props: OfferListItemProps) => {
  const { locationType } = props
  return (
    <TagContainer>
      <Icon
        name={
          locationType === LocationType.Neighborhood
            ? 'neighborhood'
            : 'outpost'
        }
        size={1.2}
      />
    </TagContainer>
  )
}

const InnerContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`

const EmptyImageContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  clip-path: circle(50%);
`

const ImageContainer = styled.div`
  position: relative;
  width: 64px;
  height: 64px;

  img {
    object-fit: cover;
  }
`

const StyledImage = styled(Image)`
  display: block;
  border-radius: 50%;
  border: solid 1px black;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const TagContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.green900};
  border-radius: 50%;
  border: solid 0.75px ${({ theme }) => theme.colors.yellow200};
`
