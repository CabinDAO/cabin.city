import Image from 'next/image'
import { LocationType, ProfileAvatar } from '@/generated/graphql'
import styled from 'styled-components'
import { Body2, Caption, H2, Subline1 } from './Typography'
import { IconName } from './Icon'
import Icon from './Icon'
import { format } from 'date-fns'
import { Button } from './Button'
import Link from 'next/link'
import { ProfilesCount } from './ProfilesCount'
import { CardActions } from './CardActions'

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
}

interface Caretaker {
  _id: string
  name: string
}

const emptyFunction = () => {
  return
}

interface Voter {
  _id: string
  avatar?: ProfileAvatar | null | undefined
}

const BANNER_IMAGE_SIZE = 190
const EMPTY = '—'

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

  return (
    <OuterContainer>
      <ContainerLink href={`/location/${_id}`}>
        <ImageContainer>
          {bannerImageUrl ? (
            <StyledImage src={bannerImageUrl} fill alt={name} />
          ) : (
            <EmptyImageContainer>
              <Icon name="mountain" size={6} color="yellow500" />
            </EmptyImageContainer>
          )}
          <LocationTag {...props} />
        </ImageContainer>
        <ContentContainer>
          <NameH2>{name}</NameH2>
          <Body2>{tagline}</Body2>
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
            {voters ? <ProfilesCount profiles={voters} /> : null}
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
`

const ContainerLink = styled(Link)`
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
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
  }
`

const NameH2 = styled(H2)`
  margin-bottom: 0.8rem;
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
`

const VoteButton = styled(Button)`
  padding: 1.5rem;
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
`
