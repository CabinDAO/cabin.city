// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import {
  APIError,
  commaSeparatedArrayOf,
  PageParams,
  Paginated,
} from '@/utils/types/shared'
import { z } from 'zod'
import { isAddress } from 'viem'
import {
  AddressFragment,
  AddressFragmentType,
  ShortAddressFragmentType,
} from '@/utils/types/location'

// must match prisma's $Enums.RoleType
export enum RoleType {
  Caretaker = 'Caretaker',
  Builder = 'Builder',
  Gatherer = 'Gatherer',
  Naturalist = 'Naturalist',
  Creator = 'Creator',
  Resident = 'Resident',
}

// must match prisma's $Enums.RoleLevel
export enum RoleLevel {
  Apprentice = 'Apprentice',
  Artisan = 'Artisan',
  Custodian = 'Custodian',
}

// must match prisma's $Enums.CitizenshipStatus
export enum CitizenshipStatus {
  VouchRequested = 'VouchRequested',
  Vouched = 'Vouched',
  Verified = 'Verified',
}

export enum ProfileSort {
  CreatedAtAsc = 'CreatedAtAsc',
  CreatedAtDesc = 'CreatedAtDesc',
  CabinBalanceAsc = 'CabinBalanceAsc',
  CabinBalanceDesc = 'CabinBalanceDesc',
  BadgeCountAsc = 'BadgeCountAsc',
  BadgeCountDesc = 'BadgeCountDesc',
}
// must match prisma's $Enums.ProfileContactFieldType
export enum ContactFieldType {
  Twitter = 'Twitter',
  Instagram = 'Instagram',
  Discord = 'Discord',
  Telegram = 'Telegram',
  Email = 'Email',
  Website = 'Website',
  Farcaster = 'Farcaster',
  Lens = 'Lens',
  LinkedIn = 'LinkedIn',
}

export const ProfileAddressFragment = AddressFragment.omit({
  streetNumber: true,
  route: true,
  routeShort: true,
  postalCode: true,
}).strict()
export type ProfileAddressFragmentType = z.infer<typeof ProfileAddressFragment>

export type ProfileListFragment = {
  createdAt: string
  externId: string
  privyDID: string
  name: string
  email: string
  bio: string
  address: ShortAddressFragmentType | null
  avatarUrl: string
  isAdmin: boolean
  mailingListOptIn: boolean | null
  voucherId: number | null
  citizenshipStatus: CitizenshipStatus | null
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  roles: RoleFragment[]
  badgeCount: number
  cabinTokenBalanceInt: number | null
}

export const ProfileListParams = z
  .object({
    searchQuery: z.string().optional(),
    roleTypes: commaSeparatedArrayOf(RoleType).optional(),
    levelTypes: commaSeparatedArrayOf(RoleLevel).optional(),
    citizenshipStatuses: commaSeparatedArrayOf(CitizenshipStatus).optional(),
    latLngBounds: z.string().optional(), // filter by bounds
    sort: z.nativeEnum(ProfileSort).optional(),
  })
  .merge(PageParams)
  .strict()
export type ProfileListParamsType = z.infer<typeof ProfileListParams>

export type ProfileListResponse =
  | ({
      profiles: ProfileListFragment[]
      totalCount: number
    } & Paginated)
  | APIError

export type ProfileMappableResponse =
  | {
      profiles: {
        name: string
        externId: string
        lat: number
        lng: number
      }[]
    }
  | APIError

export type ProfileNewResponse =
  | {
      externId: string
    }
  | APIError

export type ProfileVouchParams = {
  externId: string
  action: 'vouch' | 'unvouch'
}

export type ProfileVouchResponse =
  | {
      newStatus: CitizenshipStatus
    }
  | APIError

export type ProfileSetupStateParams = {
  state: 'finished' | 'dismissed'
}

export type ProfileSetupStateResponse =
  | {
      success: boolean
    }
  | APIError

export type ProfileGetResponse =
  | {
      profile: ProfileFragment | null
    }
  | APIError

export type ProfileBasicFragment = {
  createdAt: string
  externId: string
  name: string
  email: string
  bio: string
  citizenshipStatus: CitizenshipStatus | null
  cabinTokenBalanceInt: number | null
  avatarUrl: string
  roles: RoleFragment[]
}

export type ProfileFragment = ProfileBasicFragment & {
  privyDID: string
  address: ShortAddressFragmentType | undefined
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  wallet: {
    address: string
    badges: BadgeFragment[]
  } | null
  voucher: {
    externId: string
    name: string
  } | null
  contactFields: ContactFragmentType[]
}

export const ContactFragment = z
  .object({
    type: z.nativeEnum(ContactFieldType),
    value: z.string(),
  })
  .strict()
export type ContactFragmentType = z.infer<typeof ContactFragment>

export type RoleFragment = {
  hatId: number | null
  type: RoleType
  level: RoleLevel
}

export type BadgeFragment = {
  id: number
  otterspaceBadgeId: string
  spec: {
    name: string
    description: string
    image: string
  }
}

const WalletAddress = z
  .string()
  .refine(isAddress, { message: 'invalid address' })

export type ProfileMeResponse =
  | {
      me: MeFragment | null
    }
  | APIError

// This is a globally used query to get the current user.
// It should be kept as light as possible, limited to the top-level fields only.
export type MeFragment = {
  createdAt: string
  externId: string
  privyDID: string
  name: string
  email: string
  bio: string
  address: ProfileAddressFragmentType | undefined
  inviteCode: string
  citizenshipStatus: CitizenshipStatus
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  cabinTokenBalanceInt: number | null
  isAdmin: boolean
  isProfileSetupFinished: boolean
  isProfileSetupDismissed: boolean
  mailingListOptIn: boolean | null
  avatarUrl: string
  walletAddress: string | null
  voucher: {
    externId: string
    name: string
  } | null

  contactFields: ContactFragmentType[]
  roles: RoleFragment[]
  locationCount: number
}

export const ProfileNewParams = z
  .object({
    walletAddress: WalletAddress.optional(),
    name: z.string(),
    email: z.string().email(),
    address: ProfileAddressFragment,
    avatarUrl: z.string().optional(),
    subscribeToNewsletter: z.boolean().optional(),
    inviteExternId: z.string().optional(),
  })
  .strict()
export type ProfileNewParamsType = z.infer<typeof ProfileNewParams>

export const ProfileEditParams = z
  .object({
    data: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      bio: z.string().optional(),
      walletAddress: z.union([WalletAddress, z.null()]).optional(),
      address: ProfileAddressFragment.optional(),
      contactFields: z.array(ContactFragment).optional(),
      avatarUrl: z.string().optional(),
    }),
    roleTypes: commaSeparatedArrayOf(RoleType).optional(),
  })
  .strict()
export type ProfileEditParamsType = z.infer<typeof ProfileEditParams>

export type ProfileEditResponse = ProfileGetResponse

export const ProfileDIDParams = z
  .object({
    did: z.string(),
  })
  .strict()
export type ProfileDIDParamsType = z.infer<typeof ProfileDIDParams>

export type ProfileDIDResponse =
  | {
      externId: string | null
    }
  | APIError

// must match ProfileQueryInclude above
export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    voucher: {
      select: {
        externId: true
        name: true
      }
    }
    address: true
    wallet: {
      select: {
        address: true
        cabinTokenBalance: true
        badges: {
          select: {
            id: true
            otterspaceBadgeId: true
            spec: true
          }
        }
      }
    }
    contactFields: true
    roles: {
      include: {
        walletHat: true
      }
    }
  }
}>

// must match ProfileWithRelations above
export const ProfileQueryInclude = {
  voucher: {
    select: {
      externId: true,
      name: true,
    },
  },
  address: true,
  wallet: {
    select: {
      address: true,
      cabinTokenBalance: true,
      badges: {
        select: {
          id: true,
          otterspaceBadgeId: true,
          spec: true,
        },
      },
    },
  },
  contactFields: true,
  roles: {
    include: {
      walletHat: true,
    },
  },
}

// these conversion functions are here rather than @/utils/profile.ts because that file imports prisma
export function toFullAddress(
  address: ProfileAddressFragmentType | undefined
): AddressFragmentType {
  return {
    ...{
      lat: null,
      lng: null,
      formattedAddress: null,
      streetNumber: null,
      route: null,
      routeShort: null,
      locality: null,
      admininstrativeAreaLevel1: null,
      admininstrativeAreaLevel1Short: null,
      country: null,
      countryShort: null,
      postalCode: null,
    },
    ...address,
  }
}
export function toProfileAddress(
  address: AddressFragmentType
): ProfileAddressFragmentType {
  return {
    lat: address.lat,
    lng: address.lng,
    formattedAddress: address.formattedAddress,
    locality: address.locality,
    admininstrativeAreaLevel1: address.admininstrativeAreaLevel1,
    admininstrativeAreaLevel1Short: address.admininstrativeAreaLevel1Short,
    country: address.country,
    countryShort: address.countryShort,
  }
}
