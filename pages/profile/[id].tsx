import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { prisma } from '@/lib/prisma'
import {
  ProfileFragment,
  ProfileQueryInclude,
  ProfileWithRelations,
} from '@/utils/types/profile'
import { cloudflareImageUrl } from '@/lib/image'
import { expandRoute } from '@/utils/routing'
import Error404 from '@/pages/404'
import { AppHead } from '@/components/head'
import { profileToFragment } from '@/pages/api/profile/[externId]'
import { ProfileView } from '@/components/profile/ProfileView'

export default function ProfilePage({
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!profile) {
    // this can happen if the profile was deleted after getStaticPaths was called
    // but before this page was revalidated
    return Error404()
  }

  return (
    <>
      <AppHead
        title={`${profile.name} | Cabin.city`}
        description={profile.bio}
        imageUrl={
          profile.avatarCfId
            ? cloudflareImageUrl(profile.avatarCfId)
            : undefined
        }
        pathname={expandRoute(['profile_id', { id: profile.externId }])}
        ogType="person"
      />
      <ProfileView profile={profile} />
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
  const profile = await prisma.profile.findUnique({
    where: { externId: context.params?.id as string },
    include: ProfileQueryInclude,
  })

  if (!profile) {
    return { notFound: true, revalidate: 1 }
  }

  return {
    props: {
      profile: profileToFragment(profile as ProfileWithRelations),
    },
  }
}) satisfies GetStaticProps<{ profile: ProfileFragment }>
