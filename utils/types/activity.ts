// need these types in a separate file because prisma cant be imported in the frontend

import {
  BadgeFragment,
  CitizenshipStatus,
  ProfileFragment,
  RoleFragment,
} from '@/utils/types/profile'
import {
  LocationFragment,
  ShortAddressFragmentType,
} from '@/utils/types/location'
import { OfferFragment } from '@/utils/types/offer'
import { Prisma } from '@prisma/client'
import { APIError, Paginated } from '@/utils/types/shared'

// must match prisma's $Enums.ActivityType
export enum ActivityType {
  Text = 'Text',
  ProfileCreated = 'ProfileCreated',
  RoleAdded = 'RoleAdded',
  BadgeAdded = 'BadgeAdded',
  CitizenshipVerified = 'CitizenshipVerified',
  LocationPublished = 'LocationPublished',
  OfferCreated = 'OfferCreated',
  VouchRequested = 'VouchRequested',
}

export type ActivityListFragment = {
  externId: string
  createdAt: string
  type: ActivityType
  metadata: {
    text?: string
    citizenshipTokenId?: number
    badge?: BadgeFragment
    role?: RoleFragment
    location?: Pick<
      LocationFragment,
      | 'externId'
      | 'steward'
      | 'name'
      | 'tagline'
      | 'bannerImageIpfsHash'
      | 'offerCount'
      | 'memberCount'
    > & { address: ShortAddressFragmentType }
    offer?: Pick<
      OfferFragment,
      | 'externId'
      | 'type'
      | 'title'
      | 'imageIpfsHash'
      | 'startDate'
      | 'endDate'
      | 'location'
    >
  }

  profile: {
    externId: string
    name: string
    citizenshipStatus: CitizenshipStatus | null
    roles: RoleFragment[]
    avatarUrl: string
  }

  reactionCount: number
  hasReactionByMe: boolean
}

export type ActivityListParams = {
  profileId?: string
  page?: number
  pageSize?: number
}

export type ActivityListResponse =
  | ({
      activities: ActivityListFragment[]
    } & Paginated)
  | APIError

export type ActivityReactParams = {
  externId: string
  action: 'like' | 'unlike'
}

export type ActivityReactResponse =
  | {
      reacted: boolean
    }
  | APIError

export type ActivityNewParams = {
  text: string
}

export type ActivityNewResponse =
  | {
      externId: string
    }
  | APIError

export type ActivityDeleteResponse =
  | {
      deleted: boolean
    }
  | APIError

export type ActivitySummaryResponse =
  | {
      profilesCount: number
      tokenHoldersCount: number
      citizensCount: number
    }
  | APIError

// must match ActivityQueryInclude below
export type ActivityWithRelations = Prisma.ActivityGetPayload<{
  include: {
    _count: {
      select: { reactions: true }
    }
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
        steward: {
          select: {
            externId: true
            name: true
            createdAt: true
          }
        }
        address: {
          select: {
            locality: true
            admininstrativeAreaLevel1Short: true
            country: true
            countryShort: true
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
            address: {
              select: {
                locality: true
                admininstrativeAreaLevel1Short: true
                country: true
                countryShort: true
              }
            }
            steward: {
              select: {
                externId: true
              }
            }
          }
        }
      }
    }
  }
}>

// must match ActivityWithRelations above
export const ActivityQueryInclude = {
  _count: {
    select: { reactions: true },
  },
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
      steward: {
        select: {
          externId: true,
          name: true,
          createdAt: true,
        },
      },
      address: {
        select: {
          locality: true,
          admininstrativeAreaLevel1Short: true,
          country: true,
          countryShort: true,
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
          address: {
            select: {
              locality: true,
              admininstrativeAreaLevel1Short: true,
              country: true,
              countryShort: true,
            },
          },
          steward: {
            select: {
              externId: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.ActivityInclude
