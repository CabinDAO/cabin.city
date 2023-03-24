import { UpdateProfileInput } from '@/generated/graphql'
import {
  MAX_DISPLAY_NAME_LENGTH,
  MAX_BIO_LENGTH,
  MAX_LOCATION_LENGTH,
} from './constants'

export const validateProfileInput = (editProfileInput: UpdateProfileInput) => {
  const { name, email, bio, location } = editProfileInput

  const invalid =
    (editProfileInput.hasOwnProperty('name') && !validName(name)) ||
    (editProfileInput.hasOwnProperty('bio') && !validBio(bio)) ||
    (editProfileInput.hasOwnProperty('location') && !validLocation(location)) ||
    (editProfileInput.hasOwnProperty('email') && !validEmail(email))

  return !invalid
}

type ConditionalString = string | undefined | null

export const validName = (name: ConditionalString) => {
  return name !== '' && (name?.length ?? 0) <= MAX_DISPLAY_NAME_LENGTH
}

export const validBio = (bio: ConditionalString) => {
  return (bio?.length ?? 0) <= MAX_BIO_LENGTH
}

export const validLocation = (location: ConditionalString) => {
  return (location?.length ?? 0) <= MAX_LOCATION_LENGTH
}

export const validEmail = (email: ConditionalString) => {
  return email !== ''
}
