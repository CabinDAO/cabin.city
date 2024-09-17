import {
  EMAIL_VALID_REGEX,
  INVALID_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
} from '@/utils/validate'
import { isEditorEmpty } from '@/components/editor/TipTap'
import { EventEditParamsType, EventType } from '@/utils/types/event'
import { LocationEditParamsType } from '@/utils/types/location'

export const MAX_LOCATION_TITLE_LENGTH = 48

type ValidationResult = {
  error: string
  valid: boolean
}

export const truthyString = (value: string | undefined | null | number) => {
  return value && value !== ''
}

export const validateLocationInput = (values: LocationEditParamsType) => {
  const { name, description, address } = values

  const invalid =
    (values.hasOwnProperty('name') && !validateTitle(name).valid) ||
    (values.hasOwnProperty('description') && isEditorEmpty(description)) ||
    (values.hasOwnProperty('address') &&
      !truthyString(address?.formattedAddress))

  return !invalid
}

export const validateEventInput = (newValues: EventEditParamsType) => {
  const invalid =
    !validateTitle(newValues.title).valid ||
    isEditorEmpty(newValues.description) ||
    (newValues.hasOwnProperty('applicationUrl') &&
      !truthyString(newValues.applicationUrl))

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
