import { LocationPageView } from '@/components/neighborhoods/LocationPageView'
import { AppHead } from '@/components/shared/head'
import { GetLocationById } from '@/fauna/lib/GetLocationById'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { getImageUrlByIpfsHash } from '@/lib/image'

interface LocationPageProps {
  location: {
    title: string
    description: string
    image: string
    id: string
  }
}

const LocationPage = ({ location }: LocationPageProps) => {
  console.log('🚀 ~ file: [id].tsx:14 ~ LocationPage ~ location:', location)
  return (
    <>
      <AppHead
        title={location.title}
        description={location.description}
        imageUrl={location.image}
        pathname={`/location/${location.id}`}
      />
      <LocationPageView />
    </>
  )
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string }
}) {
  const response = (await faunaServerClient.query(
    GetLocationById(params.id)
  )) as {
    data: { name: string; tagline: string; bannerImageIpfsHash: string }
  }

  return {
    props: {
      location: {
        title: response?.data?.name,
        description: response?.data?.tagline,
        image: getImageUrlByIpfsHash(response?.data?.bannerImageIpfsHash, true),
        id: params.id,
      },
    },
  }
}

export default LocationPage
