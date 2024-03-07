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
import { LocationFragment, ShortAddressFragment } from '@/utils/types/location'
import { formatShortAddress } from '@/lib/address'
import { getImageUrlByIpfsHash } from '@/lib/image'

type CardVariant = 'home' | 'city-directory'
interface ListingCardProps {
  location: {
    externId: string
    name: string | null | undefined
    bannerImageIpfsHash: string | null | undefined
    voteCount: number | null | undefined
    recentVoters: LocationFragment['recentVoters'] | null | undefined
    address: ShortAddressFragment | null | undefined
    sleepCapacity: number | null | undefined
    offerCount: number | null | undefined
  }
  onVote?: VoidFunction
  onDelete?: VoidFunction
  onEdit?: VoidFunction
  editMode?: boolean
  hideNeighborTag?: boolean
  position?: number
  className?: string
  variant?: CardVariant
}

const BANNER_IMAGE_HEIGHT = 258

export const ListingCard = (props: ListingCardProps) => {
  const {
    location,
    onDelete,
    onEdit,
    className,
    variant = 'city-directory',
    editMode = false,
  } = props

  const {
    externId,
    bannerImageIpfsHash,
    voteCount,
    recentVoters,
    address,
    sleepCapacity,
  } = location

  const name = props.location.name ?? 'New Listing'

  const { deviceSize } = useDeviceSize()

  const truncatedName = deviceSize === 'tablet' ? truncate(name, 30) : name

  const cardWidth = variant === 'home' ? 412 : 388

  return (
    <OuterContainer variant={variant} widthPx={cardWidth} className={className}>
      <ContainerLink
        href={editMode ? `/location/${externId}/edit` : `/location/${externId}`}
        shallow
        passHref
        onClick={() => events.viewCityDirectoryEvent(externId)}
      >
        <ImageContainer widthPx={cardWidth}>
          {bannerImageIpfsHash ? (
            <ImageFlex
              sizes={`${cardWidth}px`}
              quality={40}
              aspectRatio={cardWidth / BANNER_IMAGE_HEIGHT}
              src={getImageUrlByIpfsHash(bannerImageIpfsHash) ?? ''}
              alt={name}
            />
          ) : (
            <EmptyImageContainer>
              <Icon name="mountain" size={6} color="yellow500" />
            </EmptyImageContainer>
          )}
          <ExperienceCountTag offerCount={location.offerCount ?? 0} />
        </ImageContainer>
        <ContentContainer>
          <SummaryContainer>
            <NameH2>{truncatedName}</NameH2>
            <Caption>
              {formatShortAddress(address) ?? EMPTY} · Sleeps {sleepCapacity}
            </Caption>
          </SummaryContainer>
          <AggregatedDataContainer>
            <ListingTypeTag {...props} />
            <VotersContainer>
              {<ProfilesCount profiles={recentVoters ?? []} />}
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

const ExperienceCountTag = ({ offerCount }: { offerCount: number }) => {
  if (!offerCount || offerCount === 0) {
    return null
  }

  const plural = offerCount === 1 ? '' : 's'
  return (
    <TagContainer>
      <Subline1>
        {offerCount} Experience{plural}
      </Subline1>
    </TagContainer>
  )
}

const ListingTypeTag = (props: ListingCardProps) => {
  const { position } = props
  return (
    <LocationTagContainer>
      <Icon color={'green400'} size={1.1} name={'logo-cabin'} />
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

const OuterContainer = styled.div<{ widthPx: number; variant: CardVariant }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
  max-width: ${({ widthPx }) => widthPx}px;

  ${({ variant, widthPx, theme }) => {
    if (variant === 'home') {
      return `
        ${theme.bp.lg} {
          width: ${widthPx}px;
        }
        `
    }
  }}
`

const ContainerLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const ImageContainer = styled.div<{ widthPx: number }>`
  position: relative;
  width: 100%;
  border: solid 1px ${({ theme }) => theme.colors.green900};
  ${({ theme }) => theme.bp.md} {
    max-width: ${({ widthPx }) => widthPx}px;
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
