import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { Body1, Caption, H1, H3, H4 } from '@/components/core/Typography'

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
import { SlateRenderer } from '../core/slate/SlateRenderer'
import { stringToSlateValue } from '../core/slate/slate-utils'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { VoteButton } from './styles'
import events from '@/lib/googleAnalytics/events'
import { ExperienceList } from '../offers/ExperienceList'

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
  caretakerEmail: string | null | undefined
  description: string | null | undefined
  locationType: LocationType
  mediaItems: LocationMediaItem[]
  name: string | null | undefined
  tagline: string | null | undefined
  offerCount: number
  sleepCapacity: number | null | undefined
  internetSpeedMbps: number | null | undefined
  voteCount: number | null | undefined
  offers: OfferItem[]
  votes: LocationVote[] | null | undefined
  publishedAt: Date | null | undefined
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
    caretakerEmail,
  } = location
  const isNeighborhood = locationType === LocationType.Neighborhood
  const voteProfiles = (votes ?? []).map(({ profile }) => profile)
  const galleryPreviewSleeping = mediaItems.find(
    ({ category }) => category === LocationMediaCategory.Sleeping
  )
  const galleryPreviewSleepingUrl =
    !!galleryPreviewSleeping && resolveImageUrl(galleryPreviewSleeping, true)
  const galleryPreviewWorking = mediaItems.find(
    ({ category }) => category === LocationMediaCategory.Working
  )
  const galleryPreviewWorkingUrl =
    !!galleryPreviewWorking && resolveImageUrl(galleryPreviewWorking, true)
  const galleryPreviewFeatures = mediaItems.find(
    ({ category }) => category === LocationMediaCategory.Features
  )
  const galleryPreviewFeaturesUrl =
    !!galleryPreviewFeatures && resolveImageUrl(galleryPreviewFeatures, true)
  const { deviceSize } = useDeviceSize()
  const hasPhotos =
    !!galleryPreviewSleepingUrl &&
    !!galleryPreviewWorkingUrl &&
    !!galleryPreviewFeaturesUrl
  const bannerWidth = deviceSize === 'tablet' ? 610 : 998
  const bannerHeight = deviceSize === 'tablet' ? 256 : 420
  const galleryImageWidth = deviceSize === 'desktop' ? 26.9 : undefined
  const imageSizesString = '269px'

  return (
    <LocationContent>
      {bannerImageUrl && (
        <LocationBannerContainer>
          <LocationBanner
            priority
            src={bannerImageUrl}
            alt="Location Banner"
            width={bannerWidth}
            height={bannerHeight}
          />
        </LocationBannerContainer>
      )}

      <LocationDetailsContainer hasBanner={!!bannerImageUrl}>
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
                <span>
                  {offerCount} {offerCount === 1 ? 'Experience' : 'Experiences'}
                </span>
              </LocationHeaderInformation>
            </LocationHeaderTitle>

            <LocationHeaderHorizontalBar />

            <VotesContainer>
              <VotesAvatarContainer>
                <Caption>
                  {voteCount} {voteCount === 1 ? 'Vote' : 'Votes'}
                </Caption>
                <ProfilesCount profiles={voteProfiles} />
              </VotesAvatarContainer>

              <VoteButton variant="secondary" onClick={onVote}>
                <Icon name="chevron-up" size={1.6} />
              </VoteButton>
            </VotesContainer>
          </LocationHeader>
        </StyledContentCard>
      </LocationDetailsContainer>

      <GalleryPreviewContainer>
        {hasPhotos && (
          <GalleryPreviewList>
            <GalleryPreviewListImages>
              {galleryPreviewFeaturesUrl && (
                <StyledLink
                  key={LocationMediaCategory.Features}
                  href={`/location/${id}/photos?gallery=features`}
                >
                  <ImageFlex
                    sizes={imageSizesString}
                    alt={LocationMediaCategory.Features}
                    src={galleryPreviewFeaturesUrl}
                    width={galleryImageWidth}
                    aspectRatio={1}
                  />
                </StyledLink>
              )}
              {galleryPreviewSleepingUrl && (
                <StyledLink
                  key={LocationMediaCategory.Sleeping}
                  href={`/location/${id}/photos?gallery=sleeping`}
                >
                  <ImageFlex
                    sizes={imageSizesString}
                    alt={LocationMediaCategory.Sleeping}
                    src={galleryPreviewSleepingUrl}
                    width={galleryImageWidth}
                    aspectRatio={1}
                  />
                </StyledLink>
              )}
              {galleryPreviewWorkingUrl && (
                <StyledLink
                  key={LocationMediaCategory.Working}
                  href={`/location/${id}/photos?gallery=working`}
                >
                  <ImageFlex
                    sizes={imageSizesString}
                    alt={LocationMediaCategory.Working}
                    src={galleryPreviewWorkingUrl}
                    width={galleryImageWidth}
                    aspectRatio={1}
                  />
                </StyledLink>
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

      {!!offers.length && (
        <Section>
          <SectionHeader>
            <H3>Experience</H3>
          </SectionHeader>
          <ExperienceList offers={offers} />
        </Section>
      )}
      <Section>
        <SectionHeader>
          <H3>Description</H3>
        </SectionHeader>
        <SectionContent>
          <DescriptionTwoColumn>
            <DescriptionDetails>
              <SlateRenderer value={stringToSlateValue(description)} />

              <HorizontalBar />

              <InternetSpeed>
                <H4>Internet speed</H4>
                <Body1>
                  {internetSpeedMbps ? `${internetSpeedMbps} Mbps` : EMPTY}
                </Body1>
              </InternetSpeed>
            </DescriptionDetails>

            <CaretakerDetailsContainer>
              <CaretakerDetails>
                <ProfileContact
                  onContact={() => events.contactCaretakerEvent(caretaker._id)}
                  caretakerEmail={caretakerEmail}
                  profile={caretaker}
                />
              </CaretakerDetails>
            </CaretakerDetailsContainer>
          </DescriptionTwoColumn>
        </SectionContent>
      </Section>
    </LocationContent>
  )
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.yellow900};
`

const SectionContent = styled.div`
  padding: 2.4rem;
  padding-top: 3.2rem;
  display: flex;
  width: 100%;
`

const SectionHeader = styled.div`
  display: flex;
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.yellow900};
`

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
  width: 100%;

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
  z-index: -1;
  transform: translateX(-50%);
  left: 50%;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    top: -2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: calc(84rem + 2 * 8rem);
    top: 0;
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
  object-fit: cover;
  object-position: center;
  width: 100vw;
  height: 28rem;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 100%;
    height: 42rem;
  }
`

interface LocationDetailsContainerProps {
  hasBanner: boolean
}

const LocationDetailsContainer = styled.div<LocationDetailsContainerProps>`
  width: 100%;
  margin-top: ${({ hasBanner }) => (hasBanner ? '21rem' : '0')};

  ${({ theme }) => theme.bp.md} {
    margin-top: ${({ hasBanner }) => (hasBanner ? '20rem' : '0')};
  }

  ${({ theme }) => theme.bp.lg} {
    margin-top: ${({ hasBanner }) => (hasBanner ? '33rem' : '0')};
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
  }

  ${({ theme }) => theme.bp.lg_max} {
    grid-gap: 0.8rem;
  }

  ${({ theme }) => theme.bp.md_max} {
    grid-template-columns: repeat(1, 1fr);
  }
`

const GalleryPreviewButton = styled(Button)`
  padding: 1rem;
  position: absolute;
  z-index: 1;
  bottom: 2.4rem;
  right: 2.4rem;
`

const StyledLink = styled(Link)`
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

const InternetSpeed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${Body1} {
    opacity: 0.75;
  }
`
