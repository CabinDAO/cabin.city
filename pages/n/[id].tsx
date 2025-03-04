import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from '@/components/hooks/useRouter'
import React from 'react'
import { prisma } from '@/lib/prisma'
import {
  LocationFragment,
  LocationQueryInclude,
  LocationWithRelations,
} from '@/utils/types/location'
import { locationToFragment } from '@/pages/api/location/list'
import { AppHead } from '@/components/head'
import { BaseLayout } from '@/components/core/BaseLayout'
import Error404 from '@/pages/404'
import { LocationView } from '@/components/neighborhoods/LocationView'
import { cloudflareImageUrl } from '@/lib/image'
import { formatShortAddress } from '@/lib/address'
import { expandRoute } from '@/utils/routing'
import LoadingSpinner from '@/components/core/LoadingSpinner'

export default function LocationPage({
  location,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // NOTE: location can still be null if serving a fallback version of the page
  // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-pages
  const router = useRouter()
  if (!location) {
    // this can happen if the location was deleted after getStaticPaths was called
    // but before this page was revalidated
    return Error404()
  }

  return (
    <>
      {location && location.publishedAt && (
        <AppHead
          title={`${location.name} | Cabin.city`}
          description={formatShortAddress(location.address)}
          imageUrl={cloudflareImageUrl(location.bannerImageCfId)}
          pathname={expandRoute(['n_id', { id: location.externId }])}
          ogType="place"
        />
      )}
      <BaseLayout>
        {router.isFallback ? (
          <LoadingSpinner />
        ) : (
          <LocationView externId={location.externId} />
        )}
      </BaseLayout>
    </>
  )
}

export const getStaticPaths = (async () => {
  const locations = await prisma.location.findMany({
    // where: { publishedAt: { not: null } },
  })

  return {
    paths: locations.map((location) => ({
      params: { id: location.externId },
    })),
    fallback: 'blocking', // true or false or "blocking"
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const location = await prisma.location.findUnique({
    where: { externId: context.params?.id as string },
    include: LocationQueryInclude({ countActiveEventsOnly: true }),
  })

  if (!location) {
    return { notFound: true, revalidate: 1 }
  }

  return {
    props: {
      location: locationToFragment(location as LocationWithRelations),
    },
  }
}) satisfies GetStaticProps<{ location: LocationFragment }>
