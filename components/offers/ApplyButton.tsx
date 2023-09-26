import React from 'react'
import Link from 'next/link'
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
  OfferFragment,
  OfferType,
  useCreateCartMutation,
} from '@/generated/graphql'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { formatUrl } from '@/utils/display-utils'

interface ApplyButtonProps {
  offer: OfferViewProps
}

export const ApplyButton = ({ offer }: ApplyButtonProps) => {
  const router = useRouter()
  const { user } = useProfile()
  const [createCart] = useCreateCartMutation()

  const handleReserveClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!user) return

    try {
      const lodgingType = offer.location.lodgingTypes.data[0]

      await createCart({
        variables: {
          data: {
            profileId: user._id,
            offerId: offer._id,
            lodgingTypeId: lodgingType._id,
            price: lodgingType.price,
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

  return (
    <Link href={`/experience/${offer._id}/reserve`}>
      <BuyButton onClick={handleReserveClick}>Reserve</BuyButton>
    </Link>
  )
}

const isEligible = (user: MeFragment, offer: OfferFragment) => {
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

  ${({ theme }) => theme.bp.lg_max} {
    width: 18.9rem;
  }

  ${({ theme }) => theme.bp.md_max} {
    width: 100%;
  }
`
