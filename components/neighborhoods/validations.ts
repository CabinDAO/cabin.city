import { MAX_LOCATION_TITLE_LENGTH, MAX_LOCATION_BIO_LENGTH } from './constants'
import {
  EMAIL_VALID_REGEX,
  INVALID_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
  isNumber,
  truthyString,
} from '@/utils/validate'
import { emptyEditorValue } from '../core/slate/slate-utils'
import { OfferEditParams, OfferType } from '@/utils/types/offer'
import { LocationEditParams } from '@/utils/types/location'

export type ValidationType = 'missing' | 'invalid' | 'valid'

type ValidationResult = {
  error: string
  valid: boolean
}

export const validateLocationInput = (values: LocationEditParams) => {
  const {
    name,
    tagline,
    description,
    caretakerEmail,
    address,
    sleepCapacity,
    internetSpeedMbps,
  } = values

  const invalid =
    (values.hasOwnProperty('name') && !validateTitle(name).valid) ||
    (values.hasOwnProperty('tagline') && !validateBio(tagline).valid) ||
    (values.hasOwnProperty('description') && !validateBio(description).valid) ||
    (values.hasOwnProperty('caretakerEmail') &&
      !validateEmail(caretakerEmail).valid) ||
    (values.hasOwnProperty('address') &&
      !truthyString(address?.formattedAddress)) ||
    (values.hasOwnProperty('internetSpeedMbps') &&
      !isNumber(internetSpeedMbps)) ||
    (values.hasOwnProperty('sleepCapacity') && !isNumber(sleepCapacity))

  return !invalid
}

export const validateOfferInput = (
  type: OfferType,
  newValues: OfferEditParams
) => {
  const invalid =
    !validateTitle(newValues.title).valid ||
    emptyEditorValue(newValues.description) ||
    (newValues.hasOwnProperty('applicationUrl') &&
      !truthyString(newValues.applicationUrl)) ||
    (type === OfferType.PaidColiving &&
      newValues.hasOwnProperty('price') &&
      !isNumber(newValues.price)) ||
    (newValues.hasOwnProperty('imageIpfsHash') &&
      !truthyString(newValues.imageIpfsHash))

  return !invalid
}

type ConditionalString = string | undefined | null

export const validateTitle = (name: ConditionalString): ValidationResult => {
  if (!truthyString(name)) {
    return {
      error: REQUIRED_FIELD_ERROR,
      valid: false,
    }
  } else if ((name?.length ?? 0) > MAX_LOCATION_TITLE_LENGTH) {
    return {
      error: INVALID_FIELD_ERROR,
      valid: false,
    }
  } else {
    return {
      error: '',
      valid: true,
    }
  }
}

export const validateBio = (description: ConditionalString) => {
  if (!truthyString(description)) {
    return {
      error: REQUIRED_FIELD_ERROR,
      valid: false,
    }
  } else if ((description?.length ?? 0) > MAX_LOCATION_BIO_LENGTH) {
    return {
      error: INVALID_FIELD_ERROR,
      valid: false,
    }
  } else {
    return {
      error: '',
      valid: true,
    }
  }
}

export const validateEmail = (email: ConditionalString) => {
  if (!truthyString(email)) {
    return {
      error: REQUIRED_FIELD_ERROR,
      valid: false,
    }
  } else if (!email?.match(EMAIL_VALID_REGEX)) {
    return {
      error: INVALID_FIELD_ERROR,
      valid: false,
    }
  } else {
    return {
      error: '',
      valid: true,
    }
  }
}
