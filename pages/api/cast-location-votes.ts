import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import type { NextApiRequest, NextApiResponse } from 'next'
import { castLocationVotes } from '@/lib/fauna-server/castLocationVotes'
import withAuth from '@/utils/api/withAuth'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { GetProfileByExternalUserId } from '@/fauna/lib/GetProfileByExternalUserId'

export interface CastLocationVotesBody {
  [key: string]: number
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts?: { auth?: { externalUserId?: string } }
) {
  const externalUserId = opts?.auth?.externalUserId

  if (!externalUserId) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  // Get the user's profile from the request
  const profile = await _getProfile(externalUserId)

  const profileId = profile?.ref?.id

  if (!profileId) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  await castLocationVotes({ profileId, voteModifiersByLocationId: req.body })

  res.status(200).send({ message: 'OK' })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _getProfile(externalUserId: string): Promise<any> {
  return faunaServerClient.query(GetProfileByExternalUserId(externalUserId))
}

export default withIronSessionApiRoute(withAuth(handler), ironOptions)
