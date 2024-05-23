type profile = { id: number } | { externId: string }

type profileWithAdmin = profile & { isAdmin: boolean }

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

export function canContactSteward(user: profile | null | undefined): boolean {
  return !!user
}

export function canViewCensus(user: profile | null | undefined): boolean {
  return !!user
}
