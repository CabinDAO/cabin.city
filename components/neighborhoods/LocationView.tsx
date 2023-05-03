import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { Body1, Caption, H1, H4 } from '@/components/core/Typography'
import Tab from '@/components/core/Tab'
import TabGroup from '@/components/core/TabGroup'
import {
  LocationMediaCategory,
  LocationType,
  OfferType,
  ProfileFragment,
  ProfileRoleConstraint,
} from '@/generated/graphql'
import { ProfileContact } from '@/components/core/ProfileContact'
import { Tag } from '@/components/core/Tag'
import Icon from '@/components/core/Icon'
import { ProfilesCount } from '@/components/core/ProfilesCount'
import { Button } from '@/components/core/Button'
import { resolveImageUrl } from '@/lib/image'
import { OffersList } from '@/components/offers/OffersList'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { DEFAULT_BANNER } from '@/stories/utils/location-data'
import { SlateRenderer } from '../core/slate/SlateRenderer'
import { stringToSlateValue } from '../core/slate/slate-utils'

interface LocationMediaItem {
  category: LocationMediaCategory
  ipfsHash?: string | null | undefined
}

interface ProfileAvatar {
  url: string
}

interface Profile {
  _id: string
  avatar?: ProfileAvatar | null | undefined
}

interface LocationVote {
  profile: Profile
}

interface OfferLocation {
  _id: string
  name?: string | null | undefined
  address?: OfferLocationAddress | null | undefined
}

interface OfferLocationAddress {
  locality?: string | null | undefined
  admininstrativeAreaLevel1Short?: string | null | undefined
}

interface OfferItem {
  _id: string
  offerType?: OfferType | null | undefined
  locationType: LocationType
  title?: string | null | undefined
  startDate?: string | null | undefined
  endDate?: string | null | undefined
  ipfsHash?: string | null | undefined
  profileRoleConstraints?: ProfileRoleConstraint[] | null | undefined
  location: OfferLocation
}

export interface LocationProps {
  _id: string
  address: string | null | undefined
  bannerImageUrl: string | null | undefined
  caretaker: ProfileFragment
  description: string | null | undefined
  locationType: LocationType
  mediaItems: LocationMediaItem[]
  name: string | null | undefined
  offerCount: number
  sleepCapacity: number | null | undefined
  internetSpeedMbps: number | null | undefined
  voteCount: number | null | undefined
  offers: OfferItem[]
  votes: LocationVote[] | null | undefined
}

const EMPTY = '—'

export const LocationView = ({
  location,
  onVote,
}: {
  location: LocationProps
  onVote?: () => void
}) => {
  const {
    _id: id,
    name,
    address,
    description,
    sleepCapacity,
    offerCount,
    mediaItems,
    bannerImageUrl,
    internetSpeedMbps,
    caretaker,
    locationType,
    voteCount,
    votes,
    offers,
  } = location
  const isNeighborhood = locationType === LocationType.Neighborhood
  const voteProfiles = (votes ?? []).map(({ profile }) => profile)
  const galleryPreviewSleeping = mediaItems.find(
    ({ category }) => category === LocationMediaCategory.Sleeping
  )
  const galleryPreviewSleepingUrl =
    !!galleryPreviewSleeping && resolveImageUrl(galleryPreviewSleeping)
  const galleryPreviewWorking = mediaItems.find(
    ({ category }) => category === LocationMediaCategory.Working
  )
  const galleryPreviewWorkingUrl =
    !!galleryPreviewWorking && resolveImageUrl(galleryPreviewWorking)
  const galleryPreviewFeatures = mediaItems.find(
    ({ category }) => category === LocationMediaCategory.Features
  )
  const galleryPreviewFeaturesUrl =
    !!galleryPreviewFeatures && resolveImageUrl(galleryPreviewFeatures)
  const { deviceSize } = useDeviceSize()
  const hasPhotos =
    !!galleryPreviewSleepingUrl &&
    !!galleryPreviewWorkingUrl &&
    !!galleryPreviewFeaturesUrl
  const bannerWidth = deviceSize === 'tablet' ? 610 : 998
  const bannerHeight = deviceSize === 'tablet' ? 256 : 420
  const galleryImageWidth = deviceSize === 'tablet' ? 198 : 269
  const galleryImageHeight = deviceSize === 'tablet' ? 198 : 269

  return (
    <LocationContent>
      <LocationBannerContainer>
        <LocationBanner
          src={bannerImageUrl ?? DEFAULT_BANNER}
          alt="Location Banner"
          width={bannerWidth}
          height={bannerHeight}
        />
      </LocationBannerContainer>

      <LocationDetailsContainer>
        <LocationTypeTag
          label={
            isNeighborhood ? 'Verified Neighborhood' : 'Registered Outpost'
          }
          color={isNeighborhood ? 'green400' : 'yellow300'}
          startAdornment={
            <Icon
              name={isNeighborhood ? 'neighborhood' : 'outpost'}
              size={1.8}
              color={isNeighborhood ? 'green400' : 'yellow300'}
            />
          }
        ></LocationTypeTag>
        <StyledContentCard shadow={true}>
          <LocationHeader>
            <LocationHeaderTitle>
              <H1>{name ?? EMPTY}</H1>
              <LocationHeaderInformation>
                <span>{address ?? EMPTY}</span>
                <span>Sleeps {sleepCapacity ?? EMPTY}</span>
                <span>{offerCount} Offers</span>
              </LocationHeaderInformation>
            </LocationHeaderTitle>

            <LocationHeaderHorizontalBar />

            <VotesContainer>
              <VotesAvatarContainer>
                <Caption>{voteCount} Votes</Caption>
                <ProfilesCount profiles={voteProfiles} />
              </VotesAvatarContainer>

              <VotingProfilesButton variant="secondary" onClick={onVote}>
                <Icon name="chevron-up" size={2.4} />
              </VotingProfilesButton>
            </VotesContainer>
          </LocationHeader>
        </StyledContentCard>
      </LocationDetailsContainer>

      <GalleryPreviewContainer>
        {hasPhotos && (
          <GalleryPreviewList>
            <GalleryPreviewListImages>
              {galleryPreviewSleepingUrl && (
                <Link
                  key={LocationMediaCategory.Sleeping}
                  href={`/location/${id}/photos?gallery=sleeping`}
                >
                  <StyledImage
                    alt={LocationMediaCategory.Sleeping}
                    src={galleryPreviewSleepingUrl}
                    width={galleryImageWidth}
                    height={galleryImageHeight}
                  />
                </Link>
              )}
              {galleryPreviewWorkingUrl && (
                <Link
                  key={LocationMediaCategory.Working}
                  href={`/location/${id}/photos?gallery=working`}
                >
                  <StyledImage
                    alt={LocationMediaCategory.Working}
                    src={galleryPreviewWorkingUrl}
                    width={galleryImageWidth}
                    height={galleryImageHeight}
                  />
                </Link>
              )}
              {galleryPreviewFeaturesUrl && (
                <Link
                  key={LocationMediaCategory.Features}
                  href={`/location/${id}/photos?gallery=features`}
                >
                  <StyledImage
                    alt={LocationMediaCategory.Features}
                    src={galleryPreviewFeaturesUrl}
                    width={galleryImageWidth}
                    height={galleryImageHeight}
                  />
                </Link>
              )}
            </GalleryPreviewListImages>

            <Link href={`/location/${id}/photos`}>
              <GalleryPreviewButton variant="secondary">
                <Icon name="right-arrow" size={2.4} />
              </GalleryPreviewButton>
            </Link>
          </GalleryPreviewList>
        )}
      </GalleryPreviewContainer>

      <TabGroup>
        <Tab name="Description">
          <DescriptionTwoColumn>
            <DescriptionDetails>
              <SlateRenderer value={stringToSlateValue(description)} />

              <HorizontalBar />

              <div>
                <H4>Internet speed</H4>
                <Body1>
                  {internetSpeedMbps ? `${internetSpeedMbps} Mbps` : EMPTY}
                </Body1>
              </div>
            </DescriptionDetails>

            <CaretakerDetailsContainer>
              <CaretakerDetails>
                <ProfileContact profile={caretaker} />
              </CaretakerDetails>
            </CaretakerDetailsContainer>
          </DescriptionTwoColumn>
        </Tab>

        <Tab name="Offers">
          <OffersList offers={offers} />
        </Tab>
      </TabGroup>
    </LocationContent>
  )
}

const LocationTypeTag = styled(Tag)`
  border-radius: 0.8rem 0 0 0;
`

const CaretakerDetailsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;
  width: 28.5rem;
  flex-shrink: 0;

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
  }
`

const CaretakerDetails = styled.div`
  display: flex;
  flex-flow: row;
  padding-left: 2.4rem;
  gap: 0.8em;
  border-left: 1px solid ${({ theme }) => theme.colors.green900}1e;

  ${({ theme }) => theme.bp.lg_max} {
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.green900}1e;
    padding-left: 0;
    padding-top: 2.4rem;
  }
`

const DescriptionTwoColumn = styled.div`
  display: flex;
  flex-flow: row;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg_max} {
    flex-flow: column;
  }
`

const DescriptionDetails = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;
  flex: 1;
`

const VotingProfilesButton = styled(Button)`
  padding: 1.4rem;
`

const HorizontalBar = styled.div`
  opacity: 0.12;
  border-top: 1px solid ${({ theme }) => theme.colors.green900};
  width: 100%;
`

const LocationHeaderHorizontalBar = styled.div`
  opacity: 0.12;
  border-top: 1px solid ${({ theme }) => theme.colors.green900};
  width: 100%;
  display: block;

  ${({ theme }) => theme.bp.md} {
    display: none;
  }
`

const LocationBannerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;

  ${({ theme }) => theme.bp.lg_max} {
    top: -2.4rem;
    width: 100%;
  }
`

const LocationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md_max} {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    position: relative;
  }

  ${({ theme }) => theme.bp.md_max} {
    position: static;
  }

  ${({ theme }) => theme.bp.lg} {
    position: static;
  }
`

const LocationBanner = styled(Image)`
  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
    height: auto;
  }
`

const LocationDetailsContainer = styled.div`
  width: 100%;

  ${({ theme }) => theme.bp.lg_max} {
    margin-top: 26.4vw;
  }

  ${({ theme }) => theme.bp.md_max} {
    margin-top: 18.4vw;
  }

  ${({ theme }) => theme.bp.lg} {
    margin-top: 33.2rem;
  }
`

const StyledContentCard = styled(ContentCard)`
  padding: 3.2rem 2.4rem;
`

const LocationHeader = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.6rem;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    display: flex;
    flex-flow: row;
  }
`

const LocationHeaderTitle = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.6rem;
`

const LocationHeaderInformation = styled(Caption)`
  display: flex;
  flex-flow: row;
  gap: 0.5rem;

  * + *:before {
    content: '·';
    margin-right: 0.5rem;
  }
`

const GalleryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

const GalleryPreviewList = styled.div`
  position: relative;
  width: 100%;
`

const GalleryPreviewListImages = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
  grid-gap: 1.6rem;

  > *:not(:first-child) {
    display: none;
  }

  ${({ theme }) => theme.bp.md} {
    > *:not(:first-child) {
      display: block;
    }

    > a {
      position: relative;
      width: 100%;
      padding: 50%;
    }

    > a > img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }

  ${({ theme }) => theme.bp.lg_max} {
    grid-gap: 0.8rem;
  }

  ${({ theme }) => theme.bp.md_max} {
    width: 100%;
    padding: 50%;

    > a {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    img {
      height: 100%;
      width: 100%;
    }
  }
`

const GalleryPreviewButton = styled(Button)`
  padding: 1rem;
  position: absolute;
  z-index: 1;
  bottom: 2.4rem;
  right: 2.4rem;
`

const StyledImage = styled(Image)`
  border: 1px solid ${({ theme }) => theme.colors.black};
  cursor: pointer;
`

const VotesContainer = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1.6rem;
  justify-content: end;
`

const VotesAvatarContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.8rem;
`
