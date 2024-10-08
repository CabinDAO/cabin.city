import styled from 'styled-components'
import { Caption, H4, truncateStyles } from '../Typography'
import { EMPTY, formatRange } from '@/utils/display-utils'
import { formatShortAddress } from '@/lib/address'
import { ActivityListFragment } from '@/utils/types/activity'

export const EventPostItem = ({
  title,
  startDate,
  endDate,
  location,
}: NonNullable<ActivityListFragment['metadata']['offer']>) => {
  const formattedDate = formatRange(new Date(startDate), new Date(endDate))

  return (
    <Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.8rem 1.9rem;
  gap: 1.6rem;
  background-color: ${({ theme }) => theme.colors.yellow200};
  border: 0.1rem solid ${({ theme }) => theme.colors.green900}1A;
  width: 100%;
  margin: 0 1rem;

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
