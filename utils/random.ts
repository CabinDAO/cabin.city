// import { randomUUID } from 'crypto'

enum Prefixes {
  profile = 'pr',
  location = 'lc',
  activity = 'ac',
  event = 'ev',
  invite = 'in',
  cart = 'ct',
  neighborhood = 'nh',
}

type PrefixType = keyof typeof Prefixes

export function randomId(type: PrefixType) {
  return `${Prefixes[type]}_${randomString(20, 'mixedCase')}`
}

export function randomInviteCode() {
  return randomString(8, 'lcOnly')
}

export function randomUploadName(oldName: string) {
  const dotIndex = oldName.lastIndexOf('.')

  const ext =
    dotIndex > 0 && dotIndex < oldName.length - 1
      ? oldName.substring(dotIndex).toLowerCase()
      : ''

  return randomString(8, 'mixedCase') + ext
}

function randomString(length: number, alphabet: Alphabet) {
  const characters = alphabets[alphabet]
  const charactersLength = characters.length

  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

// some chars are removed to aid legibility
const alphabets = {
  lcOnly: 'abcdefghijkmnopqrstuvwxyz123456789',
  mixedCase: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789',
}

type Alphabet = keyof typeof alphabets
