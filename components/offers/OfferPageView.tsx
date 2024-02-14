import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { OfferView } from '@/components/offers/OfferView'
import { useGetOffer } from './useGetOffer'
import { ActionBar } from '../core/ActionBar'
import { PublishLocationModal } from '../neighborhoods/edit-location/PublishLocationModal'
import { useModal } from '../hooks/useModal'
import { useRouter } from 'next/router'

export const OfferPageView = () => {
  const router = useRouter()
  const { offerId } = router.query
  const { offer, isEditable, isPublished, refetchLocation } = useGetOffer(
    offerId as string
  )
  const { showModal } = useModal()

  if (!offer) {
    return null
  }

  const handlePublish = async () => {
    showModal(() => (
      <PublishLocationModal
        locationId={offer.location.externId}
        refetchLocation={refetchLocation}
      />
    ))
  }

  return (
    <SingleColumnLayout
      withFooter
      actionBar={
        isEditable && !isPublished ? (
          <ActionBar
            primaryButton={{
              label: 'Publish',
              onClick: handlePublish,
            }}
            secondaryButton={{
              label: 'Back',
              onClick: () =>
                router.push(`/location/${offer.location.externId}`),
            }}
          />
        ) : null
      }
    >
      <OfferView offer={offer} isEditable={isEditable} />
    </SingleColumnLayout>
  )
}
