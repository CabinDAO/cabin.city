import { NeighborhoodsPlaceholderView } from '@/components/neighborhoods/NeighborhoodsPlaceholderView'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CityDirectory = () => {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'dev') {
      router.push('/city-directory/neighborhoods')
    }
  }, [router])

  if (process.env.NEXT_PUBLIC_APP_ENV === 'dev') {
    return null
  }
  return <NeighborhoodsPlaceholderView />
}

export default CityDirectory
