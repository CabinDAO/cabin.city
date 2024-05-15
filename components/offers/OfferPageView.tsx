import { useRouter } from 'next/router'
import { useGetOffer } from './useGetOffer'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { OfferView } from '@/components/offers/OfferView'

export const OfferPageView = () => {
  const router = useRouter()
  const { offerId } = router.query
  const { offer, isEditable } = useGetOffer(offerId as string)

  if (!offer) {
    return null
  }

  return (
    <SingleColumnLayout>
      <OfferView offer={offer} isEditable={isEditable} />
    </SingleColumnLayout>
  )
}
