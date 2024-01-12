import type { NextApiRequest, NextApiResponse } from 'next'
import withProfile, { ProfileWithWallet } from '@/utils/api/withProfile'
import prisma from '@/utils/prisma'

export interface LocationVoteParams {
  locationId?: string
  votes?: {
    [key: string]: number
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: { profile: ProfileWithWallet } }
) {
  const profile = opts.auth.profile

  const params = req.body as LocationVoteParams

  if (!(req.method == 'GET' || req.method == 'POST')) {
    res.status(405).send({ message: 'Method not allowed' })
    return
  }

  if (req.method == 'GET') {
    const location = await prisma.location.findUnique({
      where: { externId: params.locationId as string },
      include: {
        votes: {
          select: {
            count: true,
          },
          where: {
            profileId: profile.id,
          },
        },
      },
    })

    if (!location) {
      res.status(404).send({ message: 'Location not found' })
      return
    }

    res
      .status(200)
      .send({ votes: location.votes.length > 0 ? location.votes[0].count : 0 })
    return
  }

  if (!params.votes) {
    res.status(400).send({ message: 'Votes not specified' })
    return
  }

  const totalVotes = Object.values(params.votes).reduce((a, b) => a + b, 0)
  if (profile.wallet.cabinTokenBalance.lessThan(totalVotes)) {
    res.status(400).send({ message: 'Not enough tokens for this many votes' })
    return
  }

  const upserts = []
  for (const [locationId, votes] of Object.entries(params.votes)) {
    const location = await prisma.location.findUnique({
      where: { externId: locationId as string },
    })

    if (!location) {
      res.status(404).send({ message: 'Location not found' })
      return
    }

    upserts.push(
      prisma.locationVote.upsert({
        where: {
          profileId_locationId: {
            profileId: profile.id,
            locationId: location.id,
          },
        },
        update: {
          count: votes,
        },
        create: {
          profile: {
            connect: {
              id: profile.id,
            },
          },
          location: {
            connect: {
              id: location.id,
            },
          },
          count: votes,
        },
      })
    )
  }

  await prisma.$transaction(upserts)

  res.status(200).send({ message: 'OK' })
}

export default withProfile(handler)
