import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useModal } from '@/components/hooks/useModal'
import {
  OfferPrice,
  OfferPriceUnit,
  OfferType,
  ProfileRoleLevelType,
  ProfileRoleType,
  Scalars,
} from '@/generated/graphql'
import { OfferViewProps } from './useGetOffer'
import Icon from '@/components/core/Icon'
import { getImageUrlByIpfsHash, TempImage } from '@/lib/image'
import { stringToSlateValue } from '../core/slate/slate-utils'
import { RoleConstraintType } from '@/utils/offer'
import { isNotNull } from '@/lib/data'
import { EMPTY, formatRange } from '@/utils/display-utils'
import { roleConstraintInfoFromType } from '@/utils/roles'
import {
  Body1,
  body1Styles,
  Caption,
  H3,
  H4,
  Subline1,
} from '@/components/core/Typography'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import { Button } from '@/components/core/Button'
import { SlateRenderer } from '../core/slate/SlateRenderer'
import { EligibilityDisplay } from './EligibilityDisplay'
import { ImageFlex } from '../core/gallery/ImageFlex'
import { ApplyButton } from '@/components/offers/ApplyButton'
import { Price } from '@/components/offers/Price'
import { ImageBrowserModal } from '@/components/core/gallery/ImageBrowserModal'
import { BannerHeader } from '@/components/neighborhoods/BannerHeader'
import { LocationLinkCard } from '@/components/neighborhoods/LinkCards'
import Link from 'next/link'
import { HostCard } from '@/components/neighborhoods/HostCard'
import { isAfter, isBefore } from 'date-fns'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { CostBreakdown } from '@/components/checkout/CostBreakdown'
import { OfferNameAndDates } from '@/components/offers/OfferNameAndDates'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const OfferView = ({
  offer,
  isEditable,
}: {
  offer: OfferViewProps
  isEditable: boolean
}) => {
  const router = useRouter()
  const { showModal } = useModal()
  const { deviceSize } = useDeviceSize()

  const {
    description,
    offerType,
    startDate,
    endDate,
    price,
    profileRoleConstraints,
    citizenshipRequired,
    minimunCabinBalance,
    imageUrl,
    mediaItems,
  } = offer

  if (!offerType) return null

  const levelsByRole = profileRoleConstraints?.reduce(
    (acc, { profileRole, level }) => ({
      ...acc,
      [profileRole]: acc[profileRole] ? [...acc[profileRole], level] : [level],
    }),
    {} as Record<ProfileRoleType, ProfileRoleLevelType[]>
  )

  const rolesMatchOne = (Object.keys(levelsByRole ?? {}) ?? [])
    .flatMap(
      (profileRole): RoleConstraintType | RoleConstraintType[] | null => {
        if (!levelsByRole) return null

        if (levelsByRole[profileRole as ProfileRoleType].length === 3) {
          return roleConstraintInfoFromType({
            profileRole: profileRole as ProfileRoleType,
            level: ProfileRoleLevelType.Apprentice,
            hideLevel: true,
          })
        } else {
          return levelsByRole[profileRole as ProfileRoleType].map((level) =>
            roleConstraintInfoFromType({
              profileRole: profileRole as ProfileRoleType,
              level,
            })
          )
        }
      }
    )
    .filter(isNotNull) as RoleConstraintType[]

  const displayMatchOne = rolesMatchOne.length > 0
  const displayMatchAll = citizenshipRequired || (minimunCabinBalance ?? 0) > 0

  // TODO: let them actually select one
  const selectedLodgingType = offer.location.lodgingTypes.data[0]
  const isSoldOut =
    selectedLodgingType &&
    selectedLodgingType.spotsTaken >= selectedLodgingType.quantity

  const galleryImages = (mediaItems ?? []).map((image) => ({
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
      {imageUrl && deviceSize !== 'mobile' && (
        <BannerHeader imageUrl={imageUrl} />
      )}

      <TitleCard
        title={'Experience'}
        icon="offer"
        end={
          isEditable ? (
            <Button
              variant={'link-slim'}
              onClick={() => {
                router.push(`/experience/${offer._id}/edit`)
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
            <SlateRenderer value={stringToSlateValue(description)} />
            <H4>Meet your hosts</H4>
            {_getHostIds(offer).map((hostId) => (
              <HostCard key={hostId} profileId={hostId}></HostCard>
            ))}
            <H4>Cancellation policy</H4>
            <Body1>
              For a full refund, guests must cancel within 48 hours of booking
              and at least 28 days before check-in. Email{' '}
              <Link href={`mailto:${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}`}>
                {EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}
              </Link>{' '}
              for more information.
            </Body1>
          </Left>

          <Right>
            <RightContent>
              <OfferNameAndDates
                offer={offer}
                withPrice={offerType === OfferType.PaidColiving}
              />

              {offerType == OfferType.CabinWeek && offer.price && (
                <>
                  {/* TODO: HUGE HACK TILL WE FINISH MIGRATING TO LODGING TYPES */}
                  <Price
                    price={
                      {
                        unit: offer.price.unit,
                        amountCents: selectedLodgingType.priceCents,
                      } as OfferPrice
                    }
                  />
                  <CabinWeekDetails>
                    <Subline1>Accomodations</Subline1>
                    {offer.location.lodgingTypes.data.map((lt) => {
                      return (
                        <LodgingType key={lt._id}>
                          <LodgingTypeTop>
                            <Subline1>{lt.description}</Subline1>
                            {/*<Caption>${lt.priceCents / 100} / night</Caption>*/}
                          </LodgingTypeTop>
                          <Caption>
                            {Math.max(0, lt.quantity - lt.spotsTaken)} available
                          </Caption>
                        </LodgingType>
                      )
                    })}
                  </CabinWeekDetails>
                </>
              )}

              <Actions>
                <ApplyButton offer={offer} lodgingType={selectedLodgingType} />
                <Caption emphasized>You won’t be charged yet</Caption>
              </Actions>

              {offerType == OfferType.CabinWeek &&
                selectedLodgingType &&
                !isSoldOut && (
                  <CostBreakdown
                    lodgingType={selectedLodgingType}
                    startDate={startDate ?? null}
                    endDate={endDate ?? null}
                  />
                )}
            </RightContent>

            {offerType !== OfferType.CabinWeek && (
              <DetailsSection>
                <H3>AVAILABILITY</H3>

                <Pricing>
                  <Caption>{formatRange(startDate, endDate)}</Caption>
                  {price ? <Price small price={price} /> : EMPTY}
                </Pricing>
              </DetailsSection>
            )}

            {(displayMatchAll ||
              displayMatchOne ||
              offerType === OfferType.PaidColiving) && (
              <DetailsSection>
                <EligibilityDisplay
                  rolesMatchOne={rolesMatchOne}
                  displayMatchAll={displayMatchAll}
                  displayMatchOne={displayMatchOne}
                  citizenshipRequired={!!citizenshipRequired}
                  minimunCabinBalance={minimunCabinBalance}
                />
              </DetailsSection>
            )}
          </Right>
        </DescriptionTwoColumn>
      </StyledContentCard>
    </>
  )
}

const _getHostIds = (offer: OfferViewProps): string[] => {
  const charlie =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? '362368728841584721'
      : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
      ? '359768139021418582'
      : '373424375382147584'

  const gatherer =
    offer.offerType !== OfferType.CabinWeek ||
    !offer.startDate ||
    isAfter(offer.startDate, new Date('2024-012-01')) ||
    isBefore(offer.startDate, new Date('2023-12-01'))
      ? ''
      : charlie

  return [offer.location.caretaker._id, gatherer].filter((i) => !!i)
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

const CabinWeekDetails = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.6rem;

  h1 {
    font-size: 3.2rem;
    small {
      font-size: 1.3rem;
      font-weight: 400;
      //color: ${({ theme }) => theme.colors.green900};
    }
  }
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

const LodgingType = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.3rem;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.green900}12; // green900 at 12% opacity
`

const LodgingTypeTop = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
