import { APIError } from '@/utils/types/shared'

export type ImageNewResponse =
  | {
      url: string
    }
  | APIError

export type UploadedFilesMap = Record<string, string>

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB. this is the limit for cloudflare images

// this is what cloudflare supports
export const SUPPORTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  // 'image/svg+xml', // also supported, but not sure we wanna allow it
]
