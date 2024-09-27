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
import { expandRoute } from '@/utils/routing'

export default function LocationPage({
  location,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // NOTE: location can still be null if serving a fallback version of the page
  // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-pages
  const router = useRouter()
  if (!router.isFallback && !location) {
    // idk why this is necessary (you'd think notFound:true would cover it), but it is
    return Error404()
  }

  return (
    <>
      {location && location.publishedAt && (
        <AppHead
          title={location.name}
          description={'a Cabin.city neighborhood'}
          imageUrl={cloudflareImageUrl(location.bannerImageCfId)}
          pathname={expandRoute(['n_id', { id: location.externId }])}
        />
      )}
      <BaseLayout>
        {!router.isFallback && <LocationView externId={location.externId} />}
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
    return { notFound: true }
  }

  return {
    props: {
      location: locationToFragment(location as LocationWithRelations),
    },
  }
}) satisfies GetStaticProps<{ location: LocationFragment }>
