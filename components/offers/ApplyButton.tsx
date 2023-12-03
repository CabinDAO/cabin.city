import React from 'react'
import Icon from '@/components/core/Icon'
import events from '@/lib/googleAnalytics/events'
import { Button } from '@/components/core/Button'
import { OfferViewProps } from '@/components/offers/useGetOffer'
import { useProfile } from '@/components/auth/useProfile'
import { CitizenshipStatus, OfferType } from '@/generated/graphql'
import { formatUrl } from '@/utils/display-utils'
import { useModal } from '@/components/hooks/useModal'
import { CitizenshipRequiredModal } from '@/components/neighborhoods/CitizenshipRequiredModal'
import Link from 'next/link'

interface ApplyButtonProps {
  offer: OfferViewProps
  lodgingType?: OfferViewProps['location']['lodgingTypes']['data'][0]
}

export const ApplyButton = ({ offer, lodgingType }: ApplyButtonProps) => {
  const { showModal } = useModal()
  const { user } = useProfile()

  if (offer.offerType == OfferType.PaidColiving) {
    if (!user || user.citizenshipStatus !== CitizenshipStatus.Verified) {
      return (
        <Link
          onClick={() => showModal(() => <CitizenshipRequiredModal />)}
          href="#"
          style={{
            width: '100%',
          }}
        >
          <Button isFullWidth>Apply Now</Button>
        </Link>
      )
    }

    return (
      <Link
        onClick={() => events.applyToExperienceEvent(offer._id)}
        href={formatUrl(offer.applicationUrl) ?? ''}
        target="_blank"
        rel="noreferrer"
        style={{
          width: '100%',
        }}
      >
        <Button isFullWidth>Apply Now</Button>
      </Link>
    )
  }

  return (
    <Button
      startAdornment={<Icon name="lock" size={1.6} />}
      isFullWidth
      disabled
    >
      Disabled
    </Button>
  )
}
