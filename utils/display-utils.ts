import { format, getYear, getMonth } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { ContactFieldType, ProfileFragment } from '@/utils/types/profile'
import { isProd } from '@/utils/dev'

export const appDomain = isProd
  ? 'cabin.city'
  : process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'dev'
  ? 'dev.cabin.city'
  : process.env.NEXT_PUBLIC_VERCEL_URL

export const appDomainWithProto =
  (appDomain.startsWith('localhost:') ? 'http' : 'https') + `://${appDomain}`

export const EMPTY = '—'

// Utility functions for displaying numbers compactly. e.g. 1000 -> 1k
const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

export const formatValue = (value: number, precision = 2): string => {
  const tier = (Math.log10(Math.abs(value)) / 3) | 0

  if (tier == 0) return value.toString()

  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  const scaled = value / scale

  return parseFloat(scaled.toFixed(precision)) + suffix
}

export const pxToRem = (px: number) => px / 10

export const remToPx = (rem: number) => rem * 10

export const shortenedAddress = (address: string | null | undefined) =>
  address ? `${address.slice(0, 4)}...${address.slice(-4)}` : null

export const shortenedContactField = (value: string | undefined) => {
  if (!value) return null

  return value.length > 23
    ? `${value.slice(0, 20)}...${value.slice(-1)}`
    : value
}
export const formatDate = (
  date: Date,
  desiredFormat = 'MMMM yyyy',
  placeholder?: string
) => {
  if (!date) {
    return placeholder
  }
  const dateAdjustedForTZ = new Date(
    date.valueOf() + date.getTimezoneOffset() * 60 * 1000
  )
  return format(dateAdjustedForTZ, desiredFormat, { locale: enUS })
}

export const monthYearFormat = (dateISOString: string) =>
  format(new Date(dateISOString), 'MMMM yyyy', { locale: enUS })

export const formatUrl = (url?: string | undefined | null) => {
  if (!url) return null

  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`
}

const contactFieldTypeUrlMap: Partial<Record<ContactFieldType, string>> = {
  [ContactFieldType.Email]: 'mailto:',
  [ContactFieldType.Website]: '',
  [ContactFieldType.Twitter]: 'https://twitter.com/',
  [ContactFieldType.Telegram]: 'https://t.me/',
  [ContactFieldType.Instagram]: 'https://instagram.com/',
  [ContactFieldType.LinkedIn]: 'https://linkedin.com/in/',
  [ContactFieldType.Lens]: 'https://lenster.xyz/u/',
  [ContactFieldType.Farcaster]: 'https://warpcast.com/',
}

export const getUrlFromContactField = (
  field: ProfileFragment['contactFields'][0]
) => {
  const keys = Object.keys(contactFieldTypeUrlMap) as ContactFieldType[]

  if (field.type === ContactFieldType.Website) {
    return formatUrl(field.value)
  }

  if (keys.includes(field.type)) {
    if (
      !!contactFieldTypeUrlMap[field.type] &&
      field.value.includes(contactFieldTypeUrlMap[field.type] as string)
    ) {
      return field.value
    }

    return `${contactFieldTypeUrlMap[field.type]}${field.value}`
  } else {
    return null
  }
}

export const formatContactField = (
  field: ProfileFragment['contactFields'][0],
  truncateValue = false
) => {
  const shortenedValue = truncateValue
    ? shortenedContactField(field.value)
    : field.value

  if (ContactFieldType.Lens) {
    const lensUrl = 'https://lenster.xyz/u/'

    if (field.value.startsWith(lensUrl)) {
      return field.value.slice(lensUrl.length)
    } else {
      return shortenedValue
    }
  }

  if ([ContactFieldType.Email, ContactFieldType.Website].includes(field.type)) {
    return shortenedValue
  } else {
    return shortenedValue?.startsWith('@')
      ? shortenedValue
      : `@${shortenedValue}`
  }
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const truncate = (str: string, length: number) =>
  str.length > length ? `${str.substring(0, length)}...` : str

export const formatRange = (startDate?: Date | null, endDate?: Date | null) => {
  if (!startDate || !endDate) return `${EMPTY} - ${EMPTY}`

  // Within same year
  if (getYear(startDate) === getYear(endDate)) {
    // Within same month
    if (getMonth(startDate) === getMonth(endDate)) {
      // Within same day
      if (startDate.getDate() === endDate.getDate()) {
        return formatDate(startDate, 'MMM d', EMPTY)
      } else {
        return `${formatDate(startDate, 'MMM d', EMPTY)} - ${formatDate(
          endDate,
          'd',
          EMPTY
        )}`
      }
    } else {
      return `${formatDate(startDate, 'MMM d', EMPTY)} - ${formatDate(
        endDate,
        'MMM d',
        EMPTY
      )}`
    }
  } else {
    return `${formatDate(startDate, 'MMM d, yyyy', EMPTY)} - ${formatDate(
      endDate,
      'MMM d, yyyy',
      EMPTY
    )}`
  }
}

export const daysBetween = (startDate?: Date | null, endDate?: Date | null) => {
  if (!startDate || !endDate) return 0

  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  )
}

export const balanceToVotes = (balance: number | null) => {
  return balance ? Math.sqrt(balance).toFixed(0) : 0
}

export const timeAgo = (timestamp: number) => {
  const now = Date.now() / 1000
  const diff = now - timestamp
  const seconds = Math.floor(diff)
  const minutes = Math.floor(diff / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `${years} year${years === 1 ? '' : 's'} ago`
  if (months > 0) return `${months} month${months === 1 ? '' : 's'} ago`
  if (weeks > 0) return `${weeks} week${weeks === 1 ? '' : 's'} ago`
  if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`
  if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  if (seconds > 0) return `${seconds} second${seconds === 1 ? '' : 's'} ago`
  return 'just now'
}
