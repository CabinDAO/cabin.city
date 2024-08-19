import { CitizenshipStatus } from '@/utils/types/profile'

type profile = { id: number } | { externId: string }

type profileWithAdmin = profile & { isAdmin: boolean }
type profileWithCitizenshipStatus = profile & {
  citizenshipStatus: CitizenshipStatus
}

type stewardedObject =
  | { stewardId: number | null }
  | { steward: { externId: string } | null }

export function canEditLocation(
  user: profileWithAdmin | null | undefined,
  location: stewardedObject
): boolean {
  if (!user) {
    return false
  }

  const isAdmin = user?.isAdmin

  const stewardIdMatch =
    'id' in user &&
    'stewardId' in location &&
    !!location.stewardId &&
    user.id == location.stewardId

  const externIdMatch =
    'externId' in user &&
    'steward' in location &&
    !!location.steward &&
    user.externId === location.steward.externId

  return isAdmin || stewardIdMatch || externIdMatch
}

export function canCreateListings(
  user: profileWithCitizenshipStatus | null | undefined
): boolean {
  return !!user
  // return user?.citizenshipStatus === CitizenshipStatus.Verified
}

export function canEditProfile(
  user: profileWithAdmin | null | undefined,
  profile: profile
): boolean {
  if (!user) return false
  if (user.isAdmin) return true
  return (
    ('id' in user && 'id' in profile && user.id === profile.id) ||
    ('externId' in user &&
      'externId' in profile &&
      user.externId === profile.externId)
  )
}
