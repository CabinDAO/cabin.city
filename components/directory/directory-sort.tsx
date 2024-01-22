import { ProfileSort } from '@/utils/types/profile'

export const DIRECTORY_SORT_FIELDS = [
  {
    key: 'join_date',
    label: 'Join date',
    options: [
      {
        key: ProfileSort.CreatedAtDesc,
        label: 'Newest',
      },
      {
        key: ProfileSort.CreatedAtAsc,
        label: 'Oldest',
      },
    ],
  },
  {
    key: 'cabin_balance',
    label: '₡ABIN holdings',
    options: [
      {
        key: ProfileSort.CabinBalanceAsc,
        label: 'Ascending',
      },
      {
        key: ProfileSort.CabinBalanceDesc,
        label: 'Descending',
      },
    ],
  },
  {
    key: 'stamp_amount',
    label: 'Stamp Amount',
    options: [
      {
        key: ProfileSort.BadgeCountAsc,
        label: 'Ascending',
      },
      {
        key: ProfileSort.BadgeCountDesc,
        label: 'Descending',
      },
    ],
  },
]
