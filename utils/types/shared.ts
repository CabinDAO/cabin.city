import { EnumLike, z } from 'zod'

export type Paginated = {
  count: number
}

export type APIError = {
  error: string
}

// note: merging PageParams will also override the unknownKeys policy. so leave it default here
// https://zod.dev/?id=merge
export const PageParams = z.object({
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
})
export type PageParamsType = z.infer<typeof PageParams>

export const commaSeparatedStrings = z
  .string()
  .transform((str) => str.split(','))
  .pipe(z.array(z.string()))

export const commaSeparatedArrayOf = <T extends EnumLike>(vals: T) =>
  z
    .string()
    .transform((str) => str.split(','))
    .pipe(z.array(z.nativeEnum(vals)))
