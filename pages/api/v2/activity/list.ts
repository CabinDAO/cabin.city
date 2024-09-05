import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getPageParams } from '@/utils/api/backend'
import {
  ActivityListFragment,
  ActivityListResponse,
  ActivityType,
  ActivityWithRelations,
  ActivityQueryInclude,
  ActivityListParams,
} from '@/utils/types/activity'
import { CitizenshipStatus, RoleLevel, RoleType } from '@/utils/types/profile'
import { EventType } from '@/utils/types/event'
import { LocationType } from '@/utils/types/location'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { toErrorString } from '@/utils/api/error'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityListResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const parsed = ActivityListParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data
  const { skip, take } = getPageParams(params)

  const activityQuery: Prisma.ActivityFindManyArgs = {
    where: params.profileId
      ? {
          type: {
            notIn: ['VouchRequested'],
          },
          profile: {
            externId: params.profileId,
          },
        }
      : undefined,
    include: ActivityQueryInclude,
    orderBy: {
      createdAt: 'desc',
    },
    skip: skip,
    take: take,
  }

  const activities = await prisma.activity.findMany(activityQuery)

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
        stamp: activity.profileStamp
          ? {
              id: activity.profileStamp.stamp.id,
              name: activity.profileStamp.stamp.name,
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
              bannerImageIpfsHash: activity.location.bannerImageIpfsHash,
              steward: activity.location.steward
                ? {
                    externId: activity.location.steward.externId,
                  }
                : null,
              address: {
                locality: activity.location.address?.locality || '',
                admininstrativeAreaLevel1Short:
                  activity.location.address?.admininstrativeAreaLevel1Short ||
                  '',
                country: activity.location.address?.country || '',
                countryShort: activity.location.address?.countryShort || '',
                lat: activity.location.address?.lat || null,
                lng: activity.location.address?.lng || null,
              },
              eventCount: 0, // TODO: implement
            }
          : undefined,
        offer: activity.offer
          ? {
              externId: activity.offer.externId,
              type: activity.offer.type as EventType,
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
                      lat: activity.offer.location.address.lat || null,
                      lng: activity.offer.location.address.lng || null,
                    }
                  : null,
                steward: activity.offer.location.steward
                  ? {
                      externId: activity.offer.location.steward.externId,
                    }
                  : null,
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
        avatarUrl: activity.profile.avatarUrl,
      },
      reactionCount: activity._count.reactions,
      hasReactionByMe: activtiesWithMyReactions[activity.id] || false,
    }
  })
}

export default withAuth(handler)
