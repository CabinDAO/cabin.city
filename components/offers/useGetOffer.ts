import { offerViewPropsFromFragment } from '@/utils/offer'
import { useRouter } from 'next/router'
import { useProfile } from '../auth/useProfile'
import {
  LocationType,
  OfferDataFragment,
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
    lodgingTypes: {
      data: {
        _id: string
        description: string
        quantity: number
        priceCents: number
      }[]
    }
  }
  rawFragment: OfferDataFragment
}

export const useGetOffer = (offerId: string) => {
  const router = useRouter()
  const { user } = useProfile()
  const { data } = useGetOfferByIdQuery({
    variables: {
      id: offerId,
    },
    skip: !offerId,
  })

  const offer = data?.findOfferByID
    ? offerViewPropsFromFragment(data.findOfferByID)
    : null

  const isPublished = !!offer?.location.publishedAt

  const isUserCaretaker = user?._id === offer?.location.caretaker._id

  const isEditable = !!(offer && (user?.isAdmin || isUserCaretaker))

  const isVisible = !!offer && (isEditable || isPublished)

  useEffect(() => {
    if (!data) {
      return
    } else if (!offer) {
      router.push('/404')
    } else if (!isVisible) {
      router.push('/city-directory')
    }
  }, [data, offer, router, isVisible])

  return {
    offer: offer,
    isPublished: isPublished,
    isUserCaretaker: isUserCaretaker,
    isEditable: isEditable,
    isVisible: isVisible,
  }
}
