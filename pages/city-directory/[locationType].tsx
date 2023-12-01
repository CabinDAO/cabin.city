import { useRouter } from 'next/router'

const CityDirectoryByLocationType = () => {
  const router = useRouter()

  const locationTypeStr = router.query.locationType as string
  if (!locationTypeStr) return null

  router.replace('/city-directory')
  // TODO: delete this route in 2025
  // this is just here to make sure links from elsewhere don't break
}

export default CityDirectoryByLocationType
