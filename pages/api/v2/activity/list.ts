import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PAGE_SIZE } from '@/utils/api/backend'
import {
  ActivityListParams,
  ActivityListFragment,
  ActivityListResponse,
  ActivityType,
  ActivityWithRelations,
  ActivityQueryInclude,
} from '@/utils/types/activity'
import {
  AvatarFragmentType,
  CitizenshipStatus,
  RoleFragment,
  RoleLevel,
  RoleType,
} from '@/utils/types/profile'
import { OfferType } from '@/utils/types/offer'
import { LocationType } from '@/utils/types/location'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityListResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const params: ActivityListParams = {
    profileId: req.query.profileId
      ? (req.query.profileId as string)
      : undefined,
    page: req.query.page ? parseInt(req.query.page as string) : undefined,
    pageSize: req.query.pageSize
      ? Math.max(Math.min(parseInt(req.query.pageSize as string), PAGE_SIZE), 1)
      : undefined,
  }

  const activityQuery: Prisma.ActivityFindManyArgs = {
    where: params.profileId
      ? {
          profile: {
            externId: params.profileId,
          },
        }
      : undefined,
    include: ActivityQueryInclude,
    orderBy: {
      createdAt: 'desc',
    },
    skip: params.page ? PAGE_SIZE * (params.page - 1) : undefined,
    take: params.pageSize ?? PAGE_SIZE,
  }

  // await Promise.all() might be even better here because its parallel, while transaction is sequential
  const [activities, totalCount] = await prisma.$transaction([
    prisma.activity.findMany(activityQuery),
    prisma.activity.count({ where: activityQuery.where }),
  ])

  let activtiesWithMyReactions: { [key: number]: boolean } = {}
  if (opts.auth.authToken) {
    const profile = await requireProfile(req, res, opts)
    const myReactions = await prisma.activityReaction.findMany({
      select: { activityId: true },
      where: {
        profile: { id: profile.id },
        activity: {
          id: {
            in: activities.map((a) => a.id),
          },
        },
      },
    })
    activtiesWithMyReactions = myReactions.reduce((obj, r, i) => {
      obj[i] = true
      return obj
    }, activtiesWithMyReactions)
  }

  res.status(200).send({
    activities: toFragments(
      activities as ActivityWithRelations[],
      activtiesWithMyReactions
    ),
    count: activities.length,
    totalCount,
  })
}

const toFragments = (
  activities: ActivityWithRelations[],
  activtiesWithMyReactions: { [key: number]: boolean }
): ActivityListFragment[] => {
  return activities.map((activity) => {
    return {
      externId: activity.externId,
      createdAt: activity.createdAt.toISOString(),
      type: activity.type as ActivityType,
      metadata: {
        text: activity.text || undefined,
        citizenshipTokenId: activity.profile.citizenshipTokenId || undefined,
        badge: activity.badge
          ? {
              id: activity.badge.id,
              otterspaceBadgeId: activity.badge.otterspaceBadgeId,
              spec: {
                name: activity.badge.spec.name,
                description: activity.badge.spec.description,
                image: activity.badge.spec.image,
              },
            }
          : undefined,
        role: activity.role
          ? {
              hatId: activity.role.walletHat?.hatId || null,
              type: activity.role.type as RoleType,
              level: activity.role.level as RoleLevel,
            }
          : undefined,
        location: activity.location
          ? {
              externId: activity.location.externId,
              name: activity.location.name,
              description: activity.location.description,
              tagline: activity.location.tagline,
              bannerImageIpfsHash: activity.location.bannerImageIpfsHash,
              steward: {
                externId: activity.location.steward.externId,
              },
              address: {
                locality: activity.location.address?.locality || '',
                admininstrativeAreaLevel1Short:
                  activity.location.address?.admininstrativeAreaLevel1Short ||
                  '',
                country: activity.location.address?.country || '',
                countryShort: activity.location.address?.countryShort || '',
              },
              offerCount: 0, // TODO: implement
            }
          : undefined,
        offer: activity.offer
          ? {
              externId: activity.offer.externId,
              type: activity.offer.type as OfferType,
              title: activity.offer.title,
              startDate: activity.offer.startDate.toISOString(),
              endDate: activity.offer.endDate.toISOString(),
              imageIpfsHash: activity.offer.imageIpfsHash,
              location: {
                externId: activity.offer.location.externId,
                name: activity.offer.location.name,
                type: activity.offer.location.type as LocationType,
                bannerImageIpfsHash:
                  activity.offer.location.bannerImageIpfsHash,
                address: activity.offer.location.address
                  ? {
                      locality: activity.offer.location.address.locality || '',
                      admininstrativeAreaLevel1Short:
                        activity.offer.location.address
                          .admininstrativeAreaLevel1Short || '',
                      country: activity.offer.location.address.country || '',
                      countryShort:
                        activity.offer.location.address.countryShort || '',
                    }
                  : null,
                steward: {
                  externId: activity.offer.location.steward.externId,
                },
              },
            }
          : undefined,
      },
      profile: {
        externId: activity.profile.externId,
        name: activity.profile.name,
        citizenshipStatus: activity.profile
          .citizenshipStatus as CitizenshipStatus,
        roles: activity.profile.roles.map((role) => ({
          hatId: role.walletHat?.hatId || null,
          type: role.type as RoleType,
          level: role.level as RoleLevel,
        })),
        avatarUrl: activity.profile.avatar ? activity.profile.avatar.url : '',
      },
      reactionCount: activity._count.reactions,
      hasReactionByMe: activtiesWithMyReactions[activity.id] || false,
    }
  })
}

export default withAuth(handler)
