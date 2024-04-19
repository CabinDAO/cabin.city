import React from 'react'
import Link from 'next/link'
import { useModal } from '@/components/hooks/useModal'
import { useProfile } from '@/components/auth/useProfile'
import { OfferFragment, OfferType } from '@/utils/types/offer'
import { CitizenshipStatus } from '@/utils/types/profile'
import { formatUrl } from '@/utils/display-utils'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'
import { CitizenshipRequiredModal } from '@/components/neighborhoods/CitizenshipRequiredModal'
import events from '@/lib/googleAnalytics/events'

export const ApplyButton = ({ offer }: { offer: OfferFragment }) => {
  const { showModal } = useModal()
  const { user } = useProfile()

  if (offer.type == OfferType.PaidColiving) {
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
        onClick={() => events.applyToExperienceEvent(offer.externId)}
        href={formatUrl(offer.applicationUrl) ?? ''}
        target="_blank"
        rel="noopener nofollow noreferrer"
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
