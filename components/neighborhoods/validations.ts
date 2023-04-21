import { PartialUpdateLocationInput } from '@/generated/graphql'
import { MAX_LOCATION_TITLE_LENGTH, MAX_LOCATION_BIO_LENGTH } from './constants'

export const validateLocationInput = (
  editProfileInput: PartialUpdateLocationInput
) => {
  const { name, description, caretakerEmail } = editProfileInput

  const invalid =
    (editProfileInput.hasOwnProperty('name') && !validTitle(name)) ||
    (editProfileInput.hasOwnProperty('description') &&
      !validBio(description)) ||
    (editProfileInput.hasOwnProperty('caretakerEmail') &&
      !validEmail(caretakerEmail))

  return !invalid
}

type ConditionalString = string | undefined | null

export const validTitle = (name: ConditionalString) => {
  return name !== '' && (name?.length ?? 0) <= MAX_LOCATION_TITLE_LENGTH
}

export const validBio = (description: ConditionalString) => {
  return (description?.length ?? 0) <= MAX_LOCATION_BIO_LENGTH
}

export const validEmail = (email: ConditionalString) => {
  return email !== ''
}
