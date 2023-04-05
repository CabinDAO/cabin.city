/* eslint-disable @typescript-eslint/no-explicit-any */
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { CreateProfile, CreateProfileInput } from '@/fauna/lib/CreateProfile'
import { validateSessionMessage } from '@/lib/next-server/siwe'
import { SiweMessage } from 'siwe'
import { ironOptions } from '@/lib/next-server/iron-options'
import { ProfileAvatarInput } from '@/generated/graphql'
import { GetAccountHats } from '@/fauna/lib/GetAccountHats'
import { getProfileRoleFromHat } from '@/lib/hats/hats-utils'
import { hatsClient } from '@/lib/hats/hatsClient'
import { GetHatsByIdsDocument } from '@/generated/gql/hats/graphql'

export interface CreateProfileBody {
  message: SiweMessage
  signature: string
  name: string
  email: string
  avatar: ProfileAvatarInput | undefined
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      // A valid signed message is required to create a profile to ensure the profile is associated with the correct account/address.
      const validatedMessage = await validateSessionMessage({
        req,
        res,
        ...req.body,
      })

      if (!validatedMessage) return

      const body = req.body as CreateProfileBody

      const roles = await _getProfileRolesForAccount(validatedMessage.address)
      console.info('roles', roles)

      const profile = await _createProfile({
        address: validatedMessage.address,
        name: body.name,
        email: body.email,
        roles,
        avatar: body.avatar,
      })
      const profileId = profile.ref.id
      res.send({ profileId })
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

export default withIronSessionApiRoute(handler, ironOptions)
