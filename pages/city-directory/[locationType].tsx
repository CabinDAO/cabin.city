import { CityDirectoryView } from '@/components/neighborhoods/CityDirectoryView'
import { LocationType, OfferType } from '@/generated/graphql'
import { useRouter } from 'next/router'

const CityDirectoryByLocationType = () => {
  const router = useRouter()
  const locationTypeStr = router.query.locationType as string
  if (!locationTypeStr) return null

  let locationType: LocationType | undefined = undefined
  let offerType: OfferType | undefined = undefined

  switch (locationTypeStr) {
    case 'neighborhoods':
      locationType = LocationType.Neighborhood
      break
    case 'outposts':
      locationType = LocationType.Outpost
      break
    case 'residency':
      offerType = OfferType.Residency
      break
    case 'coliving':
      offerType = OfferType.PaidColiving
      break
    case 'cabin-week':
      offerType = OfferType.CabinWeek
      break
    default:
      throw new Error('Invalid location type')
  }

  return <CityDirectoryView locationType={locationType} offerType={offerType} />
}

export default CityDirectoryByLocationType
