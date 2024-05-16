import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { EMPTY } from '@/utils/display-utils'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationMediaCategory, LocationFragment } from '@/utils/types/location'
import {
  OfferListResponse,
  OfferNewParams,
  OfferNewResponse,
  OfferType,
} from '@/utils/types/offer'
import { formatShortAddress } from '@/lib/address'
import { getImageUrlByIpfsHash, resolveImageUrl } from '@/lib/image'
import events from '@/lib/googleAnalytics/events'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { Body1, Caption, H1, H3, Overline } from '@/components/core/Typography'
import { SlateRenderer } from '../core/slate/SlateRenderer'
import { stringToSlateValue } from '../core/slate/slate-utils'
import { Tag } from '@/components/core/Tag'
import Icon from '@/components/core/Icon'
import { ProfileContact } from '@/components/core/ProfileContact'
import { ProfilesCount } from '@/components/core/ProfilesCount'
import { Button } from '@/components/core/Button'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { useProfile } from '@/components/auth/useProfile'
import { BannerHeader } from '@/components/neighborhoods/BannerHeader'
import { ExperienceList } from '@/components/offers/ExperienceList'

export const LocationView = ({ location }: { location: LocationFragment }) => {
  const { externId, mediaItems } = location

  const router = useRouter()
  const { useGet, useMutate } = useBackend()
  const { data: offerData } = useGet<OfferListResponse>(`OFFER_LIST`, {
    locationId: location.externId,
  })
  const offers = !offerData || 'error' in offerData ? [] : offerData.offers

  const { trigger: createOffer } = useMutate<OfferNewResponse>('OFFER_NEW')
  const handleNewEventClick = async () => {
    const data = await createOffer({
      locationExternId: location.externId,
      offerType: OfferType.PaidColiving, // TODO: get rid of offer types completely
    } as OfferNewParams)

    if ('offerExternId' in data) {
      router.push(`/experience/${data.offerExternId}/edit`).then(null)
    }
  }

  const galleryPreviewUrls =
    mediaItems.length > 0
      ? mediaItems
          .slice(0, 3)
          .map((mi) => resolveImageUrl(mi, true))
          .filter((value): value is string => value !== null)
      : []

  const { deviceSize } = useDeviceSize()
  const hasPhotos = galleryPreviewUrls.length > 0
  const galleryImageWidth = deviceSize === 'desktop' ? 26.9 : undefined
  const imageSizesString = '269px'

  const [bookableOffersOnly, setBookableOffersOnly] = useState(true)
  const bookableOffers = bookableOffersOnly
    ? offers.filter(
        (offer) =>
          (offer.endDate ?? '') >= new Date().toISOString().slice(0, 10) &&
          offer.type !== OfferType.Residency
      )
    : offers

  const { user } = useProfile()
  const isEditable =
    user?.isAdmin || user?.externId === location.steward.externId

  return (
    <LocationContent>
      {location.bannerImageIpfsHash && (
        <BannerHeader
          imageUrl={getImageUrlByIpfsHash(location.bannerImageIpfsHash) ?? ''}
          reduceTopPad={1.8}
        />
      )}

      <LocationDetailsContainer>
        {location.steward.externId && (
          <LocationTypeTag
            label={'Active'}
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
                {location.offerCount > 0 && (
                  <span>
                    {location.offerCount}{' '}
                    {location.offerCount === 1 ? 'Event' : 'Events'}
                  </span>
                )}
              </LocationHeaderInformation>
            </LocationHeaderTitle>

            <LocationHeaderHorizontalBar />

            <MembersContainer>
              <Members>
                <Caption>
                  {location.memberCount}{' '}
                  {location.memberCount === 1 ? 'Member' : 'Members'}
                </Caption>
                <ProfilesCount profiles={location.recentMembers ?? []} />
              </Members>
            </MembersContainer>
          </LocationHeader>

          {isEditable && (
            <EditBar>
              <Link href={`/location/${externId}/edit`}>
                <Button variant={'link'}>
                  <Icon name="pencil" size={1.2} />
                  <Overline>Edit</Overline>
                </Button>
              </Link>
              <Button variant={'link'} onClick={handleNewEventClick}>
                <Icon name="plus" size={1.2} />
                <Overline>New Event</Overline>
              </Button>
            </EditBar>
          )}
        </StyledContentCard>
      </LocationDetailsContainer>

      <GalleryPreviewContainer>
        {hasPhotos && (
          <GalleryPreviewList>
            <GalleryPreviewListImages>
              {galleryPreviewUrls.map((url) => (
                <StyledLink
                  key={LocationMediaCategory.Features}
                  href={`/location/${externId}/photos`}
                >
                  <ImageFlex
                    sizes={imageSizesString}
                    alt={LocationMediaCategory.Features}
                    src={url}
                    width={galleryImageWidth}
                    aspectRatio={1}
                  />
                </StyledLink>
              ))}
            </GalleryPreviewListImages>

            <Link href={`/location/${externId}/photos`}>
              <GalleryPreviewButton variant="secondary">
                <Icon name="right-arrow" size={2.4} />
              </GalleryPreviewButton>
            </Link>
          </GalleryPreviewList>
        )}
      </GalleryPreviewContainer>

      <Section>
        <SectionHeader>
          <H3>Description</H3>
        </SectionHeader>
        <SectionContent>
          <DescriptionTwoColumn>
            <DescriptionDetails>
              <SlateRenderer value={stringToSlateValue(location.description)} />
            </DescriptionDetails>

            <StewardDetailsContainer>
              <StewardDetails>
                <ProfileContact
                  profile={location.steward}
                  onContact={() =>
                    events.contactStewardEvent(location.steward.externId)
                  }
                />
              </StewardDetails>
            </StewardDetailsContainer>
          </DescriptionTwoColumn>
        </SectionContent>
      </Section>

      {(bookableOffers.length > 0 || (isEditable && offers.length > 0)) && (
        <Section>
          <SectionHeader>
            <H3>Events</H3>
            {isEditable && (
              <Button
                variant={'link-slim'}
                onClick={() => setBookableOffersOnly(!bookableOffersOnly)}
              >
                {bookableOffersOnly ? 'Show Past Events' : 'Active Events Only'}
              </Button>
            )}
          </SectionHeader>
          <ExperienceList
            offers={bookableOffers}
            actionButtonText={'Reserve'}
            isEditable={isEditable}
          />
        </Section>
      )}
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
  justify-content: space-between;
`

const LocationTypeTag = styled(Tag)`
  border-radius: 0.8rem 0 0 0;
`

const StewardDetailsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;
  width: 28.5rem;
  flex-shrink: 0;

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
  }
`

const StewardDetails = styled.div`
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

const MembersContainer = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1.6rem;
  justify-content: end;
`

const Members = styled.div`
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
