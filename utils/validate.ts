export const EMAIL_VALID_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const truthyString = (value: string | undefined | null | number) => {
  return value && value !== ''
}

export const isNumber = (value: string | undefined | null | number) => {
  return !!value && !isNaN(Number(value))
}

export const REQUIRED_FIELD_ERROR = 'This field is required'
export const INVALID_FIELD_ERROR = 'This field is invalid'
export const REQUIRED_SECTION_ERROR = 'This section is required'
export const PHOTO_REQUIRED_ERROR = 'At least one photo is required'

export const REQUIRED_FIELDS_TOAST_ERROR =
  'Oops! It seems that one or more fields require your attention.'

export const REQUIRED_SECTIONS_TOAST_ERROR =
  'Oops! It seems that one or more sections require your attention.'
