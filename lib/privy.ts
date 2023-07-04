const PRIVY_REST_API_BASE = 'https://auth.privy.io/api/v1'

const credentials = Buffer.from(
  `${process.env.NEXT_PUBLIC_PRIVY_APP_ID}:${process.env.PRIVY_APP_SECRET}`,
  'utf-8'
).toString('base64')

export const privyAPICall = async (
  path: string,
  method: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any = {}
) => {
  return await fetch(`${PRIVY_REST_API_BASE}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
      'privy-app-id': process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    },
    ...(method === 'POST' && { body: JSON.stringify(body) }),
  })
}
