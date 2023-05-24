import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { OfferView } from '@/components/offers/OfferView'
import { useGetOffer } from './useGetOffer'
import { ActionBar } from '../core/ActionBar'
import { PublishModal } from '../neighborhoods/edit-location/PublishModal'
import { useModal } from '../hooks/useModal'
import { useRouter } from 'next/router'

export const OfferPageView = () => {
  const { offer, ownedByMe, published } = useGetOffer()
  const { showModal } = useModal()
  const router = useRouter()

  if (!offer) {
    return null
  }

  const handlePublish = async () => {
    showModal(() => <PublishModal locationId={offer.location._id} />)
  }

  return (
    <SingleColumnLayout
      actionBar={
        ownedByMe && !published ? (
          <ActionBar
            primaryButton={{
              label: 'Publish',
              onClick: handlePublish,
            }}
            secondaryButton={{
              label: 'Back',
              onClick: () => router.push(`/location/${offer.location._id}`),
            }}
          />
        ) : null
      }
    >
      <OfferView offer={offer} />
    </SingleColumnLayout>
  )
}
