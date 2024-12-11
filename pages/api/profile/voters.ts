import type { NextApiRequest, NextApiResponse } from 'next'
import { wrapHandler } from '@/utils/api/wrapHandler'
import { prisma } from '@/lib/prisma'
import {
  ProfileVotersParams,
  ProfileVotersResponse,
} from '@/utils/types/profile'
import { toErrorString } from '@/utils/api/error'

export default wrapHandler(handler)

const cacheTime = 3600

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileVotersResponse>
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const parsed = ProfileVotersParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const profiles = await prisma.profile.findMany({
    select: {
      name: true,
      externId: true,
      avatarCfId: true,
      wallet: {
        select: {
          address: true,
        },
      },
    },
    where: {
      wallet: { address: { in: params.addresses.map((a) => a.toLowerCase()) } },
    },
  })

  res.setHeader(
    'Cache-Control',
    `s-maxage=${cacheTime}, stale-while-revalidate`
  )

  res.status(200).send({
    profiles: profiles.reduce(
      (acc, profile) => ({
        ...acc,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [profile.wallet!.address]: {
          // ↑ wallet is never null because query requires wallet address
          name: profile.name,
          externId: profile.externId,
          avatarCfId: profile.avatarCfId,
        },
      }),
      {}
    ),
  })
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: cacheTime,
  }
}
