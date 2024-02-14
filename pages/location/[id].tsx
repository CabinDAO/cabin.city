import { LocationPageView } from '@/components/neighborhoods/LocationPageView'
import { AppHead } from '@/components/shared/head'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { prisma } from '@/utils/prisma'

interface LocationPageProps {
  location: {
    externId: string
    title: string
    description: string
    image: string
  }
}

const LocationPage = ({ location }: LocationPageProps) => {
  return (
    <>
      <AppHead
        title={location.title}
        description={location.description}
        imageUrl={location.image}
        pathname={`/location/${location.externId}`}
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
  const location = await prisma.location.findUnique({
    where: {
      externId: params.id,
    },
    select: {
      externId: true,
      name: true,
      tagline: true,
      bannerImageIpfsHash: true,
    },
  })

  return {
    props: {
      location: {
        externId: location?.externId,
        title: location?.name,
        description: location?.tagline,
        image: getImageUrlByIpfsHash(location?.bannerImageIpfsHash, true),
      },
    } as LocationPageProps,
  }
}

export default LocationPage
