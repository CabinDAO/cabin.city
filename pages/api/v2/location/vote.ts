import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'

export interface LocationVoteParams {
  locationId?: string
  votes?: {
    [key: string]: number
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  const profile = await requireProfile(req, res, opts)

  const params = req.body as LocationVoteParams

  if (!(req.method == 'GET' || req.method == 'POST')) {
    res.status(405).send({ error: 'Method not allowed' })
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
      res.status(404).send({ error: 'Location not found' })
      return
    }

    res
      .status(200)
      .send({ votes: location.votes.length > 0 ? location.votes[0].count : 0 })
    return
  }

  if (!params.votes) {
    res.status(400).send({ error: 'Votes not specified' })
    return
  }

  const totalVotes = Object.values(params.votes).reduce((a, b) => a + b, 0)
  if (profile.wallet.cabinTokenBalance.lessThan(totalVotes)) {
    res.status(400).send({ error: 'Not enough tokens for this many votes' })
    return
  }

  const upserts = []
  for (const [locationId, votes] of Object.entries(params.votes)) {
    const location = await prisma.location.findUnique({
      where: { externId: locationId as string },
    })

    if (!location) {
      res.status(404).send({ error: 'Location not found' })
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

export default withAuth(handler)
