export const isProd = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
export const isVercelDev = process.env.VERCEL_ENV
  ? ['development', 'preview'].includes(process.env.VERCEL_ENV)
  : ['development', 'preview'].includes(`${process.env.NEXT_PUBLIC_VERCEL_ENV}`)
export const isLocalDev =
  process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_VERCEL_ENV

// this is duplicated in prisma.ts because prosgres import couldnt import this file??
