// Utility functions for displaying numbers compactly. e.g. 1000 -> 1k
const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

export const formatValue = (value: number) => {
  const tier = (Math.log10(Math.abs(value)) / 3) | 0

  if (tier == 0) return value

  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  const scaled = value / scale

  return parseFloat(scaled.toFixed(2)) + suffix
}

export const pxToRem = (px: number) => `${px / 10}`

export const shortenedAddress = (address: string | undefined) =>
  address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null
