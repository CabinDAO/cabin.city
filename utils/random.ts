// import { randomUUID } from 'crypto'

enum Prefixes {
  profile = 'p',
}

type PrefixType = keyof typeof Prefixes

export function randomId(type: PrefixType) {
  const length = 20
  const prefix = Prefixes[type]
  const characters =
    'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789'
  const charactersLength = characters.length

  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return `${prefix}_${result}`
}
