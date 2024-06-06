import { ProfileEditParamsType } from '@/utils/types/profile'
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
  return (bio?.length ?? 0) <= MAX_BIO_LENGTH
}

export const isValidEmail = (email: ConditionalString) => {
  return email !== '' && !!email?.match(EMAIL_VALID_REGEX)
}

export const isValidAddressOrENSFormat = (address: ConditionalString) => {
  return address && (isAddress(address) || address.endsWith('.eth'))
}
