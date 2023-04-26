import { OfferListItemProps } from '@/components/core/OfferListItem'
import { LocationType, OfferType } from '@/generated/graphql'
import { addMonths } from 'date-fns'

export const DEFAULT_OFFER_PROPS: OfferListItemProps = {
  _id: '123',
  offerType: OfferType.Residency,
  locationType: LocationType.Neighborhood,
  title: 'May creator residency',
  startDate: new Date(),
  endDate: addMonths(new Date(), 1),
  imageUrl: 'https://picsum.photos/64',
  location: {
    _id: '456',
    name: 'Firefly Hut',
    shortAddress: 'Boone, NC',
  },
}

export const EMPTY_IMAGE_OFFER_PROPS: OfferListItemProps = {
  _id: '123',
  offerType: OfferType.Residency,
  locationType: LocationType.Neighborhood,
  title: 'May creator residency',
  startDate: new Date(),
  endDate: addMonths(new Date(), 1),
  imageUrl: undefined,
  location: {
    _id: '456',
    name: 'Firefly Hut',
    shortAddress: 'Boone, NC',
  },
}
