import { LocationType } from '@/generated/graphql'
import { LocationListByType } from './LocationListByType'
import { LocationsByVoteCount } from './LocationsByVoteCount'

interface LocationListProps {
  locationType?: LocationType
}

export const LocationListFilter = (props: LocationListProps) => {
  const { locationType } = props

  if (locationType) {
    return <LocationListByType locationType={locationType} />
  } else {
    return <LocationsByVoteCount />
  }

  return null
}
