// need these types in a separate file because prisma cant be imported in the frontend
import { APIError, Paginated } from '@/utils/types/shared'

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
  location: string
  isAdmin: boolean
  mailingListOptIn: boolean | null
  voucherId: number | null
  citizenshipStatus: CitizenshipStatus | null
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  avatar?: AvatarFragment
  roles: RoleFragment[]
  badgeCount: number
  cabinTokenBalanceInt: number
}

export type ProfileListParams = {
  searchQuery?: string
  roleTypes?: RoleType[]
  levelTypes?: RoleLevel[]
  citizenshipStatuses?: CitizenshipStatus[]
  sort?: ProfileSort
  page?: number
}

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
  avatar?: AvatarFragment
  roles: RoleFragment[]
}

export type ProfileFragment = ProfileBasicFragment & {
  privyDID: string
  location: string
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
  contactFields: ContactFragment[]
}

export type ContactFragment = {
  type: ContactFieldType
  value: string
}

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

export type AvatarFragment = {
  url: string
  contractAddress?: string | null
  network?: string | null
  title?: string | null
  tokenId?: string | null
  tokenUri?: string | null
}

export type CaretakerFragment = ProfileBasicFragment
/*
fragment Caretaker on Profile {
  _id
  email
  name
  avatar {
    url
  }
  citizenshipStatus
  cabinTokenBalanceInt
  account {
    address
  }
  createdAt
  roles {
    role
    level
  }
  bio
  badgeCount
}

   */

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
  location: string
  inviteCode: string
  citizenshipStatus: CitizenshipStatus
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  cabinTokenBalanceInt: number
  isAdmin: boolean
  isProfileSetupFinished: boolean
  isProfileSetupDismissed: boolean
  mailingListOptIn: boolean | null
  avatar: AvatarFragment
  walletAddress: string
  voucher: {
    externId: string
    name: string
  } | null

  contactFields: ContactFragment[]
  roles: RoleFragment[]
  locationCount: number
}

export type ProfileEditParams = {
  data: {
    name?: string
    email?: string
    bio?: string
    location?: string
    contactFields?: ContactFragment[]
    avatar?: AvatarFragment
  }
  roleTypes?: RoleType[]
}

export type ProfileEditResponse = {
  success: boolean
  error?: string
}

export type ProfileDIDResponse =
  | {
      externId: string | null
    }
  | APIError
