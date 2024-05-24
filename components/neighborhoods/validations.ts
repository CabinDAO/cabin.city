import { MAX_LOCATION_TITLE_LENGTH, MAX_LOCATION_BIO_LENGTH } from './constants'
import {
  EMAIL_VALID_REGEX,
  INVALID_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
  truthyString,
} from '@/utils/validate'
import { emptyEditorValue } from '../core/slate/slate-utils'
import { EventEditParamsType, EventType } from '@/utils/types/event'
import { LocationEditParamsType } from '@/utils/types/location'

type ValidationResult = {
  error: string
  valid: boolean
}

export const validateLocationInput = (values: LocationEditParamsType) => {
  const { name, tagline, description, address } = values

  const invalid =
    (values.hasOwnProperty('name') && !validateTitle(name).valid) ||
    (values.hasOwnProperty('tagline') && !validateBio(tagline).valid) ||
    (values.hasOwnProperty('description') && emptyEditorValue(description)) ||
    (values.hasOwnProperty('address') &&
      !truthyString(address?.formattedAddress))

  return !invalid
}

export const validateEventInput = (
  type: EventType,
  newValues: EventEditParamsType
) => {
  const invalid =
    !validateTitle(newValues.title).valid ||
    emptyEditorValue(newValues.description) ||
    (newValues.hasOwnProperty('applicationUrl') &&
      !truthyString(newValues.applicationUrl)) ||
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
