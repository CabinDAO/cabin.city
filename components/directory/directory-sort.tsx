import { ProfileSortType } from '@/generated/graphql'

export const DIRECTORY_SORT_FIELDS = [
  {
    key: 'join_date',
    label: 'Join date',
    options: [
      {
        key: ProfileSortType.CreatedAtDesc,
        label: 'Newest',
      },
      {
        key: ProfileSortType.CreatedAtAsc,
        label: 'Oldest',
      },
    ],
  },
  {
    key: 'cabin_balance',
    label: '₡ABIN holdings',
    options: [
      {
        key: ProfileSortType.CabinBalanceAsc,
        label: 'Ascending',
      },
      {
        key: ProfileSortType.CabinBalanceDesc,
        label: 'Descending',
      },
    ],
  },
  {
    key: 'stamp_amount',
    label: 'Stamp Amount',
    options: [
      {
        key: ProfileSortType.BadgeCountAsc,
        label: 'Ascending',
      },
      {
        key: ProfileSortType.BadgeCountDesc,
        label: 'Descending',
      },
    ],
  },
]
