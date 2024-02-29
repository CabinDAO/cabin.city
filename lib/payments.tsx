import React, { useEffect, useState } from 'react'
import Script from 'next/script'

export function useCheckForApplePay() {
  const [isApplePaySupported, setIsApplePaySupported] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window && window.ApplePaySession) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setIsApplePaySupported(window.ApplePaySession.canMakePayments())
    }
  }, [])

  return { applePayScriptElement, isApplePaySupported }
}

export function useCheckForGooglePay() {
  const [isGooglePaySupported, setIsGooglePaySupported] = useState(false)

  useEffect(() => {
    if (!window.PaymentRequest) {
      return
    }

    const paymentRequest = new PaymentRequest(
      [
        {
          supportedMethods: 'https://google.com/pay',
          data: {
            // Google Pay-specific data here
            environment: 'TEST', // or 'PRODUCTION'
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  // Gateway and other tokenization parameters here
                },
              },
            ],
            // Merchant Info here
          },
        },
      ],
      {
        total: {
          label: 'Total',
          amount: { currency: 'USD', value: '0.00' },
        },
      }
    )

    paymentRequest
      .canMakePayment()
      .then((result) => {
        console.log('google pay support', result)
        setIsGooglePaySupported(result)
      })
      .catch((error) => {
        console.error('Payment Request Error:', error)
        setIsGooglePaySupported(false)
      })
  }, [])

  return { googlePayScriptElement, isGooglePaySupported }
}

const applePayScriptElement = (
  <Script
    src="https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js"
    strategy="afterInteractive"
  />
)

const googlePayScriptElement = (
  <Script
    src="https://pay.google.com/gp/p/js/pay.js"
    strategy="afterInteractive"
  />
)
