import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import { MapData } from '@/components/landing/MapSection'
import { LandingView } from '@/components/landing/LandingView'
import { cloudflareImageUrl } from '@/lib/image'

export default function Home({
  mapData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <LandingView mapData={mapData} />
}

export const getStaticProps = (async (/*context*/) => {
  const [locations, numProfiles] = await Promise.all([
    prisma.location.findMany({
      select: {
        name: true,
        externId: true,
        address: true,
        bannerImageCfId: true,
      },
      where: { address: { lat: { not: null } }, publishedAt: { not: null } },
    }),
    prisma.profile.count(),
  ])

  return {
    props: {
      mapData: {
        members: numProfiles,
        locations: locations.map((l) => ({
          label: l.name,
          lat: l.address?.lat || 0,
          lng: l.address?.lng || 0,
          imgUrl: cloudflareImageUrl(l.bannerImageCfId),
          linkUrl: `/location/${l.externId}`,
        })),
      },
    },
    revalidate: 60 * 60 * 24, // refetch the stats once every 24 hours
  }
}) satisfies GetStaticProps<{
  mapData: MapData
}>
