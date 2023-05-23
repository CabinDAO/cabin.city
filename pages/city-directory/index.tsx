import { CityDirectoryView } from '@/components/neighborhoods/CityDirectoryView'
import { LocationType } from '@/generated/graphql'

const CityDirectory = () => {
  return <CityDirectoryView locationType={LocationType.Neighborhood} />
}

export default CityDirectory
