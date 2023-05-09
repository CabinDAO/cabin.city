import { useFeatures } from '@/components/hooks/useFeatures'
import { NeighborhoodsPlaceholderView } from '@/components/neighborhoods/NeighborhoodsPlaceholderView'
import { Feature } from '@/lib/features'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CityDirectory = () => {
  const router = useRouter()
  const { hasFeature } = useFeatures()
  const hasCityFeature = hasFeature(Feature.City)

  useEffect(() => {
    if (hasCityFeature) {
      router.push('/city-directory/neighborhoods')
    }
  }, [router, hasCityFeature])

  if (hasCityFeature) {
    return null
  }

  return <NeighborhoodsPlaceholderView />
}

export default CityDirectory
