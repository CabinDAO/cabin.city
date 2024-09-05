// need these types in a separate file because prisma cant be imported in the frontend

import {
  StampFragment,
  CitizenshipStatus,
  RoleFragment,
} from '@/utils/types/profile'
import {
  LocationFragment,
  ShortAddressFragmentType,
} from '@/utils/types/location'
import { EventFragment } from '@/utils/types/event'
import { Prisma } from '@prisma/client'
import { APIError, PageParams, Paginated } from '@/utils/types/shared'
import { z } from 'zod'

// must match prisma's $Enums.ActivityType
export enum ActivityType {
  Text = 'Text',
  ProfileCreated = 'ProfileCreated',
  RoleAdded = 'RoleAdded',
  StampAdded = 'StampAdded',
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
    stamp?: StampFragment
    role?: RoleFragment
    location?: Pick<
      LocationFragment,
      'externId' | 'name' | 'bannerImageIpfsHash' | 'eventCount'
    > & {
      address: ShortAddressFragmentType
      steward: LocationFragment['steward'] extends null
        ? null
        : Pick<NonNullable<LocationFragment['steward']>, 'externId'> | null
    }
    offer?: Pick<
      EventFragment,
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

export const ActivityListParams = z
  .object({
    profileId: z.string().optional(),
  })
  .merge(PageParams)
  .strict()
export type ActivityListParamsType = z.infer<typeof ActivityListParams>

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
        avatarUrl: true
        roles: {
          include: {
            walletHat: true
          }
        }
      }
    }
    profileStamp: {
      select: {
        stamp: {
          select: {
            id: true
            name: true
          }
        }
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
        description: true
        bannerImageIpfsHash: true
        address: {
          select: {
            locality: true
            admininstrativeAreaLevel1Short: true
            country: true
            countryShort: true
            lat: true
            lng: true
          }
        }
        steward: {
          select: {
            externId: true
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
                lat: true
                lng: true
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
      avatarUrl: true,
      roles: {
        include: {
          walletHat: true,
        },
      },
    },
  },
  profileStamp: {
    select: {
      stamp: {
        select: {
          id: true,
          name: true,
        },
      },
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
      description: true,
      bannerImageIpfsHash: true,
      address: {
        select: {
          locality: true,
          admininstrativeAreaLevel1Short: true,
          country: true,
          countryShort: true,
          lat: true,
          lng: true,
        },
      },
      steward: {
        select: {
          externId: true,
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
              lat: true,
              lng: true,
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
