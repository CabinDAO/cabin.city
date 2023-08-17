import Icon from '@/components/core/Icon'
import events from '@/lib/googleAnalytics/events'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { OfferViewProps } from '@/components/offers/useGetOffer'
import { useProfile } from '@/components/auth/useProfile'
import {
  CitizenshipStatus,
  MeFragment,
  OfferFragment,
  OfferType,
} from '@/generated/graphql'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { formatUrl } from '@/utils/display-utils'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'

interface ApplyButtonProps {
  offer: OfferViewProps
}

export const ApplyButton = ({ offer }: ApplyButtonProps) => {
  const { user } = useProfile()

  let applicationURL: string | null = null

  switch (offer.offerType) {
    case OfferType.Residency:
      if (!user) {
        return (
          <AuthenticatedLink>
            <ApplyNowButton>Sign In to Apply</ApplyNowButton>
          </AuthenticatedLink>
        )
      }

      if (!isEligible(user, offer)) {
        return (
          <ApplyNowButton
            startAdornment={<Icon name="lock" size={1.6} />}
            disabled
          >
            Not Eligible to Apply
          </ApplyNowButton>
        )
      }

      applicationURL = formatUrl(offer.applicationUrl)

      break

    case OfferType.PaidColiving:
      if (!user || !isEligible(user, offer)) {
        applicationURL = EXTERNAL_LINKS.BOOKING_TYPEFORM
      } else {
        applicationURL = formatUrl(offer.applicationUrl)
      }
      break

    case OfferType.CabinWeek:
      applicationURL = EXTERNAL_LINKS.BOOKING_TYPEFORM
      break
  }

  if (!applicationURL) {
    return null
  }

  return (
    <a
      onClick={() => events.applyToExperienceEvent(offer._id)}
      href={applicationURL}
      target="_blank"
      rel="noreferrer"
    >
      <ApplyNowButton>Apply now</ApplyNowButton>
    </a>
  )
}

const isEligible = (user: MeFragment, offer: OfferFragment) => {
  const requiresCitizenship =
    offer.offerType === OfferType.PaidColiving ||
    (offer.offerType == OfferType.Residency && offer.citizenshipRequired)

  if (
    requiresCitizenship &&
    user.citizenshipStatus !== CitizenshipStatus.Verified
  ) {
    return false
  }

  if (
    offer.minimunCabinBalance &&
    user.cabinTokenBalanceInt < offer.minimunCabinBalance
  ) {
    return false
  }

  if (offer.profileRoleConstraints && offer.profileRoleConstraints.length > 0) {
    const userRoleLevelMap = new Map(
      user.roles.map((profileRole) => [profileRole.role, profileRole.level])
    )

    return !!offer.profileRoleConstraints.find((constraint) => {
      const userLevel = userRoleLevelMap.get(constraint.profileRole)
      return userLevel && userLevel === constraint.level
    })
  }

  return true
}

const ApplyNowButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.lg_max} {
    width: 18.9rem;
  }

  ${({ theme }) => theme.bp.md_max} {
    width: 100%;
  }
`
