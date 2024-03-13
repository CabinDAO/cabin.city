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

const options = isLocalDev ? { log: ['query' as Prisma.LogLevel] } : undefined

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
