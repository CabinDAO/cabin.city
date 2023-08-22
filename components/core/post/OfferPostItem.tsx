import styled from 'styled-components'
import { OfferListItemProps } from '../OfferListItem'
import Image from 'next/image'
import { Caption, H4, truncateStyles } from '../Typography'
import { EMPTY, formatRange } from '@/utils/display-utils'
import { offerInfoFromType } from '@/utils/offer'
import Link from 'next/link'

export const OfferPostItem = ({
  imageUrl,
  title,
  startDate,
  endDate,
  offerType,
  location,
  _id,
}: OfferListItemProps) => {
  const formattedDate = formatRange(startDate, endDate)

  if (!offerType) return null

  return (
    <Container href={`/experience/${_id}`}>
      <ImageContainer>
        {imageUrl ? (
          <Image
            alt={title ?? 'Experience'}
            src={imageUrl}
            width={96}
            height={96}
          />
        ) : null}
      </ImageContainer>
      <Data>
        <TruncatedCaption emphasized>{formattedDate ?? EMPTY}</TruncatedCaption>
        <H4>{title}</H4>
        <TruncatedCaption>
          {`${offerInfoFromType(offerType).name} · ${location.name} · ${
            location.shortAddress
          }`}
        </TruncatedCaption>
      </Data>
    </Container>
  )
}

const TruncatedCaption = styled(Caption)`
  ${truncateStyles}
`

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  gap: 1.6rem;
  background-color: ${({ theme }) => theme.colors.yellow200};
  border: 0.1rem solid ${({ theme }) => theme.colors.green900}1A;
  padding-bottom: 1.9rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    align-items: center;
    padding-bottom: 0.8rem;
  }
`

const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
  overflow: hidden;
`

const ImageContainer = styled.div`
  position: relative;
  width: 9.6rem;
  height: 9.6rem;
  display: flex;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.yellow300};
`
