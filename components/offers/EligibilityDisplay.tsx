import styled from 'styled-components'
import { Caption, H3 } from '../core/Typography'
import Icon from '../core/Icon'
import { RoleConstraintType } from '@/utils/offer'

interface EligibilityDisplayProps {
  displayMatchOne?: boolean
  displayMatchAll?: boolean
  rolesMatchOne?: RoleConstraintType[]
  citizenshipRequired?: boolean | null
  minimunCabinBalance?: number | null
}

export const EligibilityDisplay = ({
  displayMatchAll = false,
  displayMatchOne = false,
  rolesMatchOne = [],
  citizenshipRequired,
  minimunCabinBalance,
}: EligibilityDisplayProps) => {
  return (
    <>
      <H3>ELIGIBILITY</H3>

      <OfferDetailsEligibilitySection>
        {displayMatchOne && (
          <OfferDetailsEligibilityMatching>
            <Caption emphasized>Match at least one:</Caption>

            {rolesMatchOne.map((constraint) => (
              <OfferDetailsEligibilityCaption key={constraint.iconName}>
                <Icon name={constraint.iconName} color="green900" size={1.6} />{' '}
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
    </>
  )
}

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
