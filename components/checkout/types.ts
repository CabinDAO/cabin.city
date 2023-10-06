export type CreatePaymentIntentReq = {
  cartId: string
  agreedToTerms: boolean
}

export type CreatePaymentIntentRes = {
  clientSecret: string
}
