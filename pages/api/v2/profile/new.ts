import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireAuth, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/utils/prisma'
import { $Enums, Profile } from '@prisma/client'
import { getProfileRoleFromHat } from '@/lib/hats/hats-utils'
import { randomId } from '@/utils/random'

export interface ProfileNewParams {
  address: string
  name: string
  email: string
  avatar:
    | {
        url: string
        contractAddress?: string | null
        title?: string | null
        tokenId?: string | null
        tokenUri?: string | null
        network?: string | null
      }
    | undefined
  externalUserId: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const privyDID = requireAuth(req, res, opts)
  const body = req.body as ProfileNewParams

  const profile = await prisma.profile.create({
    data: {
      externId: randomId('profile'),
      privyDID: privyDID,
      name: body.name,
      email: body.email,
      bio: '',
      location: '',
      wallet: {
        connectOrCreate: {
          where: {
            address: body.address,
          },
          create: {
            address: body.address,
            cabinTokenBalance: '0',
          },
        },
      },
      avatar: body.avatar
        ? {
            create: {
              url: body.avatar.url,
              contractAddress: body.avatar.contractAddress,
              title: body.avatar.title,
              tokenId: body.avatar.tokenId,
              tokenUri: body.avatar.tokenUri,
              network: body.avatar.network,
            },
          }
        : undefined,
    },
  })

  console.log('profile', profile)

  await createHats(profile)

  res.status(200).send({ externId: profile.externId })
}

async function createHats(profile: Profile) {
  const hats = await prisma.hat.findMany({
    where: {
      wallets: {
        some: {
          walletId: profile.walletId,
        },
      },
    },
  })

  console.log('hats', hats)

  if (!hats.length) return

  const rolesToAdd = hats
    .map((hat) => {
      const r = getProfileRoleFromHat({
        id: `${hat.id}`,
        prettyId: hat.hatsProtocolId,
      })
      return {
        hatId: hat.id,
        type: r?.role,
        level: r?.level,
      }
    })
    .filter((r) => {
      return r.type && r.level
    })

  console.log('rolesToAdd', rolesToAdd)

  const roles = await prisma.role.createMany({
    data: rolesToAdd.map((r) => {
      return {
        profileId: profile.id,
        hatId: r.hatId,
        type: r.type as $Enums.RoleType,
        level: r.level as $Enums.RoleLevel,
      }
    }),
    skipDuplicates: true,
  })

  console.log('roles', roles)
}

export default withAuth(handler)
