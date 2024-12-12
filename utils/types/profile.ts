// need these types in a separate file because prisma cant be imported in the frontend

import { Prisma } from '@prisma/client'
import {
  APIError,
  commaSeparatedArrayOf,
  commaSeparatedStrings,
  PageParams,
  Paginated,
} from '@/utils/types/shared'
import { z } from 'zod'
import { isAddress } from 'viem'
import { AddressFragment, AddressFragmentType } from '@/utils/types/location'

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
  StampCountAsc = 'StampCountAsc',
  StampCountDesc = 'StampCountDesc',
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

export enum ProfileTag {
  steward = 'steward',
  moveCurious = 'moveCurious',
  nomad = 'nomad',
  parent = 'parent',
  networkSociety = 'networkSociety',
  crypto = 'crypto',
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
  bio: string
  address: ProfileAddressFragmentType | null
  avatarCfId: string
  stampCount: number
  cabinTokenBalanceInt: number | null
}

export const ProfileListParams = z
  .object({
    searchQuery: z.string().optional(),
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

export const ProfileVotersParams = z
  .object({
    addresses: commaSeparatedStrings,
  })
  .strict()
export type ProfileVotersParamsType = z.infer<typeof ProfileVotersParams>

export type ProfileVotersResponse =
  | {
      profiles: Record<
        string, // address
        {
          name: string
          externId: string
          avatarCfId: string
        }
      >
    }
  | APIError

export type ProfileMappableResponse =
  | {
      profiles: {
        name: string
        externId: string
        avatarCfId: string
        lat: number
        lng: number
      }[]
    }
  | APIError

export type ProfileNewResponse =
  | {
      externId: string
    }
  | (APIError & { exists?: boolean })

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
  avatarCfId: string
}

export type ProfileFragment = ProfileBasicFragment & {
  privyDID: string
  longBio: string
  address: ProfileAddressFragmentType | null
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  wallet: {
    address: string
  } | null
  voucher: {
    externId: string
    name: string
  } | null
  contactFields: ContactFragmentType[]
  tags: ProfileTag[]
  stamps: StampFragment[]
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

export type StampFragment = {
  id: number
  name: string
}

export const WalletAddress = z
  .string()
  .refine((value) => value === value.toLowerCase(), {
    message: 'wallet address must be all lowercase',
  })
  .refine(isAddress, { message: 'invalid address' })
type WalletAddressType = z.infer<typeof WalletAddress>

export type ProfileMeResponse =
  | {
      me: MeFragment | null
      result:
        | 'success'
        | 'no_auth_token'
        | 'invalid_auth_token'
        | 'profile_not_found'
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
  avatarCfId: string
  tags: ProfileTag[]
  walletAddress: WalletAddressType | null
  voucher: {
    externId: string
    name: string
  } | null

  contactFields: ContactFragmentType[]
  locationCount: number
}

export const ProfileNewParams = z
  .object({
    name: z.string(),
    email: z.string().email(),
    walletAddress: WalletAddress.nullish(),
    bio: z.string(),
    longBio: z.string(),
    address: ProfileAddressFragment,
    tags: z.array(z.nativeEnum(ProfileTag)),
    contactFields: z.array(ContactFragment),
    avatarCfId: z.string(),
    subscribeToNewsletter: z.boolean().optional(),
    inviteExternId: z.string().optional(),
  })
  .strict()
export type ProfileNewParamsType = z.infer<typeof ProfileNewParams>

export const ProfileEditParams = z
  .object({
    data: ProfileNewParams.partial().omit({
      subscribeToNewsletter: true,
      inviteExternId: true,
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
      }
    }
    contactFields: true
    stamps: {
      select: {
        createdAt: true
        stamp: {
          select: {
            id: true
            name: true
          }
        }
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
    },
  },
  contactFields: true,
  stamps: {
    select: {
      createdAt: true,
      stamp: {
        select: {
          id: true,
          name: true,
        },
      },
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
