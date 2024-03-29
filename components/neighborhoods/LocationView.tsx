import Link from 'next/link'
import { EMPTY } from '@/utils/display-utils'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationMediaCategory, LocationFragment } from '@/utils/types/location'
import { OfferListResponse, OfferType } from '@/utils/types/offer'
import { formatShortAddress } from '@/lib/address'
import { getImageUrlByIpfsHash, resolveImageUrl } from '@/lib/image'
import events from '@/lib/googleAnalytics/events'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import {
  Body1,
  Caption,
  H1,
  H3,
  H4,
  Overline,
} from '@/components/core/Typography'
import { SlateRenderer } from '../core/slate/SlateRenderer'
import { stringToSlateValue } from '../core/slate/slate-utils'
import { Tag } from '@/components/core/Tag'
import Icon from '@/components/core/Icon'
import { ProfileContact } from '@/components/core/ProfileContact'
import { ProfilesCount } from '@/components/core/ProfilesCount'
import { Button } from '@/components/core/Button'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { VoteButton } from './styles'
import { useProfile } from '@/components/auth/useProfile'
import { BannerHeader } from '@/components/neighborhoods/BannerHeader'
import { ExperienceList } from '@/components/offers/ExperienceList'
import { VERIFIED_VOTE_COUNT } from '@/components/neighborhoods/constants'

export const LocationView = ({
  location,
  onVote,
}: {
  location: LocationFragment
  onVote?: VoidFunction
}) => {
  const { externId, offerCount, mediaItems, caretaker, caretakerEmail } =
    location

  const { useGet } = useBackend()
  const { data: offerData } = useGet<OfferListResponse>(`OFFER_LIST`, {
    locationId: externId,
  })
  const offers = !offerData || 'error' in offerData ? [] : offerData.offers

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

  const galleryImageWidth = deviceSize === 'desktop' ? 26.9 : undefined
  const imageSizesString = '269px'

  const bookableOffers = offers.filter(
    (offer) =>
      (offer.endDate ?? '') >= new Date().toISOString().slice(0, 10) &&
      offer.type !== OfferType.Residency
  )

  const { user } = useProfile()
  const isEditable =
    user?.isAdmin || user?.externId === location.caretaker.externId

  return (
    <LocationContent>
      {location.bannerImageIpfsHash && (
        <BannerHeader
          imageUrl={getImageUrlByIpfsHash(location.bannerImageIpfsHash) ?? ''}
          reduceTopPad={1.8}
        />
      )}

      <LocationDetailsContainer>
        {(location.voteCount ?? 0) >= VERIFIED_VOTE_COUNT && (
          <LocationTypeTag
            label={'Verified'}
            color={'green400'}
            startAdornment={
              <Icon name={'logo-cabin'} size={1.8} color={'green400'} />
            }
          />
        )}

        <StyledContentCard shadow>
          <LocationHeader>
            <LocationHeaderTitle>
              <H1>{location.name ?? EMPTY}</H1>
              <LocationHeaderInformation>
                <span>{formatShortAddress(location.address) ?? EMPTY}</span>
                <span>Sleeps {location.sleepCapacity ?? EMPTY}</span>
                <span>
                  {offerCount} {offerCount === 1 ? 'Experience' : 'Experiences'}
                </span>
              </LocationHeaderInformation>
            </LocationHeaderTitle>

            <LocationHeaderHorizontalBar />

            <VotesContainer>
              <VotesAvatarContainer>
                <Caption>
                  {location.voteCount}{' '}
                  {location.voteCount === 1 ? 'Vote' : 'Votes'}
                </Caption>
                <ProfilesCount profiles={location.recentVoters ?? []} />
              </VotesAvatarContainer>

              <VoteButton variant="secondary" onClick={onVote}>
                <Icon name="chevron-up" size={1.6} />
              </VoteButton>
            </VotesContainer>
          </LocationHeader>
          {isEditable && (
            <EditBar>
              <Link href={`/location/${externId}/edit`}>
                <Button variant={'link'}>
                  <Icon name="pencil" size={1.2} />
                  <Overline>Edit Listing</Overline>
                </Button>
              </Link>
            </EditBar>
          )}
        </StyledContentCard>
      </LocationDetailsContainer>

      <GalleryPreviewContainer>
        {hasPhotos && (
          <GalleryPreviewList>
            <GalleryPreviewListImages>
              {galleryPreviewFeaturesUrl && (
                <StyledLink
                  key={LocationMediaCategory.Features}
                  href={`/location/${externId}/photos?gallery=features`}
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
                  href={`/location/${externId}/photos?gallery=sleeping`}
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
                  href={`/location/${externId}/photos?gallery=working`}
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

            <Link href={`/location/${externId}/photos`}>
              <GalleryPreviewButton variant="secondary">
                <Icon name="right-arrow" size={2.4} />
              </GalleryPreviewButton>
            </Link>
          </GalleryPreviewList>
        )}
      </GalleryPreviewContainer>

      {!!bookableOffers.length && (
        <Section>
          <SectionHeader>
            <H3>Experiences</H3>
          </SectionHeader>
          <ExperienceList
            offers={bookableOffers}
            actionButtonText={'Reserve'}
          />
        </Section>
      )}

      <Section>
        <SectionHeader>
          <H3>Description</H3>
        </SectionHeader>
        <SectionContent>
          <DescriptionTwoColumn>
            <DescriptionDetails>
              <SlateRenderer value={stringToSlateValue(location.description)} />

              <HorizontalBar />

              <InternetSpeed>
                <H4>Internet speed</H4>
                <Body1>
                  {location.internetSpeedMbps
                    ? `${location.internetSpeedMbps} Mbps`
                    : EMPTY}
                </Body1>
              </InternetSpeed>
            </DescriptionDetails>

            <CaretakerDetailsContainer>
              <CaretakerDetails>
                <ProfileContact
                  profile={caretaker}
                  caretakerEmail={caretakerEmail}
                  onContact={() =>
                    events.contactCaretakerEvent(caretaker.externId)
                  }
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
  border: 1px solid ${({ theme }) => theme.colors.green900};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.green900};
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

const EditBar = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  width: 100%;
  border-top: solid 1px ${({ theme }) => theme.colors.green900};
`

const LocationDetailsContainer = styled.div`
  width: 100%;
`

const StyledContentCard = styled(ContentCard)`
  flex-direction: column;
`

const LocationHeader = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.6rem;
  justify-content: space-between;
  width: 100%;
  padding: 3.2rem 2.4rem;

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
