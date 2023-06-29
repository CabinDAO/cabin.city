import { offerViewPropsFromFragment } from '@/utils/offer'
import { useRouter } from 'next/router'
import { useProfile } from '../auth/useProfile'
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
    publishedAt: Date | null | undefined
    caretaker: {
      _id: string
    }
  }
  rawFragment: OfferFragment
}

export const useGetOffer = () => {
  const router = useRouter()
  const { offerId } = router.query
  const { user } = useProfile({ redirectTo: '/' })
  const { data } = useGetOfferByIdQuery({
    variables: {
      id: `${offerId}`,
    },
    skip: !offerId || !user,
  })

  const offer = data?.findOfferByID
    ? offerViewPropsFromFragment(data.findOfferByID)
    : null

  const ownedByMe = offer && user?._id === offer?.location.caretaker._id

  const hideFromOthers = offer && !offer.location.publishedAt && !ownedByMe

  useEffect(() => {
    if (data && !offer) {
      router.push('/404')
    } else if (hideFromOthers) {
      router.push('/city-directory')
    }
  }, [data, offer, router, hideFromOthers])

  if (!offer || !user || hideFromOthers) {
    return { offer: null, ownedByMe: false }
  }

  return {
    offer,
    ownedByMe,
    published: !!offer.location.publishedAt,
  }
}
