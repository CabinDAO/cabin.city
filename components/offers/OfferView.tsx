import Link from 'next/link'
import styled from 'styled-components'
import {
  LocationType,
  OfferPriceUnit,
  OfferType,
  ProfileRoleConstraint,
} from '@/generated/graphql'
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
import { format } from 'date-fns'
import Icon from '@/components/core/Icon'
import { SAMPLE_DESCRIPTION } from '@/stories/utils/offer-data'
import { roleConstraintInfoFromType } from '@/utils/roles'

interface OfferPrice {
  unit: OfferPriceUnit
  amountCents: number
}

export interface OfferViewProps {
  _id: string
  offerType: OfferType | null | undefined
  locationType: LocationType
  title: string | null | undefined
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  imageUrl: string | null | undefined
  applicationUrl: string | null | undefined
  price: OfferPrice | null | undefined
  profileRoleConstraints?: ProfileRoleConstraint[] | null | undefined
  location: {
    _id: string
    name: string | null | undefined
    shortAddress: string | null | undefined
  }
}

const EMPTY = '—'

export const OfferView = ({ offer }: { offer: OfferViewProps }) => {
  const {
    title,
    offerType,
    location,
    applicationUrl,
    startDate,
    endDate,
    price,
    profileRoleConstraints,
  } = offer
  const formattedStartDate = startDate ? format(startDate, 'MMM') : null
  const formattedEndDate = endDate ? format(endDate, 'MMM yyyy') : null
  const offerInfo = offerType ? offerInfoFromType(offerType) : null
  const rolesMatchOne = (profileRoleConstraints ?? []).map((roleConstraint) =>
    roleConstraintInfoFromType(roleConstraint)
  )

  return (
    <>
      <TitleCard title={title ?? EMPTY} icon="offer" />

      <StyledContentCard shape="notch" notchSize={1.6}>
        <DescriptionTwoColumn>
          <DescriptionDetails>{SAMPLE_DESCRIPTION}</DescriptionDetails>

          <OfferDetailsContainer>
            <OfferDetails>
              <OfferDetailsHeader>
                <OfferDetailsOverview>
                  <H2>{offerInfo?.name ?? EMPTY}</H2>
                  <Subline2>
                    at {location.name} in {location.shortAddress}
                  </Subline2>
                </OfferDetailsOverview>

                <Link href={applicationUrl ?? '#'}>
                  <ApplyNowButton>Apply now</ApplyNowButton>
                </Link>
              </OfferDetailsHeader>

              <OfferDetailsSection>
                <H3>AVAILABILITY</H3>

                <OfferDetailsPricing>
                  <Caption>
                    {formattedStartDate ?? EMPTY} - {formattedEndDate ?? EMPTY}
                  </Caption>
                  <Caption emphasized>
                    {price ? formatOfferPrice(price) : EMPTY}
                  </Caption>
                </OfferDetailsPricing>
              </OfferDetailsSection>

              <OfferDetailsSection>
                <H3>ELIGIBILITY</H3>

                <OfferDetailsEligibilitySection>
                  <OfferDetailsEligibilityMatching>
                    <Caption emphasized>Match at least one:</Caption>

                    {rolesMatchOne.map(({ constraintName, iconName }) => (
                      <OfferDetailsEligibilityCaption key={iconName}>
                        <Icon name={iconName} color="green900" size={1.6} />{' '}
                        {constraintName}
                      </OfferDetailsEligibilityCaption>
                    ))}
                  </OfferDetailsEligibilityMatching>

                  <OfferDetailsEligibilityMatching>
                    <Caption emphasized>Match all:</Caption>

                    <OfferDetailsEligibilityCaption>
                      <Icon
                        key="citizen"
                        name="citizen"
                        color="green900"
                        size={1.6}
                      />{' '}
                      Citizen
                    </OfferDetailsEligibilityCaption>
                    <OfferDetailsEligibilityCaption>
                      <Icon
                        key="holding"
                        name="holding"
                        color="green900"
                        size={1.6}
                      />{' '}
                      ≥ 500 ₡ABIN
                    </OfferDetailsEligibilityCaption>
                  </OfferDetailsEligibilityMatching>
                </OfferDetailsEligibilitySection>
              </OfferDetailsSection>
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
