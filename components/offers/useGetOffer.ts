import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import { OfferGetResponse } from '@/utils/types/offer'
import { canEditLocation } from '@/utils/location'

export const useGetOffer = (offerId: string) => {
  const router = useRouter()
  const { user } = useProfile()
  const { useGet, revalidate } = useBackend()
  const { data } = useGet<OfferGetResponse>(
    offerId ? ['OFFER', { externId: offerId }] : null
  )

  const offer = data && 'offer' in data ? data.offer : null

  const isEditable = !!offer && canEditLocation(user, offer.location)

  const isVisible = !!offer && isEditable

  useEffect(() => {
    if (!data) {
      return
    } else if (!offer) {
      router.push('/404').then()
    } else if (!isVisible) {
      router.push('/city-directory').then()
    }
  }, [data, offer, router, isVisible])

  return {
    offer,
    isEditable,
    isVisible,
    refetchLocation: async () => {
      if (offer) {
        await revalidate(['LOCATION', { externId: offer.location.externId }])
      }
    },
  }
}
