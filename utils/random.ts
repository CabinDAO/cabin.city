// import { randomUUID } from 'crypto'

enum Prefixes {
  profile = 'pr',
  location = 'lc',
  activity = 'ac',
  experience = 'ex',
  inviteCode = 'ic',
  partialInviteClaim = 'pc',
  cart = 'ct',
}

type PrefixType = keyof typeof Prefixes

export function randomId(type: PrefixType, length = 20, lcOnly = false) {
  const prefix = Prefixes[type]
  const characters = lcOnly
    ? 'abcdefghijkmnopqrstuvwxyz123456789'
    : 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789'
  const charactersLength = characters.length

  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return `${prefix}_${result}`
}

export function randomInviteCode() {
  return randomId('inviteCode', 8, true)
}
