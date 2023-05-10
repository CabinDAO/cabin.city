export function isNotNull<T>(value: T | undefined | null): value is T {
  return typeof value !== 'undefined' && value !== null
}

export function isUnique<T>(value: T, index: number, array: T[]): boolean {
  return array.indexOf(value) === index
}
