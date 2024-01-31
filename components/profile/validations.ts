import { ProfileEditParams } from '@/utils/types/profile'
import {
  MAX_DISPLAY_NAME_LENGTH,
  MAX_BIO_LENGTH,
  MAX_LOCATION_LENGTH,
} from './constants'
import { EMAIL_VALID_REGEX } from '@/utils/validate'

export const validateProfileInput = (
  editProfileInput: ProfileEditParams['data'],
  locationRequired = false
) => {
  const { name, email, bio, location } = editProfileInput

  const invalid =
    (editProfileInput.hasOwnProperty('name') && !isValidName(name)) ||
    (editProfileInput.hasOwnProperty('bio') && !validBio(bio)) ||
    (editProfileInput.hasOwnProperty('location') &&
      !validLocation(location, locationRequired)) ||
    (editProfileInput.hasOwnProperty('email') && !validEmail(email))

  return !invalid
}

type ConditionalString = string | undefined | null

export const isValidName = (name: ConditionalString) => {
  return name !== '' && (name?.length ?? 0) <= MAX_DISPLAY_NAME_LENGTH
}

export const validBio = (bio: ConditionalString) => {
  return (bio?.length ?? 0) <= MAX_BIO_LENGTH
}

export const validLocation = (
  location: ConditionalString,
  locationRequired = false
) => {
  return (
    (location?.length ?? 0) <= MAX_LOCATION_LENGTH &&
    (!locationRequired || (location?.length ?? 0) > 0)
  )
}

export const validEmail = (email: ConditionalString) => {
  return email !== '' && !!email?.match(EMAIL_VALID_REGEX)
}
