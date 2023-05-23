import Image from 'next/image'
import { LocationType, ProfileAvatar } from '@/generated/graphql'
import styled from 'styled-components'
import { Body2, Caption, H2, Subline1, truncateStyles } from './Typography'
import { IconName } from './Icon'
import Icon from './Icon'
import { format } from 'date-fns'
import { ProfilesCount } from './ProfilesCount'
import { CardActions } from './CardActions'
import { VoteButton } from '../neighborhoods/styles'
import { emptyFunction } from '@/utils/general'
import { AuthenticatedLink } from './AuthenticatedLink'
import { EMPTY, truncate } from '@/utils/display-utils'
import { useDeviceSize } from '../hooks/useDeviceSize'

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
  actionsEnabled?: boolean
  hideNeighborTag?: boolean
}

interface Caretaker {
  _id: string
  name: string
}

interface Voter {
  _id: string
  avatar?: ProfileAvatar | null | undefined
}

const BANNER_IMAGE_SIZE = 190

export const LocationCard = (props: LocationCardProps) => {
  const {
    _id,
    caretaker,
    tagline,
    bannerImageUrl,
    voteCount,
    voters,
    address,
    sleepCapacity,
    offerCount,
    publishedAt,
    onVote,
    onDelete,
    onEdit,
    actionsEnabled = false,
  } = props

  const name = props.name ?? 'New Listing'

  const { deviceSize } = useDeviceSize()

  const shortTagline =
    deviceSize === 'tablet'
      ? truncate(tagline ?? EMPTY, 40)
      : truncate(tagline ?? EMPTY, 100)

  const truncatedName = deviceSize === 'tablet' ? truncate(name, 30) : name

  return (
    <OuterContainer>
      <ContainerLink href={`/location/${_id}`}>
        <ImageContainer>
          {bannerImageUrl ? (
            <StyledImage priority src={bannerImageUrl} fill alt={name} />
          ) : (
            <EmptyImageContainer>
              <Icon name="mountain" size={6} color="yellow500" />
            </EmptyImageContainer>
          )}
          <LocationTag {...props} />
        </ImageContainer>
        <ContentContainer>
          <SummaryContainer>
            <NameH2>{truncatedName}</NameH2>
            <StyledBody2>{shortTagline}</StyledBody2>
          </SummaryContainer>
          <LocationInfoGroupContainer>
            <LocationInfo iconName="location" label={address ?? EMPTY} />
            <LocationInfo
              iconName="sleep"
              label={sleepCapacity ? `Sleeps ${sleepCapacity}` : EMPTY}
            />
            <LocationInfo
              iconName="offer"
              label={offerCount ? `${offerCount} Offers` : EMPTY}
            />
            <LocationInfo iconName="caretaker" label={caretaker.name} />
            <LocationInfo
              iconName="date"
              label={
                publishedAt
                  ? `Joined ${format(publishedAt, 'MMM yyyy')}`
                  : EMPTY
              }
            />
          </LocationInfoGroupContainer>
        </ContentContainer>
        <VotesContainer>
          <VotersContainer>
            <Caption emphasized>{`${
              voteCount?.toLocaleString() ?? 0
            } Votes`}</Caption>
            {<ProfilesCount profiles={voters ?? []} />}
          </VotersContainer>

          <VoteButton
            variant="secondary"
            onClick={(e) => {
              e.preventDefault()
              onVote?.()
            }}
          >
            <Icon name="chevron-up" size={1.6} />
          </VoteButton>
        </VotesContainer>
      </ContainerLink>
      {actionsEnabled && (
        <CardActions
          onDelete={onDelete ?? emptyFunction}
          onEdit={onEdit ?? emptyFunction}
        />
      )}
    </OuterContainer>
  )
}

const LocationTag = (props: LocationCardProps) => {
  const { locationType, publishedAt } = props
  return (
    <TagContainer>
      {!publishedAt ? (
        <Subline1 $color="yellow100">Draft</Subline1>
      ) : (
        <Icon
          name={
            locationType === LocationType.Neighborhood
              ? 'neighborhood'
              : 'outpost'
          }
          size={1.6}
        />
      )}
    </TagContainer>
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
`

interface LocationInfoProps {
  iconName: IconName
  label: string
}
const LocationInfo = (props: LocationInfoProps) => {
  const { iconName, label } = props
  return (
    <LocationInfoContainer>
      <Icon name={iconName} size={1.4} />
      <Caption>{label}</Caption>
    </LocationInfoContainer>
  )
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
`

const ContainerLink = styled(AuthenticatedLink)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: solid 1px ${({ theme }) => theme.colors.green900};
  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 328px;
  ${({ theme }) => theme.bp.md} {
    max-height: ${BANNER_IMAGE_SIZE}px;
    max-width: ${BANNER_IMAGE_SIZE}px;
  }
  img {
    object-fit: cover;
  }
`

const StyledImage = styled(Image)`
  display: block;
  object-fit: cover;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
  gap: 2.4rem;
  overflow: hidden;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
  }
`

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`

const NameH2 = styled(H2)`
  margin-bottom: 0.8rem;
  ${truncateStyles}
`

const TagContainer = styled.div`
  position: absolute;
  left: 16px;
  background-color: ${({ theme }) => theme.colors.green900};
  padding: 0.7rem 1.2rem;
  border-radius: 0px 0px 8px 0px;
  width: max-content;
`

const VotesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
  margin: 0 1.6rem;
  padding: 1.6rem 0;
  border-top: ${({ theme }) => theme.border.light};
  ${({ theme }) => theme.bp.md} {
    margin: 2.4rem;
    padding: 0;
    border: none;
    align-items: flex-start;
  }
`

const VotersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${Caption} {
    opacity: 0.75;
  }
`

const LocationInfoGroupContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.6rem;
  row-gap: 0.8rem;
  max-width: 32rem;
`

const LocationInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;

  svg {
    opacity: 0.75;
  }
`

const StyledBody2 = styled(Body2)`
  ${({ theme }) => theme.bp.lg} {
    ${truncateStyles}
  }
`
