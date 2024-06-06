import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Error from 'next/error'
import React from 'react'
import { prisma } from '@/lib/prisma'
import {
  LocationFragment,
  LocationQueryInclude,
  LocationWithRelations,
} from '@/utils/types/location'
import { locationToFragment } from '@/pages/api/v2/location/list'
import { AppHead } from '@/components/shared/head'
import { BaseLayout } from '@/components/core/BaseLayout'
import { LocationView } from '@/components/neighborhoods/LocationView'
import { getImageUrlByIpfsHash } from '@/lib/image'

export default function LocationPage({
  location,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!location) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <AppHead
        title={location.name}
        description={location.description}
        imageUrl={
          getImageUrlByIpfsHash(location.bannerImageIpfsHash, true) || undefined
        }
        pathname={`/location/${location.externId}`}
      />
      <BaseLayout>
        <LocationView location={location} />
      </BaseLayout>
    </>
  )
}

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: true, // or false or "blocking"
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const location = await prisma.location.findUnique({
    where: { externId: context.params?.id as string },
    include: LocationQueryInclude({ countActiveEventsOnly: true }),
  })

  return {
    props: {
      location: location
        ? locationToFragment(location as LocationWithRelations)
        : null,
    },
  }
}) satisfies GetStaticProps<{ location: LocationFragment | null }>
