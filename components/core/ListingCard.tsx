import { LocationType, ProfileAvatar } from '@/generated/graphql'
import styled from 'styled-components'
import { Caption, H2, Subline1 } from './Typography'
import Icon from './Icon'
import { ProfilesCount } from './ProfilesCount'
import { CardActions } from './CardActions'
import { emptyFunction } from '@/utils/general'
import { EMPTY, truncate } from '@/utils/display-utils'
import { useDeviceSize } from '../hooks/useDeviceSize'
import Link from 'next/link'
import { ImageFlex } from './gallery/ImageFlex'
import { HorizontalDivider } from './Divider'
import events from '@/lib/googleAnalytics/events'

export interface LocationCardProps {
  _id: string
  locationType: LocationType
  caretaker: Caretaker
  name: string | null | undefined
  tagline: string | null | undefined
  bannerImageUrl: string | null | undefined
  voteCount: number | null | undefined
  voters: Voter[] | null | undefined
  address: string | null | undefined
  sleepCapacity: number | null | undefined
  offerCount: number | null | undefined
  publishedAt: Date | null | undefined
  onVote?: () => void
  onDelete?: () => void
  onEdit?: () => void
  editMode?: boolean
  hideNeighborTag?: boolean
  position?: number
  prefetch?: boolean
}

interface Caretaker {
  _id: string
  name: string
}

interface Voter {
  _id: string
  avatar?: ProfileAvatar | null | undefined
}

const BANNER_IMAGE_WIDTH = 412
const BANNER_IMAGE_HEIGHT = 258

export const ListingCard = (props: LocationCardProps) => {
  const {
    _id,
    bannerImageUrl,
    voteCount,
    voters,
    address,
    sleepCapacity,
    onDelete,
    onEdit,
    editMode = false,
    prefetch = true,
  } = props

  const name = props.name ?? 'New Listing'

  const { deviceSize } = useDeviceSize()

  const truncatedName = deviceSize === 'tablet' ? truncate(name, 30) : name

  return (
    <OuterContainer>
      <ContainerLink
        href={editMode ? `/location/${_id}/edit` : `/location/${_id}`}
        prefetch={prefetch}
        shallow
        passHref
        onClick={() => events.viewCityDirectoryEvent(_id)}
      >
        <ImageContainer>
          {bannerImageUrl ? (
            <ImageFlex
              sizes={`${BANNER_IMAGE_WIDTH}px`}
              quality={40}
              aspectRatio={BANNER_IMAGE_WIDTH / BANNER_IMAGE_HEIGHT}
              src={bannerImageUrl}
              alt={name}
            />
          ) : (
            <EmptyImageContainer>
              <Icon name="mountain" size={6} color="yellow500" />
            </EmptyImageContainer>
          )}
          <ExperienceCountTag {...props} />
        </ImageContainer>
        <ContentContainer>
          <SummaryContainer>
            <NameH2>{truncatedName}</NameH2>
            <Caption>
              {address ?? EMPTY} · Sleeps {sleepCapacity}
            </Caption>
          </SummaryContainer>
          <AggregatedDataContainer>
            <ListingTypeTag {...props} />
            <VotersContainer>
              {<ProfilesCount profiles={voters ?? []} />}
              <Caption emphasized>{`(${
                voteCount?.toLocaleString() ?? 0
              } Votes)`}</Caption>
            </VotersContainer>
          </AggregatedDataContainer>
        </ContentContainer>
        <HorizontalDivider />
      </ContainerLink>
      {editMode && (
        <CardActions
          onDelete={onDelete ?? emptyFunction}
          onEdit={onEdit ?? emptyFunction}
        />
      )}
    </OuterContainer>
  )
}

const ExperienceCountTag = (props: LocationCardProps) => {
  const { offerCount } = props

  const plural = offerCount === 1 ? '' : 's'

  if (!offerCount || offerCount === 0) {
    return null
  }

  return (
    <TagContainer>
      <Subline1>
        {offerCount} Experience{plural}
      </Subline1>
    </TagContainer>
  )
}

const ListingTypeTag = (props: LocationCardProps) => {
  const { locationType, position } = props

  return (
    <LocationTagContainer>
      <Icon
        color="green400"
        size={1.1}
        name={
          locationType === LocationType.Neighborhood
            ? 'neighborhood'
            : 'outpost'
        }
      />
      <Caption $color="yellow100">#{position}</Caption>
    </LocationTagContainer>
  )
}

const EmptyImageContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  border: solid 1px ${({ theme }) => theme.colors.green900};
`

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
  max-width: ${BANNER_IMAGE_WIDTH}px;
`

const ContainerLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  border: solid 1px ${({ theme }) => theme.colors.green900};
  ${({ theme }) => theme.bp.md} {
    max-width: ${BANNER_IMAGE_WIDTH}px;
  }
  img {
    object-fit: cover;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.6rem;
  width: 100%;
`

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`

const AggregatedDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.8rem;
`

const NameH2 = styled(H2)`
  margin-bottom: 0.4rem;
  ${({ theme }) => theme.bp.md} {
    max-width: 80%;
  }
`

const TagContainer = styled.div`
  position: absolute;
  bottom: 0.9rem;
  left: 0.9rem;
  background-color: ${({ theme }) => theme.colors.yellow100};
  padding: 0.7rem 1.2rem;
  border-radius: 0.4rem;
  width: max-content;
`

const LocationTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.4rem 1rem;
  border-radius: 6rem;
  background-color: ${({ theme }) => theme.colors.green900};
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

const VotersContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  justify-content: flex-start;
  align-items: center;
`
