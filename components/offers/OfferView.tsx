import styled from 'styled-components'
import { formatOfferPrice, offerInfoFromType } from '@/utils/offer'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import {
  Caption,
  H2,
  H3,
  Subline2,
  body1Styles,
} from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import Icon, { IconName } from '@/components/core/Icon'
import { roleConstraintInfoFromType } from '@/utils/roles'
import { OfferViewProps } from './useGetOffer'
import { SlateRenderer } from '../core/slate/SlateRenderer'
import { stringToSlateValue } from '../core/slate/slate-utils'
import { useOfferApply } from '../hooks/useOfferApply'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { isNotNull } from '@/lib/data'
import { formatRange, formatUrl } from '@/utils/display-utils'

const EMPTY = '—'

export const OfferView = ({ offer }: { offer: OfferViewProps }) => {
  const {
    title,
    description,
    offerType,
    location,
    applicationUrl,
    startDate,
    endDate,
    price,
    profileRoleConstraints,
    citizenshipRequired,
    minimunCabinBalance,
  } = offer
  const offerInfo = offerType ? offerInfoFromType(offerType) : null
  const levelsByRole = profileRoleConstraints?.reduce(
    (acc, { profileRole, level }) => ({
      ...acc,
      [profileRole]: acc[profileRole] ? [...acc[profileRole], level] : [level],
    }),
    {} as Record<ProfileRoleType, ProfileRoleLevelType[]>
  )

  type RoleConstraintType = {
    constraintName: string
    iconName: IconName
  }

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

  const { canApply } = useOfferApply(offer)

  const applyUrl = canApply() ? formatUrl(applicationUrl) : null

  const displayMatchOne = rolesMatchOne.length > 0
  const displayMatchAll = citizenshipRequired || (minimunCabinBalance ?? 0) > 0

  return (
    <>
      <TitleCard title={title ?? EMPTY} icon="offer" />

      <StyledContentCard shape="notch" notchSize={1.6}>
        <DescriptionTwoColumn>
          <DescriptionDetails>
            <SlateRenderer value={stringToSlateValue(description)} />
          </DescriptionDetails>

          <OfferDetailsContainer>
            <OfferDetails>
              <OfferDetailsHeader>
                <OfferDetailsOverview>
                  <H2>{offerInfo?.name ?? EMPTY}</H2>
                  <LocationSubline2>
                    at{' '}
                    <a href={`/location/${location._id}`}>
                      <u>{location.name}</u>
                    </a>{' '}
                    in {location.shortAddress}
                  </LocationSubline2>
                </OfferDetailsOverview>

                <a href={applyUrl ?? '#'} target="_blank" rel="noreferrer">
                  <ApplyNowButton disabled={!applyUrl}>
                    Apply now
                  </ApplyNowButton>
                </a>
              </OfferDetailsHeader>

              <OfferDetailsSection>
                <H3>AVAILABILITY</H3>

                <OfferDetailsPricing>
                  <Caption>{formatRange(startDate, endDate)}</Caption>
                  <Caption emphasized>
                    {price ? formatOfferPrice(price) : EMPTY}
                  </Caption>
                </OfferDetailsPricing>
              </OfferDetailsSection>

              {(displayMatchAll || displayMatchOne) && (
                <OfferDetailsSection>
                  <H3>ELIGIBILITY</H3>

                  <OfferDetailsEligibilitySection>
                    {displayMatchOne && (
                      <OfferDetailsEligibilityMatching>
                        <Caption emphasized>Match at least one:</Caption>

                        {rolesMatchOne.map((constraint) => (
                          <OfferDetailsEligibilityCaption
                            key={constraint.iconName}
                          >
                            <Icon
                              name={constraint.iconName}
                              color="green900"
                              size={1.6}
                            />{' '}
                            {constraint.constraintName}
                          </OfferDetailsEligibilityCaption>
                        ))}
                      </OfferDetailsEligibilityMatching>
                    )}

                    {displayMatchAll && (
                      <OfferDetailsEligibilityMatching>
                        <Caption emphasized>Match all:</Caption>

                        {citizenshipRequired && (
                          <OfferDetailsEligibilityCaption>
                            <Icon
                              key="citizen"
                              name="citizen"
                              color="green900"
                              size={1.6}
                            />{' '}
                            Citizen
                          </OfferDetailsEligibilityCaption>
                        )}
                        {(minimunCabinBalance ?? 0) > 0 && (
                          <OfferDetailsEligibilityCaption>
                            <Icon
                              key="holding"
                              name="holding"
                              color="green900"
                              size={1.6}
                            />{' '}
                            ≥ {minimunCabinBalance} ₡ABIN
                          </OfferDetailsEligibilityCaption>
                        )}
                      </OfferDetailsEligibilityMatching>
                    )}
                  </OfferDetailsEligibilitySection>
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

const OfferDetailsOverview = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.4rem;

  ${({ theme }) => theme.bp.lg_max} {
    width: 100%;
  }
`

const ApplyNowButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.lg_max} {
    width: 18.9rem;
  }

  ${({ theme }) => theme.bp.md_max} {
    width: 100%;
  }
`

const OfferDetailsSection = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.6rem;
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

const OfferDetailsEligibilitySection = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;
`

const OfferDetailsEligibilityMatching = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.6rem;
`

const OfferDetailsEligibilityCaption = styled(Caption)`
  display: flex;
  flex-flow: row;
  gap: 0.4rem;
`

const LocationSubline2 = styled(Subline2)`
  line-height: 1.6;
`
