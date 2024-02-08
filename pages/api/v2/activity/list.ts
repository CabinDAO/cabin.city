import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
import { Prisma } from '@prisma/client'
import { PAGE_SIZE } from '@/utils/api/backend'
import {
  ActivityListParams,
  ActivityListFragment,
  ActivityListResponse,
  ActivityType,
} from '@/utils/types/activity'
import { CitizenshipStatus, RoleLevel, RoleType } from '@/utils/types/profile'
import { OfferType } from '@/utils/types/offer'
import { LocationType } from '@/utils/types/location'
import { withAuth } from '@/utils/api/withAuth'

// must match the includes on query below
type ActivityWithRelations = Prisma.ActivityGetPayload<{
  include: {
    profile: {
      select: {
        externId: true
        name: true
        citizenshipStatus: true
        citizenshipTokenId: true
        roles: {
          include: {
            walletHat: true
          }
        }
        avatar: {
          select: {
            url: true
          }
        }
      }
    }
    badge: {
      select: {
        id: true
        otterspaceBadgeId: true
        spec: true
      }
    }
    role: {
      include: {
        walletHat: true
      }
    }
    location: {
      select: {
        externId: true
        type: true
        name: true
        tagline: true
        description: true
        bannerImageIpfsHash: true
        sleepCapacity: true
        caretaker: {
          select: {
            externId: true
            name: true
            createdAt: true
          }
        }
        publishedAt: true
        internetSpeedMbps: true
        address: {
          select: {
            locality: true
            admininstrativeAreaLevel1Short: true
            country: true
          }
        }
      }
    }
    offer: {
      select: {
        externId: true
        type: true
        title: true
        description: true
        startDate: true
        endDate: true
        imageIpfsHash: true
        price: true
        priceInterval: true
        location: {
          select: {
            externId: true
            name: true
            type: true
            bannerImageIpfsHash: true
            publishedAt: true
            address: {
              select: {
                locality: true
                admininstrativeAreaLevel1Short: true
                country: true
              }
            }
          }
        }
      }
    }
  }
}>

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityListResponse>
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
    include: {
      profile: {
        select: {
          externId: true,
          name: true,
          citizenshipStatus: true,
          citizenshipTokenId: true,
          roles: {
            include: {
              walletHat: true,
            },
          },
          avatar: {
            select: {
              url: true,
            },
          },
        },
      },
      badge: {
        select: {
          id: true,
          otterspaceBadgeId: true,
          spec: true,
        },
      },
      role: {
        include: {
          walletHat: true,
        },
      },
      location: {
        select: {
          externId: true,
          name: true,
          type: true,
          tagline: true,
          description: true,
          bannerImageIpfsHash: true,
          sleepCapacity: true,
          caretaker: {
            select: {
              externId: true,
              name: true,
              createdAt: true,
            },
          },
          publishedAt: true,
          internetSpeedMbps: true,
          address: {
            select: {
              locality: true,
              admininstrativeAreaLevel1Short: true,
              country: true,
            },
          },
        },
      },
      offer: {
        select: {
          externId: true,
          type: true,
          title: true,
          description: true,
          startDate: true,
          endDate: true,
          imageIpfsHash: true,
          price: true,
          priceInterval: true,
          location: {
            select: {
              externId: true,
              name: true,
              type: true,
              bannerImageIpfsHash: true,
              publishedAt: true,
              address: {
                select: {
                  locality: true,
                  admininstrativeAreaLevel1Short: true,
                  country: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: params.page ? PAGE_SIZE * (params.page - 1) : undefined,
    take: params.pageSize ?? PAGE_SIZE,
  }

  // await Promise.all() might be even better here because its parallel, while transaction is sequential
  const [activities, count] = await prisma.$transaction([
    prisma.activity.findMany(activityQuery),
    prisma.activity.count({ where: activityQuery.where }),
  ])

  // console.log(count, profiles)
  res.status(200).send({
    activities: toFragments(activities as ActivityWithRelations[]),
    count,
  })
}

const toFragments = (
  activities: ActivityWithRelations[]
): ActivityListFragment[] => {
  return activities.map((activity) => {
    return {
      externId: activity.externId,
      createdAt: activity.createdAt.toISOString(),
      type: activity.type as ActivityType,
      text: activity.text,
      metadata: {
        citizenshipTokenId: activity.profile.citizenshipTokenId ?? undefined,
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
              sleepCapacity: activity.location.sleepCapacity,
              address: {
                locality: activity.location.address?.locality || '',
                admininstrativeAreaLevel1Short:
                  activity.location.address?.admininstrativeAreaLevel1Short ||
                  '',
                country: activity.location.address?.country || '',
              },
              voteCount: 0, // TODO: implement
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
                publishedAt: activity.offer.location.publishedAt
                  ? activity.offer.location.publishedAt.toISOString()
                  : null,
                address: activity.offer.location.address
                  ? {
                      locality: activity.offer.location.address.locality || '',
                      admininstrativeAreaLevel1Short:
                        activity.offer.location.address
                          .admininstrativeAreaLevel1Short || '',
                      country: activity.offer.location.address.country || '',
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
        avatarUrl: activity.profile.avatar ? activity.profile.avatar.url : '',
      },
      reactionCount: 0, // TODO: implement
      hasReactionByMe: false, // TODO: implement
    }
  })
}

export default withAuth(handler)
