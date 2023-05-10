// Creates an array with the given length and fills it with the index value
export const range = (length: number) => Array.from({ length }, (x, i) => i)

export const unique = <T>(arr: T[]) => Array.from(new Set(arr))
