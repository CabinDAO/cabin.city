import { getEthPrice } from '@/lib/market'
import { YEARLY_PRICE_IN_ETH } from '@/utils/citizenship'
import { useEffect, useState } from 'react'

export const usePriceInUsd = () => {
  const [priceInUsd, setPriceInUsd] = useState(0)

  const setPriceInUsdc = async () => {
    getEthPrice().then((price) => {
      return setPriceInUsd(Math.round(price * YEARLY_PRICE_IN_ETH * 100) / 100)
    })
  }

  useEffect(() => {
    setPriceInUsdc()
  }, [])

  return { priceInUsd }
}
