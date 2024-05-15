import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import { getEthersAlchemyProvider } from '@/lib/chains'
import { PublicLock__factory } from '@/generated/ethers'
import { unlockConfigForEnv } from '@/lib/protocol-config'
import { MapData } from '@/components/landing/MapSectionDynamic'
import { LandingView } from '@/components/landing/LandingView'

export default function Home({
  mapData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <LandingView mapData={mapData} />
}

export const getStaticProps = (async (context) => {
  const lockContract = PublicLock__factory.connect(
    unlockConfigForEnv.contractAddress,
    getEthersAlchemyProvider(unlockConfigForEnv.networkName)
  )

  const [locations, numProfiles, citizens] = await Promise.all([
    prisma.location.findMany({
      select: { name: true, address: true },
      where: { address: { lat: { not: null } } },
    }),
    prisma.profile.count(),
    lockContract.totalSupply(),
  ])

  return {
    props: {
      mapData: {
        members: numProfiles,
        citizens: Number(citizens),
        locations: locations.map((l) => ({
          label: l.name,
          lat: l.address?.lat || 0,
          lng: l.address?.lng || 0,
        })),
      },
    },
    revalidate: 60 * 60 * 24, // refetch the stats once every 24 hours
  }
}) satisfies GetStaticProps<{
  mapData: MapData
}>
