import type { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
import { formatQuery, prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { Sql } from '@prisma/client/runtime/library'
import { toErrorString } from '@/utils/api/error'
import { OptsWithAuth, requireAuth, wrapHandler } from '@/utils/api/wrapHandler'
import { resolveAddressOrName } from '@/lib/ens'
import { getPageParams } from '@/utils/api/backend'
import {
  CitizenshipStatus,
  ProfileSort,
  ProfileListParams,
  ProfileListResponse,
  ProfileListFragment,
  ProfileListParamsType,
} from '@/utils/types/profile'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileListResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  requireAuth(opts)

  const parsed = ProfileListParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const { ids: idsInOrder, totalCount } = await sortPrequery(params)

  const query: Prisma.ProfileFindManyArgs = {
    where: { id: { in: idsInOrder } },
    include: ListedProfileQueryInclude,
  }

  const profiles = await prisma.profile.findMany(query)

  const sortedProfiles = profiles.sort((a, b) => {
    return idsInOrder.indexOf(a.id) - idsInOrder.indexOf(b.id)
  })

  res.status(200).send({
    profiles: profilesToFragments(
      sortedProfiles as ListedProfileWithRelations[]
    ),
    count: profiles.length,
    totalCount: totalCount,
  })
}

const sortOrder = (sortParam: ProfileSort | undefined): Sql => {
  switch (sortParam) {
    case ProfileSort.CabinBalanceAsc:
      return Prisma.sql`COALESCE(w."cabinTokenBalance", 0) ASC, p."createdAt" DESC`
    case ProfileSort.CabinBalanceDesc:
      return Prisma.sql`COALESCE(w."cabinTokenBalance", 0) DESC, p."createdAt" DESC`
    case ProfileSort.StampCountAsc:
      return Prisma.sql`COUNT(ps."stampId") ASC, p."createdAt" DESC`
    case ProfileSort.StampCountDesc:
      return Prisma.sql`COUNT(ps."stampId") DESC, p."createdAt" DESC`
    case ProfileSort.CreatedAtAsc:
      return Prisma.sql`p."createdAt" ASC`
    case ProfileSort.CreatedAtDesc:
    default:
      return Prisma.sql`p."createdAt" DESC`
  }
}

// get ids for profiles sorted in proper order
const sortPrequery = async (params: ProfileListParamsType) => {
  const { skip, take } = getPageParams(params)

  const resolvedAddress = params.searchQuery
    ? await resolveAddressOrName(params.searchQuery)
    : undefined

  const bounds = params.latLngBounds
    ? params.latLngBounds.split(',').map((s) => parseFloat(s))
    : []

  const sqlQuery = Prisma.sql`
    SELECT p.id as "id"
    FROM "Profile" p
    LEFT JOIN "ProfileAddress" a ON p.id = a."profileId"
    LEFT JOIN "Wallet" w ON p."walletId" = w.id
    LEFT JOIN "ProfileStamp" ps ON p.id = ps."profileId"
    WHERE
      ${
        resolvedAddress
          ? Prisma.sql`w.address = ${resolvedAddress.toLowerCase()}`
          : params.searchQuery
          ? Prisma.sql`p.name ILIKE ${`%${params.searchQuery}%`}`
          : Prisma.sql`1=1`
      }
      AND
      ${
        bounds.length === 4
          ? Prisma.sql`a.lat <= ${bounds[0]} AND a.lat >= ${bounds[1]} AND a.lng <= ${bounds[2]} AND a.lng >= ${bounds[3]}`
          : Prisma.sql`1=1`
      }
    GROUP BY p.id, p."createdAt", w."cabinTokenBalance"
    ORDER BY ${sortOrder(params.sort)}
  `

  // TODO: add sort roder and we're done

  // console.log(formatQuery(sqlQuery.inspect().sql, sqlQuery.inspect().values))

  try {
    const [ids, totalCount] = await Promise.all([
      prisma.$queryRaw<{ id: number }[]>(
        Prisma.sql`${sqlQuery} LIMIT ${take} OFFSET ${skip}`
      ),
      prisma.$queryRaw<[{ count: bigint }]>(
        Prisma.sql`SELECT COUNT(*) as count FROM (${sqlQuery})`
      ),
    ])
    return {
      ids: ids.reduce((ids: number[], row) => [...ids, row.id], []),
      totalCount: Number(totalCount[0].count),
    }
  } catch (error: unknown) {
    Sentry.captureException(error)
    if (error instanceof Error) {
      console.error('Failed to sort or count profiles', {
        query: formatQuery(sqlQuery.inspect().sql, sqlQuery.inspect().values),
        errorStack: error.stack,
        params,
        take,
        skip,
      })
    }
    return { ids: [], totalCount: 0 }
  }
}

const profilesToFragments = (
  profiles: ListedProfileWithRelations[]
): ProfileListFragment[] => {
  return profiles.map((profile) => {
    return {
      createdAt: profile.createdAt.toISOString(),
      externId: profile.externId,
      privyDID: profile.privyDID,
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      avatarCfId: profile.avatarCfId,
      isAdmin: profile.isAdmin,
      mailingListOptIn: profile.mailingListOptIn,
      voucherId: profile.voucherId,
      citizenshipStatus: profile.citizenshipStatus as CitizenshipStatus,
      citizenshipTokenId: profile.citizenshipTokenId,
      citizenshipMintedAt: profile.citizenshipMintedAt
        ? profile.citizenshipMintedAt?.toISOString()
        : null,
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
        : null,
      roles: [],
      stampCount: profile._count.stamps || 0,
      cabinTokenBalanceInt: profile.wallet
        ? Math.floor(profile.wallet.cabinTokenBalance.toNumber())
        : null,
    }
  })
}

// must match ListedProfileQueryInclude below
type ListedProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    address: true
    wallet: true
    _count: {
      select: {
        stamps: true
      }
    }
  }
}>

// must match ListedProfileWithRelations  above
const ListedProfileQueryInclude = {
  address: true,
  wallet: true,
  _count: {
    select: {
      stamps: true,
    },
  },
} satisfies Prisma.ProfileInclude
