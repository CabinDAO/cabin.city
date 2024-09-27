import { GetServerSideProps } from 'next'
import { prisma } from '@/lib/prisma'
import { expandRoute } from '@/utils/routing'

const redirects: Record<string, string> = {
  lc_9GZFB23BYBC7HYBnhs8x: 'spy-pond',
  lc_6qVmmTyuF5oUe5r8AfAK: 'west-beacy-bunch',
  lc_k2CjAh6AcTo17TD8CioB: 'manhattan-75',
  lc_9zzoUExHJD9UsVQfJeos: 'larkspur',
  lc_dMmpZqrfzANdCfiQ7TQa: 'prospera',
  lc_xSWNKaojNUTfybNXAYDJ: 'hadar',
}

export default function LocationPage() {}

export const getServerSideProps = (async (context) => {
  const slugOrExternId = context.params?.id ? `${context.params.id}` : null

  if (!slugOrExternId) {
    return { notFound: true }
  }

  if (slugOrExternId in redirects) {
    return {
      redirect: {
        destination: expandRoute(['n_id', { id: redirects[slugOrExternId] }]),
        permanent: false,
      },
    }
  }

  const location = await prisma.location.findUnique({
    where: { externId: slugOrExternId },
  })

  if (!location) {
    return { notFound: true }
  }

  return {
    redirect: {
      destination: expandRoute(['n_id', { id: location.externId }]),
      permanent: false,
    },
  }
}) satisfies GetServerSideProps
