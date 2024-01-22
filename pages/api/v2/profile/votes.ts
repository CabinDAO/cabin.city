import type { NextApiRequest, NextApiResponse } from 'next'
import withProfile, { ProfileWithWallet } from '@/utils/api/withProfile'
import { prisma } from '@/utils/prisma'

export type ProfileVotesResponse = {
  votingPower: number
  votes: {
    count: number
    location: {
      _id: string
      name: string
      publishedAt: string | null
    }
  }[]
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: { profile: ProfileWithWallet } }
) {
  if (req.method != 'GET') {
    res.status(405).send({ message: 'Method not allowed' })
    return
  }

  const profile = opts.auth.profile

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
        _id: v.location.externId,
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

export default withProfile(handler)
