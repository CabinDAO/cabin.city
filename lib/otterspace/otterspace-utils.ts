export const tokenIdFromBadgeId = (badgeId: string) => {
  return badgeId.replace('badges:', '')
}
