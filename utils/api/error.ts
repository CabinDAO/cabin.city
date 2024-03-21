import { ZodError } from 'zod'

// another option is https://github.com/causaly/zod-validation-error

export function toErrorString(e: unknown) {
  if (e instanceof ZodError) {
    const s: string[] = []
    for (const [k, v] of Object.entries(e.flatten().fieldErrors)) {
      s.push(`${k}: ${v?.join(', ')}`)
    }
    return s.join('; ')
  } else {
    return `${e}`
  }
}
