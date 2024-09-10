import { APIError } from '@/utils/types/shared'

export type ImageNewResponse =
  | {
      url: string
    }
  | APIError

export type UploadedFilesMap = Record<string, string>

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const SUPPORTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  // 'image/gif',
  // 'image/tiff',
  // 'image/bmp',
]
