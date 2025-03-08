// need these types in a separate file because prisma cant be imported in the frontend

import { CitizenshipStatus, RoleFragment } from '@/utils/types/profile'
import {
  LocationFragment,
  ShortAddressFragmentType,
} from '@/utils/types/location'
import { EventFragment } from '@/utils/types/event'
import { StampFragment } from '@/utils/types/stamp'
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
      'externId' | 'name' | 'bannerImageCfId' | 'eventCount'
    > & {
      address: ShortAddressFragmentType
      stewards: Pick<
        NonNullable<LocationFragment['stewards']>[number],
        'externId'
      >[]
    }
    offer?: Pick<
      EventFragment,
      'externId' | 'type' | 'title' | 'startDate' | 'endDate' | 'location'
    >
  }

  profile: {
    externId: string
    name: string
    citizenshipStatus: CitizenshipStatus | null
    avatarCfId: string
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
        avatarCfId: true
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
        bannerImageCfId: true
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
        stewards: {
          select: {
            profile: {
              select: {
                externId: true
              }
            }
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
        price: true
        priceInterval: true
        location: {
          select: {
            externId: true
            name: true
            type: true
            bannerImageCfId: true
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
            stewards: {
              select: {
                profile: {
                  select: {
                    externId: true
                  }
                }
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
      avatarCfId: true,
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
      bannerImageCfId: true,
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
      stewards: {
        select: {
          profile: {
            select: {
              externId: true,
            },
          },
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
      price: true,
      priceInterval: true,
      location: {
        select: {
          externId: true,
          name: true,
          type: true,
          bannerImageCfId: true,
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
          stewards: {
            select: {
              profile: {
                select: {
                  externId: true,
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.ActivityInclude
