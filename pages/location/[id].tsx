import React from 'react'
import { LocationPageView } from '@/components/neighborhoods/LocationPageView'
import { AppHead } from '@/components/shared/head'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { prisma } from '@/lib/prisma'

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
      bannerImageIpfsHash: true,
    },
  })

  return location
    ? {
        props: {
          location: {
            externId: location.externId,
            title: location.name,
            image: getImageUrlByIpfsHash(location.bannerImageIpfsHash, true),
          },
        } as LocationPageProps,
      }
    : {
        notFound: true,
      }
}

export default LocationPage
