import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useModal } from '@/components/hooks/useModal'
import Icon from '@/components/core/Icon'
import { getImageUrlByIpfsHash, TempImage } from '@/lib/image'
import { stringToSlateValue } from '../core/slate/slate-utils'
import { EMPTY, formatRange } from '@/utils/display-utils'
import {
  Body1,
  body1Styles,
  Caption,
  H3,
  H4,
} from '@/components/core/Typography'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import { Button } from '@/components/core/Button'
import { SlateRenderer } from '../core/slate/SlateRenderer'
import { ImageFlex } from '../core/gallery/ImageFlex'
import { ApplyButton } from '@/components/offers/ApplyButton'
import { Price } from '@/components/offers/Price'
import { ImageBrowserModal } from '@/components/core/gallery/ImageBrowserModal'
import { BannerHeader } from '@/components/neighborhoods/BannerHeader'
import { LocationLinkCard } from '@/components/neighborhoods/LinkCards'
import { HostCard } from '@/components/neighborhoods/HostCard'
import { isAfter, isBefore } from 'date-fns'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { OfferNameAndDates } from '@/components/offers/OfferNameAndDates'
import { OfferFragment, OfferType } from '@/utils/types/offer'
import { isProd, isVercelDev } from '@/utils/dev'

export const OfferView = ({
  offer,
  isEditable,
}: {
  offer: OfferFragment
  isEditable: boolean
}) => {
  const router = useRouter()
  const { showModal } = useModal()
  const { deviceSize } = useDeviceSize()

  if (!offer.type) return null

  const galleryImages = (offer.mediaItems ?? []).map((image) => ({
    ...image,
    name: `${image.ipfsHash}`,
  }))

  const handleImageClick = (image: TempImage) => {
    // TODO: looks broken on mobile
    // if (deviceSize === 'mobile') {
    //   return
    // }

    if (!galleryImages) {
      return
    }

    const index = galleryImages.findIndex(
      (img) => img.ipfsHash === image.ipfsHash
    )

    showModal(() => (
      <ImageBrowserModal images={galleryImages} initialImageIndex={index} />
    ))
  }

  return (
    <>
      {offer.imageIpfsHash && deviceSize !== 'mobile' && (
        <BannerHeader
          imageUrl={getImageUrlByIpfsHash(offer.imageIpfsHash) ?? ''}
        />
      )}

      <TitleCard
        title={'Experience'}
        icon="offer"
        end={
          isEditable ? (
            <Button
              variant={'link-slim'}
              onClick={() => {
                router.push(`/experience/${offer.externId}/edit`).then()
              }}
            >
              <Icon name="pencil" size={1.2} />
              EDIT
            </Button>
          ) : null
        }
      />

      <StyledContentCard shape="notch" notchSize={1.6}>
        <DescriptionTwoColumn>
          <Left>
            {/*TODO: show arrow when there are multiple images in gallery */}
            {/*TODO: make this image square */}
            {galleryImages?.length > 0 && (
              <GalleryImage
                src={getImageUrlByIpfsHash(galleryImages[0].ipfsHash) ?? ''}
                onClick={() => handleImageClick(galleryImages[0])}
                aspectRatio={1.5}
                fill
                sizes="451px"
                alt={'Click for image gallery'}
                style={{ cursor: 'pointer' }}
              />
            )}
            <LocationLinkCard location={offer.location} />
            <H4>Description</H4>
            <SlateRenderer value={stringToSlateValue(offer.description)} />
            <H4>Meet your hosts</H4>
            {_getHostIds(offer).map((hostId) => (
              <HostCard key={hostId} externId={hostId}></HostCard>
            ))}
          </Left>

          <Right>
            <RightContent>
              <OfferNameAndDates
                offer={offer}
                withPrice={offer.type === OfferType.PaidColiving}
              />

              {offer.type == OfferType.CabinWeek && offer.price && (
                <Price
                  price={offer.price}
                  priceInterval={offer.priceInterval}
                />
              )}

              <Actions>
                <ApplyButton offer={offer} />
              </Actions>
            </RightContent>

            {offer.type !== OfferType.CabinWeek && (
              <DetailsSection>
                <H3>AVAILABILITY</H3>

                <Pricing>
                  <Caption>
                    {formatRange(
                      new Date(offer.startDate),
                      new Date(offer.endDate)
                    )}
                  </Caption>
                  {offer.price ? (
                    <Price
                      small
                      price={offer.price}
                      priceInterval={offer.priceInterval}
                    />
                  ) : (
                    EMPTY
                  )}
                </Pricing>
              </DetailsSection>
            )}
          </Right>
        </DescriptionTwoColumn>
      </StyledContentCard>
    </>
  )
}

const _getHostIds = (offer: OfferFragment): string[] => {
  const charlie = isProd
    ? '362368728841584721'
    : isVercelDev
    ? '359768139021418582'
    : '373424375382147584'

  const gatherer =
    offer.type !== OfferType.CabinWeek ||
    !offer.startDate ||
    isAfter(new Date(offer.startDate), new Date('2024-012-01')) ||
    isBefore(new Date(offer.startDate), new Date('2023-12-01'))
      ? ''
      : charlie

  return [offer.location.caretaker.externId, gatherer].filter((i) => !!i)
}

const StyledContentCard = styled(ContentCard)`
  padding: 3.2rem 2.4rem;
  margin-top: 1.6rem;
`

const DescriptionTwoColumn = styled.div`
  display: flex;
  flex-flow: row;
  gap: 3.2rem;
  width: 100%;

  ${({ theme }) => theme.bp.lg_max} {
    flex-flow: column;
  }
`

const Left = styled.div`
  display: flex;
  position: relative;
  flex-flow: column;
  gap: 2.4rem;
  width: 45.1rem;

  ${Body1} {
    opacity: 0.75;
  }

  ${({ theme }) => theme.bp.md_max} {
    width: 100%;
  }

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
    order: 2;
    padding-left: 0;
    padding-top: 3.2rem;
  }

  section {
    display: flex;
    flex-flow: column;
    gap: 2.4rem;
  }

  ul {
  }

  li {
    ${body1Styles}
    margin-left: 1.6rem;
    padding-left: 0.8rem;
  }
`

const GalleryImage = styled(ImageFlex)`
  margin-bottom: 2rem;
`

const Right = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;
  flex-grow: 1;

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
    order: 1;
  }
`

const RightContent = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;
  padding-left: 0;

  ${({ theme }) => theme.bp.lg} {
    padding-left: 3.2rem;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
  margin-bottom: 2rem;
`

const DetailsSection = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.6rem;
`

const Pricing = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1.6rem;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => theme.bp.lg_max} {
    width: 28.5rem;
  }

  ${({ theme }) => theme.bp.md_max} {
    width: 100%;
  }
`
