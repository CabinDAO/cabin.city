/* eslint-disable @typescript-eslint/no-explicit-any */
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { CreateProfile, CreateProfileInput } from '@/fauna/lib/CreateProfile'
import { ironOptions } from '@/lib/next-server/iron-options'
import { ProfileAvatarInput } from '@/generated/graphql'
import { GetAccountHats } from '@/fauna/lib/GetAccountHats'
import { getProfileRoleFromHat } from '@/lib/hats/hats-utils'
import { hatsClient } from '@/lib/hats/hatsClient'
import { GetHatsByIdsDocument } from '@/generated/gql/hats/graphql'
import { FAUNA_ERROR_TO_MESSAGE_MAPPING } from '@/utils/profile-submission'
import withAuth from '@/utils/api/withAuth'

export interface CreateProfileBody {
  address: string
  name: string
  email: string
  avatar: ProfileAvatarInput | undefined
  externalUserId: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  opts?: { auth: { externalUserId: string } }
) => {
  const { method } = req

  switch (method) {
    case 'POST':
      const body = req.body as CreateProfileBody
      const externalUserId = opts?.auth?.externalUserId

      if (!externalUserId) {
        res.status(401).send({ error: 'Missing externalUserId' })
        return
      }

      try {
        const roles = await _getProfileRolesForAccount(body.address)
        console.info('roles', roles)

        const profile = await _createProfile({
          address: body.address,
          name: body.name,
          email: body.email,
          roles,
          avatar: body.avatar,
          externalUserId,
        })
        const profileId = profile.ref.id
        res.send({ profileId })
      } catch (err) {
        const error = err as Error

        const mappedError = FAUNA_ERROR_TO_MESSAGE_MAPPING[error.message]

        if (mappedError) {
          res.status(400).send({ error: mappedError })
        } else {
          console.error('Error creating profile', err)
          res.status(500).send({ error: 'Error creating profile' })
        }
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function _getProfileRolesForAccount(address: string): Promise<any> {
  // First get hats associated with the account
  const resp: any = await faunaServerClient.query(GetAccountHats(address))
  if (!resp.data || resp.data.length === 0) return []

  // Then get hat details from the subgraph
  const hatIds = resp.data.map((hat: any) => hat.data.hatId)
  const { data } = await hatsClient.query({
    query: GetHatsByIdsDocument,
    variables: {
      ids: hatIds,
    },
  })

  // Then map the hats to profile roles
  return data.hats.map((hat: any) => getProfileRoleFromHat(hat))
}

function _createProfile(input: CreateProfileInput): Promise<any> {
  return faunaServerClient.query(CreateProfile(input))
}

export default withIronSessionApiRoute(withAuth(handler), ironOptions)
