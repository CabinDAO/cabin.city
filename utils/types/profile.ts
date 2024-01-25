// need these types in a separate file because prisma cant be imported in the frontend

export const PAGE_SIZE = 20

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
  externalUserId: string | null
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
  avatar?: {
    profileId: number
    url: string
    contractAddress: string | null
    network: string | null
    title: string | null
    tokenId: string | null
    tokenUri: string | null
  }
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

export type ProfileListResponse = {
  profiles: ProfileListFragment[]
  count: number
  error?: string
}

export type ProfileVouchParams = {
  externId: string
  action: 'vouch' | 'unvouch'
}

export type ProfileVouchResponse = {
  newStatus: CitizenshipStatus
  error?: string
}

export type ProfileResponse = {
  profile: ProfileFragment | null
  error?: string
}

export type ProfileFragment = {
  createdAt: string
  externId: string
  externalUserId: string | null
  name: string
  email: string
  bio: string
  location: string
  citizenshipStatus: CitizenshipStatus | null
  citizenshipTokenId: number | null
  citizenshipMintedAt: string | null
  cabinTokenBalanceInt: number
  avatarUrl: string
  voucher: {
    externId: string
    name: string
  } | null
  wallet: {
    address: string
    badges: BadgeFragment[]
  }
  contactFields: {
    type: ContactFieldType
    value: string
  }[]
  roles: {
    hatId: number | null
    type: RoleType
    level: RoleLevel
  }[]
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
