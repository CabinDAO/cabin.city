import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'

export type ProfileVotesResponse = {
  votingPower: number
  votes: {
    count: number
    location: {
      externId: string
      name: string
      publishedAt: string | null
    }
  }[]
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(req, res, opts)

  const votes = await prisma.locationVote.findMany({
    where: {
      profileId: profile.id,
    },
    include: {
      location: {
        select: {
          id: true,
          externId: true,
          name: true,
          publishedAt: true,
        },
      },
    },
  })

  const voteResp: ProfileVotesResponse['votes'] = []
  for (const v of votes) {
    voteResp.push({
      count: v.count,
      location: {
        externId: v.location.externId,
        name: v.location.name,
        publishedAt: v.location.publishedAt
          ? v.location.publishedAt.toISOString()
          : null,
      },
    })
  }

  res.status(200).send({
    votingPower: profile.wallet.cabinTokenBalance.floor().toNumber(),
    votes: voteResp,
  } as ProfileVotesResponse)
}

export default withAuth(handler)
