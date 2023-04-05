export interface FaunaTokenResponse {
  accessToken: {
    secret: string
    ttl: {
      '@ts': string
    }
  }
  profile: {
    data: {
      id: string
    }
  }
}
