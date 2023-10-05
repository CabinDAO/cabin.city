import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useModal } from '@/components/hooks/useModal'
import {
  OfferPrice,
  OfferType,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'
import { OfferViewProps } from './useGetOffer'
import Icon from '@/components/core/Icon'
import { getImageUrlByIpfsHash, TempImage } from '@/lib/image'
import { stringToSlateValue } from '../core/slate/slate-utils'
import { offerInfoFromType, RoleConstraintType } from '@/utils/offer'
import { isNotNull } from '@/lib/data'
import { daysBetween, formatRange } from '@/utils/display-utils'
import { roleConstraintInfoFromType } from '@/utils/roles'
import {
  Body1,
  body1Styles,
  Caption,
  H1,
  H3,
  H4,
  H5,
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
import { HorizontalDivider } from '@/components/core/Divider'
import { MEMBERSHIP_PRICE_DOLLARS } from '@/components/checkout/constants'
import { ImageBrowserModal } from '@/components/core/gallery/ImageBrowserModal'
import { CitizenshipModal } from '@/components/landing/CitizenshipModal'
import { BannerHeader } from '@/components/neighborhoods/BannerHeader'
import { LocationLink } from '@/components/neighborhoods/LocationLink'
import Link from 'next/link'
import { HostCard } from '@/components/neighborhoods/HostCard'
import { isAfter, isBefore } from 'date-fns'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

const EMPTY = '—'

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
    location,
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

  const offerInfo = offerType ? offerInfoFromType(offerType) : null
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

  const galleryImages = (mediaItems ?? []).map((image) => ({
    ...image,
    name: `${image.ipfsHash}`,
  }))

  const handleCitizenshipInfoClick = () => {
    showModal(() => <CitizenshipModal />)
  }

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
          <DescriptionDetails>
            {galleryImages && (
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
            <LocationLink location={offer.location} />
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
              <Link href={'mailto:home@cabin.city'}>home@cabin.city</Link> for
              more information.
            </Body1>
          </DescriptionDetails>

          <OfferDetailsContainer>
            <OfferDetails>
              <OfferDetailsHeader>
                <OfferDetailsOverview>
                  <H5>{formatRange(startDate, endDate)}</H5>
                  <H1>{offerInfo?.name ?? EMPTY}</H1>
                  <Location>
                    {offerType == OfferType.CabinWeek && offer.price && (
                      <>
                        {daysBetween(startDate, endDate)} nights {''}
                      </>
                    )}
                    in {location.shortAddress}
                  </Location>
                  <Price price={offer.price as OfferPrice} />
                </OfferDetailsOverview>

                {offerType == OfferType.CabinWeek && offer.price && (
                  <OfferCabinWeekDetailsSection>
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
                  </OfferCabinWeekDetailsSection>
                )}

                <Actions>
                  <ApplyButton
                    offer={offer}
                    lodgingType={selectedLodgingType}
                  />
                  <Caption emphasized>You won’t be charged yet</Caption>
                </Actions>

                <CostBreakdown>
                  <CostLine>
                    <Caption emphasized>
                      {daysBetween(startDate, endDate)} nights
                    </Caption>
                    <Caption emphasized>
                      ${(offer.price?.amountCents ?? 0) / 100}
                    </Caption>
                  </CostLine>
                  <CostLine>
                    <Caption emphasized>
                      1yr Cabin Citizenship{' '}
                      <a
                        onClick={handleCitizenshipInfoClick}
                        style={{ cursor: 'pointer' }}
                      >
                        <Icon name={'info'} size={1.2} inline />
                      </a>
                    </Caption>
                    <Caption emphasized>${MEMBERSHIP_PRICE_DOLLARS}</Caption>
                  </CostLine>
                  <CostLine>
                    <Caption emphasized>Cabin Week Discount</Caption>
                    <Caption emphasized $color={'green700'}>
                      -${MEMBERSHIP_PRICE_DOLLARS}
                    </Caption>
                  </CostLine>
                  <HorizontalDivider />
                  <CostLine>
                    <H4>Total</H4>
                    <H4>${(offer.price?.amountCents ?? 0) / 100}</H4>
                  </CostLine>
                </CostBreakdown>
              </OfferDetailsHeader>

              {offerType !== OfferType.CabinWeek && (
                <OfferDetailsSection>
                  <H3>AVAILABILITY</H3>

                  <OfferDetailsPricing>
                    <Caption>{formatRange(startDate, endDate)}</Caption>
                    {price ? <Price small price={price} /> : EMPTY}
                  </OfferDetailsPricing>
                </OfferDetailsSection>
              )}

              {(displayMatchAll ||
                displayMatchOne ||
                offerType === OfferType.PaidColiving) && (
                <OfferDetailsSection>
                  <EligibilityDisplay
                    rolesMatchOne={rolesMatchOne}
                    displayMatchAll={displayMatchAll}
                    displayMatchOne={displayMatchOne}
                    citizenshipRequired={!!citizenshipRequired}
                    minimunCabinBalance={minimunCabinBalance}
                  />
                </OfferDetailsSection>
              )}
            </OfferDetails>
          </OfferDetailsContainer>
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

const DescriptionDetails = styled.div`
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

  > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1.6rem;
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

const OfferDetailsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;
  flex-grow: 1;

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
    order: 1;
  }
`

const OfferDetails = styled.div`
  display: flex;
  flex-flow: column;
  padding-left: 3.2rem;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg_max} {
    padding-left: 0;
  }
`

const OfferDetailsHeader = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg_max} {
    flex-flow: row;
  }

  ${({ theme }) => theme.bp.md_max} {
    flex-flow: column;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
`

const OfferDetailsOverview = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.4rem;

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
  }
`

const OfferDetailsSection = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.6rem;
`

const OfferCabinWeekDetailsSection = styled.div`
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

const OfferDetailsPricing = styled.div`
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

const Location = styled(Caption)`
  line-height: 1.6;
  margin-bottom: 1rem;
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

const CostBreakdown = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2.4rem;
  margin-top: 2.4rem;
`

const CostLine = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
