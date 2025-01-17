import type { NextApiRequest, NextApiResponse } from 'next'
import { cabinTokenConfigForEnv } from '@/lib/protocol-config'
import { getAlchemySdk } from '@/lib/chains'
import { onchainAmountToDecimal, prisma } from '@/lib/prisma'
import { $Enums, Prisma } from '@prisma/client'
import { toErrorString } from '@/utils/api/error'
import { expandRoute } from '@/utils/routing'
import { canEditProfile } from '@/lib/permissions'
import {
  OptsWithAuth,
  requireUser,
  wrapHandler,
  ProfileWithWallet,
} from '@/utils/api/wrapHandler'
import {
  ProfileGetResponse,
  CitizenshipStatus,
  ProfileFragment,
  ContactFieldType,
  ProfileEditParams,
  ProfileQueryInclude,
  ProfileWithRelations,
  ProfileEditResponse,
  ProfileTag,
} from '@/utils/types/profile'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: OptsWithAuth
) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res)
      return
    case 'POST':
      const user = await requireUser(opts.auth)
      await handlePost(req, res, user)
      return
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).send({ error: 'Method not allowed' })
      return
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<ProfileGetResponse>
) {
  const profile = await prisma.profile.findUnique({
    where: {
      externId: req.query.externId as string,
    },
    include: ProfileQueryInclude,
  })

  res.status(profile ? 200 : 404).send({
    profile: profile
      ? profileToFragment(profile as ProfileWithRelations)
      : null,
  })
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<ProfileEditResponse>,
  user: ProfileWithWallet
) {
  const parsed = ProfileEditParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const externId = req.query.externId as string

  if (!canEditProfile(user, { externId })) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  const profileToEdit = await prisma.profile.findUnique({
    where: {
      externId: externId,
    },
  })

  if (!profileToEdit) {
    res.status(404).send({ error: 'Profile not found' })
    return
  }

  const tokenBalance = params.data.walletAddress
    ? onchainAmountToDecimal(
        (
          await getAlchemySdk(
            cabinTokenConfigForEnv.networkName
          ).core.getTokenBalances(params.data.walletAddress, [
            cabinTokenConfigForEnv.contractAddress,
          ])
        ).tokenBalances[0].tokenBalance ?? '0'
      )
    : new Prisma.Decimal(0)

  const txns: Prisma.PrismaPromise<unknown>[] = [
    prisma.profile.update({
      data: {
        name: params.data.name,
        email: params.data.email,
        bio: params.data.bio,
        longBio: params.data.longBio,
        avatarCfId: params.data.avatarCfId,
        address: params.data.address
          ? {
              upsert: {
                create: params.data.address,
                update: params.data.address,
              },
            }
          : undefined,
        tags:
          params.data.tags !== undefined
            ? { set: params.data.tags }
            : undefined,
        wallet: params.data.walletAddress
          ? {
              connectOrCreate: {
                where: {
                  address: params.data.walletAddress.toLowerCase(),
                },
                create: {
                  address: params.data.walletAddress.toLowerCase(),
                  cabinTokenBalance: tokenBalance,
                },
              },
            }
          : params.data.walletAddress === null
          ? {
              disconnect: true,
            }
          : undefined,
      },
      where: {
        id: profileToEdit.id,
      },
    }),
  ]

  if (params.data.contactFields) {
    txns.push(
      prisma.profileContactField.deleteMany({
        where: {
          profileId: profileToEdit.id,
        },
      })
    )
    txns.push(
      prisma.profileContactField.createMany({
        data: params.data.contactFields.map((field) => ({
          type: field.type,
          value: field.value,
          profileId: profileToEdit.id,
        })),
      })
    )
  }

  if (params.roleTypes) {
    const newRoleTypes = params.roleTypes
    const currentRoles = await prisma.role.findMany({
      where: {
        profileId: profileToEdit.id,
        level: $Enums.RoleLevel.Apprentice,
      },
    })

    const rolesToDelete = currentRoles.filter((role) => {
      for (const newType of newRoleTypes) {
        if (role.type === newType) return false
      }
      return true
    })

    const rolesToAdd = newRoleTypes.filter((newType) => {
      for (const role of currentRoles) {
        if (role.type === newType) return false
      }
      return true
    })

    txns.push(
      prisma.role.deleteMany({
        where: {
          id: {
            in: rolesToDelete.map((role) => role.id),
          },
        },
      })
    )
    txns.push(
      prisma.role.createMany({
        data: rolesToAdd.map((type) => ({
          type: type as $Enums.RoleType,
          level: $Enums.RoleLevel.Apprentice,
          profileId: profileToEdit.id,
        })),
      })
    )
  }

  await prisma.$transaction(txns)

  const newProfileValues = await prisma.profile.findUnique({
    where: { id: profileToEdit.id },
    include: ProfileQueryInclude,
  })

  await res.revalidate(
    expandRoute(['profile_id', { id: profileToEdit.externId }])
  )

  res.status(200).send({
    profile: profileToFragment(newProfileValues as ProfileWithRelations),
  })
}

export const profileToFragment = (
  profile: ProfileWithRelations
): ProfileFragment => {
  return {
    createdAt: profile.createdAt.toISOString(),
    externId: profile.externId,
    privyDID: profile.privyDID,
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    longBio: profile.longBio,
    avatarCfId: profile.avatarCfId,
    address: profile.address
      ? {
          formattedAddress: profile.address.formattedAddress,
          locality: profile.address.locality,
          admininstrativeAreaLevel1: profile.address.admininstrativeAreaLevel1,
          admininstrativeAreaLevel1Short:
            profile.address.admininstrativeAreaLevel1Short,
          country: profile.address.country,
          countryShort: profile.address.countryShort,
          lat: profile.address.lat,
          lng: profile.address.lng,
        }
      : null,
    citizenshipStatus: profile.citizenshipStatus as CitizenshipStatus,
    citizenshipTokenId: profile.citizenshipTokenId,
    citizenshipMintedAt: profile.citizenshipMintedAt
      ? profile.citizenshipMintedAt.toISOString()
      : null,
    cabinTokenBalanceInt: profile.wallet
      ? Math.floor(profile.wallet.cabinTokenBalance.toNumber())
      : null,
    voucher: profile.voucher
      ? {
          externId: profile.voucher.externId,
          name: profile.voucher.name,
        }
      : null,
    wallet: profile.wallet
      ? {
          address: profile.wallet.address,
        }
      : null,
    contactFields: profile.contactFields.map((cf) => ({
      type: cf.type as ContactFieldType,
      value: cf.value,
    })),
    tags: profile.tags as ProfileTag[],
    stamps: profile.stamps
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((stamp) => ({
        id: stamp.stamp.id,
        name: stamp.stamp.name,
      })),
  }
}

export default wrapHandler(handler)
