import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import { OfferGetResponse } from '@/utils/types/offer'

export const useGetOffer = (offerId: string) => {
  const router = useRouter()
  const { user } = useProfile()
  const { useGet, revalidate } = useBackend()
  const { data } = useGet<OfferGetResponse>(
    offerId ? ['OFFER', { externId: offerId }] : null
  )

  const offer = data && 'offer' in data ? data.offer : null

  const isPublished = !!offer?.location.publishedAt

  const isUserCaretaker = user?.externId === offer?.location.caretaker.externId

  const isEditable = !!(offer && (user?.isAdmin || isUserCaretaker))

  const isVisible = !!offer && (isEditable || isPublished)

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
    offer: offer,
    isPublished: isPublished,
    isUserCaretaker: isUserCaretaker,
    isEditable: isEditable,
    isVisible: isVisible,
    refetchLocation: async () => {
      if (offer) {
        await revalidate(['LOCATION', { externId: offer.location.externId }])
      }
    },
  }
}
