import Link from 'next/link'
import Image from 'next/image'
import { LocationFragment, ShortAddressFragment } from '@/utils/types/location'
import { CaretakerFragment } from '@/utils/types/profile'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { formatShortAddress } from '@/lib/address'
import { EMPTY, truncate } from '@/utils/display-utils'
import events from '@/lib/googleAnalytics/events'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Body2, Caption, H2, Subline1, truncateStyles } from './Typography'
import Icon, { IconName } from './Icon'
import { ProfilesCount } from './ProfilesCount'
import { CardActions } from './CardActions'
import { VoteButton } from '../neighborhoods/styles'
import { useLocationActions } from '@/components/hooks/useLocationActions'
import { useLocationVote } from '@/components/hooks/useLocationVote'
import { getImageUrlByIpfsHash } from '@/lib/image'

interface LocationCardProps {
  location: {
    externId: string
    name: string | null | undefined
    tagline: string | null | undefined
    publishedAt: string | null | undefined
    bannerImageIpfsHash: string | null | undefined
    voteCount: number | null | undefined
    recentVoters: LocationFragment['recentVoters'] | null | undefined
    address: ShortAddressFragment | null | undefined
    sleepCapacity: number | null | undefined
    offerCount: number | null | undefined
    caretaker: CaretakerFragment
  }
  editMode?: boolean
  hideVerifiedTag?: boolean
  position?: number
  revalidateLocationsFn: () => Promise<unknown>
}

const BANNER_IMAGE_SIZE = 190

export const LocationCard = (props: LocationCardProps) => {
  const { location, editMode = false } = props

  const { editLocation: onEdit, deleteLocation: onDelete } = useLocationActions(
    location.externId,
    props.revalidateLocationsFn
  )
  const { voteForLocation: onVote } = useLocationVote(
    props.revalidateLocationsFn
  )

  const name = location.name ?? 'New Listing'

  const { deviceSize } = useDeviceSize()

  const shortTagline =
    deviceSize === 'tablet'
      ? truncate(location.tagline ?? EMPTY, 40)
      : truncate(location.tagline ?? EMPTY, 100)

  const truncatedName = deviceSize === 'tablet' ? truncate(name, 30) : name

  return (
    <OuterContainer>
      <ContainerLink
        href={
          editMode
            ? `/location/${location.externId}/edit`
            : `/location/${location.externId}`
        }
        shallow
        onClick={() => events.viewCityDirectoryEvent(location.externId)}
      >
        <ImageContainer>
          {location.bannerImageIpfsHash ? (
            <StyledImage
              quality={40}
              src={getImageUrlByIpfsHash(location.bannerImageIpfsHash) ?? ''}
              sizes={`${BANNER_IMAGE_SIZE}px`}
              fill
              alt={name}
            />
          ) : (
            <EmptyImageContainer>
              <Icon name="mountain" size={6} color="yellow500" />
            </EmptyImageContainer>
          )}
          {!location.publishedAt && (
            <TagContainer>
              <Subline1 $color="yellow100">Draft</Subline1>
            </TagContainer>
          )}
        </ImageContainer>
        <ContentContainer>
          <SummaryContainer>
            <NameH2>{truncatedName}</NameH2>
            <StyledBody2>{shortTagline}</StyledBody2>
          </SummaryContainer>
          <LocationInfoGroupContainer>
            <LocationInfo
              iconName="location"
              label={formatShortAddress(location.address) ?? EMPTY}
            />
            <LocationInfo
              iconName="sleep"
              label={
                location.sleepCapacity
                  ? `Sleeps ${location.sleepCapacity}`
                  : EMPTY
              }
            />
            <LocationInfo
              iconName="offer"
              label={
                location.offerCount
                  ? `${location.offerCount} Experiences`
                  : EMPTY
              }
            />
          </LocationInfoGroupContainer>
          <LocationInfoGroupContainer>
            <LocationInfo
              iconName="caretaker"
              label={location.caretaker.name}
            />
            <LocationInfo
              iconName="date"
              label={`Joined ${format(
                new Date(location.caretaker.createdAt),
                'MMM yyyy'
              )}`}
            />
          </LocationInfoGroupContainer>
        </ContentContainer>
        <VotesContainer>
          <VotersContainer>
            <Caption emphasized>{`${
              location.voteCount?.toLocaleString() ?? 0
            } Votes`}</Caption>
            {<ProfilesCount profiles={location.recentVoters ?? []} />}
          </VotersContainer>

          <VoteButton
            variant="secondary"
            onClick={(e) => {
              e.preventDefault()
              if (onVote) {
                onVote(location)
              }
            }}
          >
            <Icon name="chevron-up" size={1.6} />
          </VoteButton>
        </VotesContainer>
      </ContainerLink>
      {editMode && <CardActions onDelete={onDelete} onEdit={onEdit} />}
    </OuterContainer>
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

const ContainerLink = styled(Link)`
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
