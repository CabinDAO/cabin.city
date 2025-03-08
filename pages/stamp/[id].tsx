import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { prisma } from '@/lib/prisma'
import { ProfileQueryInclude } from '@/utils/types/profile'
import { expandRoute } from '@/utils/routing'
import Error404 from '@/pages/404'
import { AppHead } from '@/components/head'
import { profileToFragment } from '@/pages/api/profile/[externId]'
import { StampWithRecipientsFragment } from '@/utils/types/stamp'
import { getStampImageUrl } from '@/components/core/Stamp'
import { StampView } from '@/components/stamp/StampView'

export default function StampPage({
  stamp,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!stamp) {
    // this can happen if the profile was deleted after getStaticPaths was called
    // but before this page was revalidated
    return Error404()
  }

  return (
    <>
      <AppHead
        title={`${stamp.name} | Cabin.city`}
        description={stamp.name}
        imageUrl={getStampImageUrl(stamp.id)}
        pathname={expandRoute(['stamp_id', { id: stamp.id.toString() }])}
        ogType="person"
      />
      <StampView stamp={stamp} />
    </>
  )
}

export const getStaticPaths = (async () => {
  const profiles = await prisma.profile.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 100,
  })

  return {
    paths: profiles.map((p) => ({
      params: { id: p.externId },
    })),
    fallback: 'blocking', // true or false or "blocking"
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const stamp = await prisma.stamp.findUnique({
    where: { id: context.params ? parseInt(context.params.id as string) : 0 },
    include: {
      profiles: {
        include: {
          profile: {
            include: ProfileQueryInclude,
          },
        },
      },
    },
  })

  if (!stamp) {
    return { notFound: true, revalidate: 1 }
  }

  return {
    props: {
      stamp: {
        id: stamp.id,
        name: stamp.name,
        recipients: stamp.profiles.map((p) => profileToFragment(p.profile)),
      },
    },
  }
}) satisfies GetStaticProps<{ stamp: StampWithRecipientsFragment }>
