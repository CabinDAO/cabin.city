type profile = ({ id: number } | { externId: string }) & { isAdmin: boolean }

type withSteward =
  | {
      stewardId: number | null
    }
  | {
      steward: { externId: string } | null
    }

export function canEditLocation(
  user: profile | null | undefined,
  location: withSteward
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
