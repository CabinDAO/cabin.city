import type { NextApiRequest, NextApiResponse } from 'next'
import { cabinTokenConfig } from '@/lib/protocol-config'
import { getAlchemySdk } from '@/lib/chains'
import { onchainAmountToDecimal, prisma } from '@/lib/prisma'
import { $Enums, Prisma } from '@prisma/client'
import { toErrorString } from '@/utils/api/error'
import {
  AuthData,
  requireProfile,
  withAuth,
  ProfileWithWallet,
} from '@/utils/api/withAuth'
import {
  ProfileGetResponse,
  RoleLevel,
  RoleType,
  CitizenshipStatus,
  ProfileFragment,
  ContactFieldType,
  ProfileEditParams,
  ProfileQueryInclude,
  ProfileWithRelations,
  ProfileEditResponse,
} from '@/utils/types/profile'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res)
      return
    case 'POST':
      const profile = await requireProfile(req, res, opts)
      await handlePost(req, res, profile)
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
  profile: ProfileWithWallet
) {
  const parsed = ProfileEditParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const externId = req.query.externId as string

  if (externId != profile.externId && !profile.isAdmin) {
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
            cabinTokenConfig.networkName
          ).core.getTokenBalances(params.data.walletAddress, [
            cabinTokenConfig.contractAddress,
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
        avatarUrl: params.data.avatarUrl,
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
                  address: params.data.walletAddress,
                },
                create: {
                  address: params.data.walletAddress,
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

  res.status(200).send({
    profile: profileToFragment(newProfileValues as ProfileWithRelations),
  })
}

const profileToFragment = (profile: ProfileWithRelations): ProfileFragment => {
  return {
    createdAt: profile.createdAt.toISOString(),
    externId: profile.externId,
    privyDID: profile.privyDID,
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
    address: profile.address
      ? {
          locality: profile.address.locality,
          admininstrativeAreaLevel1Short:
            profile.address.admininstrativeAreaLevel1Short,
          country: profile.address.country,
          countryShort: profile.address.countryShort,
          lat: profile.address.lat,
          lng: profile.address.lng,
        }
      : undefined,
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
          badges: profile.wallet.badges.map((badge) => ({
            id: badge.id,
            spec: {
              id: badge.spec.id,
              name: badge.spec.name,
              description: badge.spec.description,
            },
          })),
        }
      : null,
    contactFields: profile.contactFields.map((cf) => ({
      type: cf.type as ContactFieldType,
      value: cf.value,
    })),
    roles: profile.roles.map((role) => ({
      hatId: role.walletHat?.hatId || null,
      type: role.type as RoleType,
      level: role.level as RoleLevel,
    })),
  }
}

export default withAuth(handler)
