import { Prisma, PrismaClient } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { isLocalDev } from '../utils/dev'

// const getExtendedClient = () => {
//   return new PrismaClient({
//     log:
//       process.env.NODE_ENV === 'development'
//         ? ['query', 'error', 'warn']
//         : ['error'],
//   }).$extends({
//     name: 'findManyAndCount',
//     model: {
//       $allModels: {
//         // NOTE: this function does two queries (though in a single txn)
//         findManyAndCount<Model, Args>(
//           this: Model,
//           args: Prisma.Exact<Args, Prisma.Args<Model, 'findMany'>>
//         ): Promise<[Prisma.Result<Model, Args, 'findMany'>, number]> {
//           return prisma.$transaction([
//             (this as any).findMany(args),
//             (this as any).count({ where: (args as any).where }),
//           ]) as any
//         },
//       },
//     },
//   })
// }
//
// type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: ExtendedPrismaClient | undefined
// }
//
// export const prisma = globalForPrisma.prisma ?? getExtendedClient()
//
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const enableQueryLogging = false

const options =
  enableQueryLogging && isLocalDev
    ? { log: ['query' as Prisma.LogLevel] }
    : undefined

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(options)
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient(options)
  }
  prisma = globalWithPrisma.prisma

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.prisma = prisma
}

const onchainAmountToDecimal = (balance: string) =>
  new Decimal(balance).dividedBy(10 ** 18)

export { prisma, onchainAmountToDecimal }

// TOOK THE BELOW CODE FROM https://github.com/s1owjke/prisma-query-formatter
// note: it does not quote strings correctly
// to use: console.log(formatQuery(rawQuery.inspect().sql, rawQuery.inspect().values))
const escapeWhitespace = (param: string) => {
  return param.replace(/[\f\n\r\t\v]/g, (match) => {
    if (match === '\f') return '\\f'
    if (match === '\n') return '\\n'
    if (match === '\r') return '\\r'
    if (match === '\t') return '\\t'
    if (match === '\v') return '\\v'
    return match
  })
}

export const parseParams = (rawParams: string) => {
  const values = rawParams.replace(/^\[([^]*)]$/, '$1')
  return values ? values.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/) : []
}

export const formatQuery = (
  query: string,
  rawParams: string | unknown[],
  options: {
    escapeParams?: boolean
  } = {}
): string => {
  const params =
    typeof rawParams === 'string'
      ? parseParams(rawParams)
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rawParams.map((p: any) => p.toString())

  query = query.replace(/\s/g, ' ').replace(/\s{2,}/g, ' ')

  if (params.length > 0) {
    query = query.replace(/(\?|\$\d+)/g, () => {
      const param = params.shift() || ''
      return options.escapeParams ? escapeWhitespace(param) : param
    })
  }

  return query.trim()
}
