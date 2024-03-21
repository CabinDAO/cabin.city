import { ZodError } from 'zod'

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
