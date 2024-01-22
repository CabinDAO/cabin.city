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

export type ProfileFragment = {
  createdAt: Date
  updatedAt: Date
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
  citizenshipMintedAt: Date | null
  avatar?: {
    profileId: number
    url: string
    contractAddress: string | null
    network: string | null
    title: string | null
    tokenId: string | null
    tokenUri: string | null
  }
  roles: {
    hatId: number | null
    type: RoleType
    level: RoleLevel
  }[]
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
  profiles: ProfileFragment[]
  count: number
  error: string | undefined
}
