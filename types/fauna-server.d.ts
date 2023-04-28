export interface FaunaTokenResponse {
  accessToken: {
    secret: string
    ttl: {
      '@ts': string
    }
  }
  profile: {
    ref: {
      id: string
    }
  }
}
