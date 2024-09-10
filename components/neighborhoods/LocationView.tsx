import Link from 'next/link'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { useBackend } from '@/components/hooks/useBackend'
import {
  LocationMediaCategory,
  LocationGetResponse,
} from '@/utils/types/location'
import { canEditLocation } from '@/lib/permissions'
import { formatShortAddress } from '@/lib/address'
import { cloudflareImageUrl } from '@/lib/image'
import styled from 'styled-components'
import { EMPTY } from '@/utils/display-utils'
import { ContentCard } from '@/components/core/ContentCard'
import { Body1, Caption, H1, H3, Overline } from '@/components/core/Typography'
import { SlateRenderer } from '@/components/core/slate/SlateRenderer'
import { stringToSlateValue } from '@/components/core/slate/slate-utils'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { useProfile } from '@/components/auth/useProfile'
import { BannerHeader } from '@/components/neighborhoods/BannerHeader'
import { StewardContact } from '@/components/core/StewardContact'
import { EmptyState } from '@/components/core/EmptyState'
import { padding } from '@/styles/theme'
import { VISIBILITY_FIELD_ID } from '@/components/neighborhoods/LocationEditForm'

export const LocationView = ({ externId }: { externId: string }) => {
  const { useGet } = useBackend()

  const { data } = useGet<LocationGetResponse>(
    externId ? ['LOCATION', { externId: externId as string }] : null
  )
  const location = !data || 'error' in data ? null : data.location

  const galleryPreviewUrls =
    location && location.mediaItems.length > 0
      ? location.mediaItems
          .slice(0, 3)
          .map((mi) => cloudflareImageUrl(mi.cfId))
          .filter((value): value is string => value !== null)
      : []

  const { deviceSize } = useDeviceSize()
  const hasPhotos = galleryPreviewUrls.length > 0
  const galleryImageWidth = deviceSize === 'desktop' ? 26.8 : undefined
  const imageSizesString = '268px'

  const { user, isUserLoading } = useProfile()
  const isEditable = !!location && canEditLocation(user, location)

  if (!location || isUserLoading) {
    return null
  }

  if (!location.publishedAt && !isEditable) {
    return (
      <EmptyState
        icon="mountain"
        title="Oops, page not found"
        description="This page doesn’t exist or was removed!"
        customCta={() => (
          <Link href="/">
            <Button variant="secondary">Return home</Button>
          </Link>
        )}
      />
    )
  }

  return (
    <LocationContent>
      {location.bannerImageCfId && (
        <BannerHeader
          imageUrl={cloudflareImageUrl(location.bannerImageCfId)}
          reduceTopPad={1.8}
        />
      )}

      <LocationDetailsContainer>
        <StyledContentCard shadow>
          <LocationHeader>
            <LocationHeaderTitle>
              <H1>{location.name ?? EMPTY}</H1>
              <LocationHeaderInformation>
                <span>{formatShortAddress(location.address) ?? EMPTY}</span>
              </LocationHeaderInformation>
            </LocationHeaderTitle>
          </LocationHeader>

          {isEditable && (
            <EditBar>
              <Link href={`/location/${location.externId}/edit`}>
                <Button variant={'link'}>
                  <Icon name="pencil" size={1.2} />
                  <Overline>Edit</Overline>
                </Button>
              </Link>
            </EditBar>
          )}
        </StyledContentCard>
      </LocationDetailsContainer>

      {!location.publishedAt && (
        <Banner>
          <Body1>
            Only you can see this page.{' '}
            <Link
              href={`/location/${location.externId}/edit#${VISIBILITY_FIELD_ID}`}
              style={{ textDecoration: 'underline' }}
            >
              Make it public
            </Link>{' '}
            when you're ready.
          </Body1>
        </Banner>
      )}

      {hasPhotos && (
        <GalleryPreviewContainer>
          <GalleryPreviewList>
            <GalleryPreviewListImages>
              {galleryPreviewUrls.map((url, i) => (
                <StyledLink
                  key={i}
                  href={`/location/${location.externId}/photos`}
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

            <Link href={`/location/${location.externId}/photos`}>
              <GalleryPreviewButton variant="secondary">
                <Icon name="right-arrow" size={2.4} />
              </GalleryPreviewButton>
            </Link>
          </GalleryPreviewList>
        </GalleryPreviewContainer>
      )}

      <Section>
        <SectionHeader>
          <H3>About</H3>
        </SectionHeader>
        <AboutContent>
          <SlateRenderer value={stringToSlateValue(location.description)} />
          <StewardContainer>
            <StewardDetails>
              <StewardContact steward={location.steward} location={location} />
            </StewardDetails>
          </StewardContainer>
        </AboutContent>
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

const SectionHeader = styled.div`
  display: flex;
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green900};
  justify-content: space-between;
`

const AboutContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.2rem 2.4rem 2.4rem;
`

const StewardContainer = styled.div`
  width: 100%;
  padding-top: 2.4rem;
  border-top: 1px solid ${({ theme }) => theme.colors.green900}1e;
`

const StewardDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4em;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
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
  grid-gap: 1.5rem;

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

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 2.4rem;
  background: ${({ theme }) => theme.colors.yellow300};
  ${padding('sm')};

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`
