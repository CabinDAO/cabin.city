export const isDevEnv = process.env.NODE_ENV === 'development'
export const isLocalDev = isDevEnv && !process.env.NEXT_PUBLIC_VERCEL_ENV
// this is duplicated in prisma.ts because prosgres import couldnt import this file??