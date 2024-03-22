// import { randomUUID } from 'crypto'

enum Prefixes {
  profile = 'pr',
  location = 'lc',
  activity = 'ac',
  experience = 'ex',
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
