import { query as q, ExprVal } from 'faunadb'
import { ProfileSortType } from '../../generated/graphql'

const IndexBySortType = {
  [ProfileSortType.CreatedAtAsc]: q.Index('profiles_sort_by_createdAt_asc'),
  [ProfileSortType.CreatedAtDesc]: q.Index('profiles_sort_by_createdAt_desc'),
  [ProfileSortType.CabinBalanceAsc]: q.Index(
    'profiles_sort_by_cabinBalance_asc'
  ),
  [ProfileSortType.CabinBalanceDesc]: q.Index(
    'profiles_sort_by_cabinBalance_desc'
  ),
  [ProfileSortType.BadgeCountAsc]: q.Index('profiles_sort_by_badgeCount_asc'),
  [ProfileSortType.BadgeCountDesc]: q.Index('profiles_sort_by_badgeCount_desc'),
}

export const GetProfilesSortIndex = (profileSortType: ExprVal) => {
  return q.Select(profileSortType, IndexBySortType)
}
