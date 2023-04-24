import { CityDirectoryView } from '@/components/neighborhoods/CityDirectoryView'
import { LocationType } from '@/generated/graphql'
import { useRouter } from 'next/router'

const CityDirectoryByLocationType = () => {
  const router = useRouter()
  const locationTypeStr = router.query.locationType as string
  if (!locationTypeStr) return null

  let locationType: LocationType
  switch (locationTypeStr) {
    case 'neighborhoods':
      locationType = LocationType.Neighborhood
      break
    case 'outposts':
      locationType = LocationType.Outpost
      break
    default:
      throw new Error('Invalid location type')
  }

  return <CityDirectoryView locationType={locationType} />
}

export default CityDirectoryByLocationType
