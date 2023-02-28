import { BigNumber } from 'ethers'

// ₡ABIN is an 18 decimal currency
const MULTIPLIER = BigNumber.from('1000000000000000000')

export const formatCabinTokenString = (val: string | null | undefined) => {
  return BigNumber.from(val ?? 0)
    .div(MULTIPLIER)
    .toString()
}
