// need these types in a separate file because prisma cant be imported in the frontend
import { APIError, Paginated } from '@/utils/types/shared'
import { z } from 'zod'
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

export type ProfileListFragment = {
  createdAt: string
  externId: string
  privyDID: string
  name: string
  email: string
  bio: string
  address: ShortAddressFragmentType | null
  neighborhoodExternId: string | null
  isAdmin: boolean
  mailingListOptIn: boolean | null
  voucherId: number | null
  citizenshipStatus: CitizenshipStatus | null
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  avatar?: AvatarFragmentType
  roles: RoleFragment[]
  badgeCount: number
  cabinTokenBalanceInt: number
}

export const ProfileListParams = z
  .object({
    searchQuery: z.string().optional(),
    roleTypes: z.array(z.nativeEnum(RoleType)).optional(),
    levelTypes: z.array(z.nativeEnum(RoleLevel)).optional(),
    citizenshipStatuses: z.array(z.nativeEnum(CitizenshipStatus)).optional(),
    withLocation: z.union([z.literal('true'), z.literal('false')]).optional(),
    sort: z.nativeEnum(ProfileSort).optional(),
    page: z.coerce.number().optional(),
  })
  .strict()
export type ProfileListParamsType = z.infer<typeof ProfileListParams>

export type ProfileListResponse =
  | ({
      profiles: ProfileListFragment[]
    } & Paginated)
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

export type ProfileVouchResponse = {
  newStatus: CitizenshipStatus
  error?: string
}

export type ProfileSetupStateParams = {
  state: 'finished' | 'dismissed'
}

export type ProfileSetupStateResponse = {
  success: boolean
  error?: string
}

export type ProfileGetResponse = {
  profile: ProfileFragment | null
  error?: string
}

export type ProfileBasicFragment = {
  createdAt: string
  externId: string
  name: string
  email: string
  bio: string
  citizenshipStatus: CitizenshipStatus | null
  cabinTokenBalanceInt: number
  avatar?: AvatarFragmentType
  roles: RoleFragment[]
}

export type ProfileFragment = ProfileBasicFragment & {
  privyDID: string
  address: ShortAddressFragmentType | undefined
  neighborhoodExternId: string | null
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  wallet: {
    address: string
    badges: BadgeFragment[]
  }
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

export const AvatarFragment = z
  .object({
    url: z.string(),
    contractAddress: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    tokenId: z.string().nullable().optional(),
    tokenUri: z.string().nullable().optional(),
    network: z.string().nullable().optional(),
  })
  .strict()
export type AvatarFragmentType = z.infer<typeof AvatarFragment>

export type ProfileMeResponse = {
  me?: MeFragment | null
  error?: string
}

// This is a globally used query to get the current user.
// It should be kept as light as possible, limited to the top-level fields only.
export type MeFragment = {
  createdAt: string
  externId: string
  privyDID: string
  name: string
  email: string
  bio: string
  address: AddressFragmentType | undefined
  neighborhoodExternId: string | null
  inviteCode: string
  citizenshipStatus: CitizenshipStatus
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  cabinTokenBalanceInt: number
  isAdmin: boolean
  isProfileSetupFinished: boolean
  isProfileSetupDismissed: boolean
  mailingListOptIn: boolean | null
  avatar: AvatarFragmentType
  walletAddress: string
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
    walletAddress: z.string(),
    name: z.string(),
    email: z.string(),
    address: AddressFragment,
    avatar: AvatarFragment.optional(),
    inviteExternId: z.string().optional(),
    neighborhoodExternId: z.string().optional(),
  })
  .strict()
export type ProfileNewParamsType = z.infer<typeof ProfileNewParams>

export const ProfileEditParams = z
  .object({
    data: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      bio: z.string().optional(),
      address: AddressFragment.optional(),
      contactFields: z.array(ContactFragment).optional(),
      avatar: AvatarFragment.optional(),
      neighborhoodExternId: z.string().nullable().optional(),
    }),
    roleTypes: z.array(z.nativeEnum(RoleType)).optional(),
  })
  .strict()
export type ProfileEditParamsType = z.infer<typeof ProfileEditParams>

export type ProfileEditResponse = {
  success: boolean
  error?: string
}

export type ProfileDIDResponse =
  | {
      externId: string | null
    }
  | APIError
