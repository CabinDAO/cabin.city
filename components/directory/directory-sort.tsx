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
        label: 'Least First',
      },
      {
        key: ProfileSort.CabinBalanceDesc,
        label: 'Most First',
      },
    ],
  },
  {
    key: 'stamp_amount',
    label: 'Stamp Amount',
    options: [
      {
        key: ProfileSort.BadgeCountAsc,
        label: 'Least First',
      },
      {
        key: ProfileSort.BadgeCountDesc,
        label: 'Most First',
      },
    ],
  },
]
