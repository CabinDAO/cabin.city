export const ironOptions = {
  cookieName: 'siwe',
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.SECURE_COOKIES_ENABLED === 'true',
  },
}
