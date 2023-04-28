import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import type { NextApiRequest, NextApiResponse } from 'next'
import { castLocationVotes } from '@/lib/fauna-server/castLocationVotes'

export interface CastLocationVotesBody {
  [key: string]: number
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the user's profile from the request
  const profileId = req.session.profile?.id
  if (!profileId) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  const voteModifiersByLocationId = JSON.parse(
    req.body
  ) as CastLocationVotesBody

  await castLocationVotes({ profileId, voteModifiersByLocationId })

  res.status(200).send({ message: 'OK' })
}

export default withIronSessionApiRoute(handler, ironOptions)
