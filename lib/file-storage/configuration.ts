export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const SUPPORTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/tiff',
  'image/bmp',
]

export const fileTypesListString = SUPPORTED_FILE_TYPES.map((type, index) => {
  const typeWithoutPrefix = type.split('/')[1].toLocaleUpperCase()
  if (index === SUPPORTED_FILE_TYPES.length - 1) {
    return `or ${typeWithoutPrefix}`
  }
  return typeWithoutPrefix
}).join(', ')
