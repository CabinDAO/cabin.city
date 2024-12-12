import { CitizenshipStatus } from '@/utils/types/profile'

type profile = { id: number } | { externId: string }

type profileWithAdmin = profile & { isAdmin: boolean }
type profileWithCitizenshipStatus = profile & {
  citizenshipStatus: CitizenshipStatus
}

function profileEquals(a: profile, b: profile): boolean {
  return (
    ('id' in a && 'id' in b && a.id === b.id) ||
    ('externId' in a && 'externId' in b && a.externId === b.externId)
  )
}

type stewardedObject = {
  stewards: profile[] | { profile: profile }[]
}

export function canEditLocation(
  user: profileWithAdmin | null | undefined,
  location: stewardedObject
): boolean {
  if (!user) {
    return false
  }

  const isAdmin = user?.isAdmin

  const isSteward = location.stewards.some((s) =>
    'profile' in s ? profileEquals(user, s.profile) : profileEquals(user, s)
  )

  return isAdmin || isSteward
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
  return profileEquals(user, profile)
}
