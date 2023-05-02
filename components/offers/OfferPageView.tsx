import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { OfferView } from '@/components/offers/OfferView'
import { useGetOffer } from './useGetOffer'

export const OfferPageView = () => {
  const { offer } = useGetOffer()

  if (!offer) {
    return null
  }

  return (
    <SingleColumnLayout>
      <OfferView offer={offer} />
    </SingleColumnLayout>
  )
}
