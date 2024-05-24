import styled from 'styled-components'
import Image from 'next/image'
import { Caption, H4, truncateStyles } from '../Typography'
import { EMPTY, formatRange } from '@/utils/display-utils'
import Link from 'next/link'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { formatShortAddress } from '@/lib/address'
import { ActivityListFragment } from '@/utils/types/activity'

export const EventPostItem = ({
  imageIpfsHash,
  title,
  type,
  startDate,
  endDate,
  location,
  externId,
}: NonNullable<ActivityListFragment['metadata']['offer']>) => {
  const formattedDate = formatRange(new Date(startDate), new Date(endDate))

  return (
    <Container href={`/event/${externId}`}>
      <ImageContainer>
        {imageIpfsHash ? (
          <Image
            alt={title ?? 'Event'}
            src={getImageUrlByIpfsHash(imageIpfsHash) ?? ''}
            width={96}
            height={96}
          />
        ) : null}
      </ImageContainer>
      <Data>
        <TruncatedCaption emphasized>{formattedDate ?? EMPTY}</TruncatedCaption>
        <H4>{title}</H4>
        <TruncatedCaption>
          {`${location.name} · ${formatShortAddress(location.address)}`}
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
