import { ContactFieldType, ProfileEditParamsType } from '@/utils/types/profile'
import { EMAIL_VALID_REGEX } from '@/utils/validate'
import { isAddress } from 'viem'
import { AddressFragmentType } from '@/utils/types/location'

export const MAX_DISPLAY_NAME_LENGTH = 48
export const MAX_BIO_LENGTH = 300

export const validateProfileInput = (
  editProfileInput: ProfileEditParamsType['data']
) => {
  const { name, email, bio, address } = editProfileInput

  const invalid =
    (editProfileInput.hasOwnProperty('name') && !isValidName(name)) ||
    (editProfileInput.hasOwnProperty('bio') && !isValidBio(bio)) ||
    (editProfileInput.hasOwnProperty('address') && !isValidAddress(address)) ||
    (editProfileInput.hasOwnProperty('email') && !isValidEmail(email))

  return !invalid
}

type ConditionalString = string | undefined | null

export const isValidName = (name: ConditionalString) => {
  return name !== '' && (name?.length ?? 0) <= MAX_DISPLAY_NAME_LENGTH
}

export const isValidAddress = (
  address: AddressFragmentType | null | undefined
): boolean => {
  return !!(address && address.admininstrativeAreaLevel1)
}

export const INVALID_NAME_MESSAGE = `Name required and must be at most ${MAX_DISPLAY_NAME_LENGTH} characters`

export const isValidBio = (bio: ConditionalString) => {
  return bio !== '' && (bio?.length ?? 0) <= MAX_BIO_LENGTH
}

export const isValidEmail = (email: ConditionalString) => {
  return email !== '' && !!email?.match(EMAIL_VALID_REGEX)
}

export const isValidAddressOrENSFormat = (address: ConditionalString) => {
  return address && (isAddress(address) || address.endsWith('.eth'))
}

export function sanitizeContactValue(type: ContactFieldType, value: string) {
  let sanitizedValue = value.trim()
  let error = ''

  switch (type) {
    case ContactFieldType.Discord:
      sanitizedValue = sanitizedValue.toLowerCase()

      if (sanitizedValue.startsWith('@')) {
        sanitizedValue = sanitizedValue.slice(1)
      }

      if (!/^[a-z0-9.#_]{2,37}$/i.test(sanitizedValue)) {
        error = 'Invalid Discord handle'
      }
      break

    case ContactFieldType.Email:
      const emailPattern =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
      if (!emailPattern.test(sanitizedValue)) {
        error = 'Invalid email address'
      }
      break

    case ContactFieldType.Farcaster:
      const wcPattern =
        /^(?:https?:\/\/)?(?:www\.)?warpcast\.com\/([a-z0-9][a-z0-9-]{0,15}(\.eth)?)(?:\/.*)?$/i
      const wcMatch = sanitizedValue.match(wcPattern)

      if (wcMatch) {
        sanitizedValue = wcMatch[1]
      }

      if (sanitizedValue.startsWith('@')) {
        sanitizedValue = sanitizedValue.slice(1)
      }

      if (!/^[a-z0-9][a-z0-9-]{0,15}(\.eth)?$/i.test(sanitizedValue)) {
        error = 'Invalid Farcaster handle'
      }
      break

    case ContactFieldType.Instagram:
      const instaPattern =
        /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-z0-9._]{1,30})(?:\/.*)?$/i
      const instaMatch = sanitizedValue.match(instaPattern)

      if (instaMatch) {
        sanitizedValue = instaMatch[1]
      }

      if (sanitizedValue.startsWith('@')) {
        sanitizedValue = sanitizedValue.slice(1)
      }

      if (!/^[A-Za-z0-9._]{1,30}$/.test(sanitizedValue)) {
        error = 'Invalid Instagram handle'
      }
      break

    case ContactFieldType.Lens:
      const lensPattern =
        /^(?:https?:\/\/)?(?:www\.)?(?:hey|lenster|lensfrens)\.xyz\/(?:u\/)?([a-z0-9-.]{1,50})(?:\/.*)?$/i
      const lensMatch = sanitizedValue.match(lensPattern)

      if (lensMatch) {
        sanitizedValue = lensMatch[1]
      }

      if (sanitizedValue.startsWith('@')) {
        sanitizedValue = sanitizedValue.slice(1)
      }

      if (sanitizedValue.startsWith('lens/')) {
        sanitizedValue = sanitizedValue.slice(5)
      }

      if (sanitizedValue.endsWith('.lens')) {
        sanitizedValue = sanitizedValue.slice(0, -5)
      }

      if (!/^[a-z0-9][a-z0-9_]{4,25}$/i.test(sanitizedValue)) {
        error = 'Invalid Lens handle'
      }
      break

    case ContactFieldType.LinkedIn:
      const linkedinPattern =
        /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-z0-9-]{1,100})(?:\/.*)?$/i
      const linkedinMatch = sanitizedValue.match(linkedinPattern)

      if (linkedinMatch) {
        sanitizedValue = linkedinMatch[1]
      }

      if (!/^[A-Za-z0-9-]{1,100}$/.test(sanitizedValue)) {
        error = 'Invalid LinkedIn handle'
      }
      break

    case ContactFieldType.Telegram:
      const tgPattern =
        /^(?:https?:\/\/)?(?:www\.)?t(?:elegram)?\.me\/([a-z0-9_]{5,32})(?:\/.*)?$/i
      const tgMatch = sanitizedValue.match(tgPattern)

      if (tgMatch) {
        sanitizedValue = tgMatch[1]
      }

      if (sanitizedValue.startsWith('@')) {
        sanitizedValue = sanitizedValue.slice(1)
      }

      if (!/^[A-Za-z0-9_]{5,32}$/.test(sanitizedValue)) {
        error = 'Invalid Telegram handle'
      }

      break

    case ContactFieldType.Twitter:
      const twitterPattern =
        /^(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/([a-z0-9_]{1,15})(?:\/.*)?$/i
      const twitterMatch = sanitizedValue.match(twitterPattern)

      if (twitterMatch) {
        sanitizedValue = twitterMatch[1]
      }

      if (sanitizedValue.startsWith('@')) {
        sanitizedValue = sanitizedValue.slice(1)
      }

      if (!/^[A-Za-z0-9_]{1,15}$/.test(sanitizedValue)) {
        error = 'Invalid Twitter handle'
      }
      break

    case ContactFieldType.Website:
      if (
        !sanitizedValue.startsWith('http://') &&
        !sanitizedValue.startsWith('https://')
      ) {
        sanitizedValue = `https://${sanitizedValue}`
      }
      break
  }

  return { sanitizedValue, error }
}
