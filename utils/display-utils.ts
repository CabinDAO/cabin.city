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
