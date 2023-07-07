import { LocationType, OfferType } from '@/generated/graphql'
import { LocationListByType } from './LocationListByType'
import { LocationsByVoteCount } from './LocationsByVoteCount'
import { LocationListByOfferType } from './LocationListByOfferType'

interface LocationListProps {
  locationType?: LocationType
  offerType?: OfferType
}

export const LocationListFilter = (props: LocationListProps) => {
  const { locationType, offerType } = props

  if (locationType) {
    return <LocationListByType locationType={locationType} />
  } else if (offerType) {
    return <LocationListByOfferType offerType={offerType} />
  } else {
    return <LocationsByVoteCount />
  }

  return null
}
