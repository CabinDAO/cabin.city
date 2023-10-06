import React from 'react'
import { useRouter } from 'next/router'
import Icon from '@/components/core/Icon'
import events from '@/lib/googleAnalytics/events'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { OfferViewProps } from '@/components/offers/useGetOffer'
import { useProfile } from '@/components/auth/useProfile'
import {
  CitizenshipStatus,
  MeFragment,
  OfferDataFragment,
  OfferType,
  useCreateCartMutation,
} from '@/generated/graphql'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { formatUrl } from '@/utils/display-utils'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'

interface ApplyButtonProps {
  offer: OfferViewProps
  lodgingType?: OfferViewProps['location']['lodgingTypes']['data'][0]
}

export const ApplyButton = ({ offer, lodgingType }: ApplyButtonProps) => {
  const router = useRouter()
  const { user } = useProfile()
  const [createCart] = useCreateCartMutation()

  const handleReserveClick = async () => {
    if (!user || !lodgingType || lodgingType.spotsTaken >= lodgingType.quantity)
      return

    try {
      await createCart({
        variables: {
          data: {
            profileId: user._id,
            offerId: offer._id,
            lodgingTypeId: lodgingType._id,
          },
        },
      }).then((res) => {
        router.push(`/checkout/${res.data?.createCart?._id}`)
      })
    } catch (error) {}
  }

  switch (offer.offerType) {
    case OfferType.Residency:
      return (
        <BuyButton startAdornment={<Icon name="lock" size={1.6} />} disabled>
          Disabled
        </BuyButton>
      )
      break

    case OfferType.PaidColiving:
      const applicationURL =
        !user || !isEligible(user, offer)
          ? EXTERNAL_LINKS.COLIVING_TYPEFORM
          : formatUrl(offer.applicationUrl)
      return (
        <a
          onClick={() => events.applyToExperienceEvent(offer._id)}
          href={applicationURL ?? ''}
          target="_blank"
          rel="noreferrer"
        >
          <BuyButton>Apply now</BuyButton>
        </a>
      )
      break
  }

  if (lodgingType && lodgingType?.spotsTaken >= lodgingType?.quantity) {
    return <BuyButton disabled>Sold Out</BuyButton>
  }

  const USE_NEW_FLOW_FLAG = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
  if (!USE_NEW_FLOW_FLAG) {
    return (
      <a
        onClick={() => events.applyToExperienceEvent(offer._id)}
        href={EXTERNAL_LINKS.CABIN_WEEK_BOOKING_TYPEFORM}
        target="_blank"
        rel="noreferrer"
      >
        <BuyButton>Apply now</BuyButton>
      </a>
    )
  }

  return (
    <StyledLink onClick={handleReserveClick}>
      <BuyButton>Reserve</BuyButton>
    </StyledLink>
  )
}

const isEligible = (user: MeFragment, offer: OfferDataFragment) => {
  if (offer.offerType == OfferType.Residency) {
    return false
  }

  const requiresCitizenship = offer.offerType === OfferType.PaidColiving

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

const BuyButton = styled(Button)`
  width: 100%;
`

const StyledLink = styled(AuthenticatedLink)`
  width: 100%;
`
