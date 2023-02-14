import type { NextApiRequest, NextApiResponse } from 'next'
import { CabinToken__factory } from 'generated/contract'
import { BigNumber } from 'ethers'
import { getCabinTokenBalances } from '@/lib/fauna-server/getCabinTokenBalances'
import { attemptSync, SyncAttemptState } from '@/lib/sync/attemptSync'
import { getAlchemyProvider } from '@/lib/alchemy'
import { cabinTokenConfig } from '@/lib/protocol-config'
import { syncAccountBalances } from '@/lib/fauna-server/syncAccountBalances'

const CABIN_SYNC_KEY = 'CabinToken'
const BLOCK_COUNT = BigNumber.from(2000)
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await attemptSync({
    key: CABIN_SYNC_KEY,
    provider: getAlchemyProvider(cabinTokenConfig.networkName),
    initialBlock: cabinTokenConfig.initialBlock,
    blockCount: BLOCK_COUNT,
    res,
    handler: _syncHandler,
  })
}

async function _syncHandler(state: SyncAttemptState): Promise<void> {
  const { startBlock, endBlock, ref } = state
  const cabinTokenContract = CabinToken__factory.connect(
    cabinTokenConfig.contractAddress,
    state.provider
  )

  const transferFilter = cabinTokenContract.filters.Transfer()
  const transfers = await cabinTokenContract.queryFilter(
    transferFilter,
    startBlock.toNumber(),
    endBlock.toNumber()
  )

  const uniqueAddresses = new Set<string>()
  const adjustments: {
    address: string
    type: 'ADD' | 'SUBTRACT'
    amount: BigNumber
  }[] = []
  transfers.forEach((t) => {
    const { from, to, value } = t.args

    if (from != ZERO_ADDRESS) {
      uniqueAddresses.add(from)
      adjustments.push({
        address: from,
        type: 'SUBTRACT',
        amount: value,
      })
    }
    if (to != ZERO_ADDRESS) {
      uniqueAddresses.add(to)
      adjustments.push({
        address: to,
        type: 'ADD',
        amount: value,
      })
    }
  })

  const cabinTokenBalances = await getCabinTokenBalances(
    Array.from(uniqueAddresses)
  )

  const cabinTokenBalancesByAddress = cabinTokenBalances.reduce((acc, curr) => {
    acc[curr.address] = curr.balance
    return acc
  }, {} as Record<string, string>)

  const newBalancesByAddress = adjustments.reduce((acc, curr) => {
    // If acc[curr.address] is defined below, it means that the address has multiple adjustments in this batch
    // If it's not defined, we can use the balance from the DB
    // Otherwise, we use 0
    const currentBalance = BigNumber.from(
      acc[curr.address] ?? cabinTokenBalancesByAddress[curr.address] ?? 0
    )

    const newBalance =
      curr.type === 'ADD'
        ? currentBalance.add(curr.amount)
        : currentBalance.sub(curr.amount)
    acc[curr.address] = newBalance
    return acc
  }, {} as Record<string, BigNumber>)

  const newBalances = Object.entries(newBalancesByAddress).map(
    ([address, balance]) => ({
      address,
      balance: balance.toString(),
    })
  )

  await syncAccountBalances(ref, newBalances)
}
