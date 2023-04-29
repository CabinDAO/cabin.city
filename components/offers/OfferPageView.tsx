import { useRouter } from 'next/router'
import { offerViewPropsFromFragment } from '@/utils/offer'
import { useGetOfferByIdQuery } from '@/generated/graphql'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { OfferView } from '@/components/offers/OfferView'
import { useUser } from '@/components/auth/useUser'
import { useEffect } from 'react'

export const OfferPageView = () => {
  const router = useRouter()
  const { offerId } = router.query
  const { user } = useUser({ redirectTo: '/login' })
  const { data } = useGetOfferByIdQuery({
    variables: {
      id: `${offerId}`,
    },
    skip: !offerId || !user,
  })
  const offer = data?.findOfferByID
    ? offerViewPropsFromFragment(data.findOfferByID)
    : null

  useEffect(() => {
    if (data && !offer) {
      router.push('/404')
    }
  }, [data, offer, router])

  if (!offer || !user) {
    return null
  }

  return (
    <SingleColumnLayout>
      <OfferView offer={offer} />
    </SingleColumnLayout>
  )
}
