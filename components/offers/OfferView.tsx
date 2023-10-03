import styled from 'styled-components'
import { offerInfoFromType, RoleConstraintType } from '@/utils/offer'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import {
  body1Styles,
  Caption,
  H1,
  H3,
  H4,
  H5,
  Subline1,
} from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { roleConstraintInfoFromType } from '@/utils/roles'
import { OfferViewProps } from './useGetOffer'
import { SlateRenderer } from '../core/slate/SlateRenderer'
import { stringToSlateValue } from '../core/slate/slate-utils'
import {
  OfferPrice,
  OfferType,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'
import { isNotNull } from '@/lib/data'
import { daysBetween, formatRange } from '@/utils/display-utils'
import { EligibilityDisplay } from './EligibilityDisplay'
import { ImageFlex } from '../core/gallery/ImageFlex'
import { useRouter } from 'next/router'
import { ApplyButton } from '@/components/offers/ApplyButton'
import Icon from '@/components/core/Icon'
import { Price } from '@/components/offers/Price'
import { HorizontalDivider } from '@/components/core/Divider'
import { MEMBERSHIP_PRICE_DOLLARS } from '@/components/checkout/constants'

const EMPTY = '—'

export const OfferView = ({
  offer,
  isEditable,
}: {
  offer: OfferViewProps
  isEditable: boolean
}) => {
  const {
    title,
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
  } = offer
  const offerInfo = offerType ? offerInfoFromType(offerType) : null
  const levelsByRole = profileRoleConstraints?.reduce(
    (acc, { profileRole, level }) => ({
      ...acc,
      [profileRole]: acc[profileRole] ? [...acc[profileRole], level] : [level],
    }),
    {} as Record<ProfileRoleType, ProfileRoleLevelType[]>
  )
  const router = useRouter()

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

  if (!offerType) return null

  return (
    <>
      <TitleCard
        title={title ?? EMPTY}
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
            {imageUrl && (
              <ImageFlex
                aspectRatio={1.5}
                fill
                sizes="451px"
                src={imageUrl}
                alt={title ?? ''}
              />
            )}
            <SlateRenderer value={stringToSlateValue(description)} />
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
                  <ApplyButton offer={offer} />
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
                      <Icon name={'info'} size={1.2} inline />
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

  ${({ theme }) => theme.bp.md_max} {
    width: 100%;
  }

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
    order: 2;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.green900}1e;
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
  border-left: 1px solid ${({ theme }) => theme.colors.green900}1e;

  ${({ theme }) => theme.bp.lg_max} {
    border-left: none;
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
  border: solid 1px rgba(29, 43, 42, 0.12); // green900 at 12% opacity
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
