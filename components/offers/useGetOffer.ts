import { offerViewPropsFromFragment } from '@/utils/offer'
import { useRouter } from 'next/router'
import { useUser } from '../auth/useUser'
import {
  LocationType,
  OfferFragment,
  OfferPriceUnit,
  OfferType,
  ProfileRoleConstraint,
  useGetOfferByIdQuery,
} from '@/generated/graphql'
import { useEffect } from 'react'

interface OfferPrice {
  unit: OfferPriceUnit
  amountCents: number
}

export interface OfferViewProps {
  _id: string
  offerType: OfferType | null | undefined
  locationType: LocationType
  title: string | null | undefined
  description: string | null | undefined
  citizenshipRequired: boolean | null | undefined
  minimunCabinBalance: number | null | undefined
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  imageUrl: string | null | undefined
  applicationUrl: string | null | undefined
  price: OfferPrice | null | undefined
  profileRoleConstraints?: ProfileRoleConstraint[] | null | undefined
  location: {
    _id: string
    name: string | null | undefined
    shortAddress: string | null | undefined
  }
  rawFragment: OfferFragment
}

export const useGetOffer = () => {
  const router = useRouter()
  const { offerId } = router.query
  const { user } = useUser()
  const { data } = useGetOfferByIdQuery({
    variables: {
      id: `${offerId}`,
    },
    skip: !offerId,
  })
  const offer = data?.findOfferByID
    ? offerViewPropsFromFragment(data.findOfferByID)
    : null

  useEffect(() => {
    if (data && !offer) {
      router.push('/404')
    }
  }, [data, offer, router])

  if (!offer) {
    return { offer: null, ownedByMe: false }
  }

  return {
    offer,
    ownedByMe: user?._id === offer.rawFragment.location.caretaker._id,
  }
}
