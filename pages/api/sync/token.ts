import type { NextApiRequest, NextApiResponse } from 'next'
import { attemptSync, SyncAttemptState } from '@/lib/sync/attemptSync'
import { prisma, onchainAmountToDecimal } from '@/lib/prisma'
import { $Enums } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { getEthersAlchemyProvider } from '@/lib/chains'
import { CabinToken__factory } from 'generated/ethers'
import { cabinTokenConfigForEnv } from '@/lib/protocol-config'

const BLOCK_COUNT = new Decimal(2000)
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await attemptSync({
    type: $Enums.BlockSyncType.CabinToken,
    provider: getEthersAlchemyProvider(cabinTokenConfigForEnv.networkName),
    initialBlock: new Decimal(cabinTokenConfigForEnv.initialBlock.toString()),
    blockCount: BLOCK_COUNT,
    res,
    handler: _syncHandler,
  })
}

async function _syncHandler(state: SyncAttemptState): Promise<void> {
  const cabinTokenContract = CabinToken__factory.connect(
    cabinTokenConfigForEnv.contractAddress,
    state.provider
  )

  const transferFilter = cabinTokenContract.filters.Transfer()
  const transfers = await cabinTokenContract.queryFilter(
    transferFilter,
    state.startBlock.toNumber(),
    state.endBlock.toNumber()
  )

  const uniqueAddresses = new Set<string>()
  const adjustments: {
    address: string
    type: 'ADD' | 'SUBTRACT'
    amount: Decimal
  }[] = []
  transfers.forEach((t) => {
    const { from, to, value } = t.args

    if (from != ZERO_ADDRESS) {
      uniqueAddresses.add(from)
      adjustments.push({
        address: from,
        type: 'SUBTRACT',
        amount: onchainAmountToDecimal(value.toString()),
      })
    }
    if (to != ZERO_ADDRESS) {
      uniqueAddresses.add(to)
      adjustments.push({
        address: to,
        type: 'ADD',
        amount: onchainAmountToDecimal(value.toString()),
      })
    }
  })

  const cabinTokenBalances = await prisma.wallet.findMany({
    where: {
      address: {
        in: Array.from(uniqueAddresses),
      },
    },
    select: {
      address: true,
      cabinTokenBalance: true,
    },
  })

  const cabinTokenBalancesByAddress = cabinTokenBalances.reduce((acc, curr) => {
    acc[curr.address] = curr.cabinTokenBalance
    return acc
  }, {} as Record<string, Decimal>)

  const newBalancesByAddress = adjustments.reduce((acc, curr) => {
    // If acc[curr.address] is defined below, it means that the address has multiple adjustments in this batch
    // If it's not defined, we can use the balance from the DB
    // Otherwise, we use 0
    const currentBalance =
      acc[curr.address] ??
      cabinTokenBalancesByAddress[curr.address] ??
      new Decimal(0)

    const newBalance =
      curr.type === 'ADD'
        ? currentBalance.add(curr.amount)
        : currentBalance.sub(curr.amount)
    acc[curr.address] = newBalance
    return acc
  }, {} as Record<string, Decimal>)

  for (const [address, balance] of Object.entries(newBalancesByAddress)) {
    await prisma.wallet.upsert({
      where: {
        address: address,
      },
      update: {
        cabinTokenBalance: balance,
      },
      create: {
        address: address,
        cabinTokenBalance: balance,
      },
    })
  }
}
