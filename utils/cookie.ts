export function getCookieValue(documentCookie: string, key: string) {
  const pair = documentCookie
    .split('; ')
    .find((row) => row.startsWith(key + '='))

  return pair ? pair.split('=')[1] : null
}
