import type { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
import { Provider } from 'ethers'
import { CabinToken__factory } from 'generated/ethers'
import { getEthersAlchemyProvider } from '@/lib/chains'
import { cabinTokenConfigForEnv } from '@/lib/protocol-config'
import { prisma, onchainAmountToDecimal } from '@/lib/prisma'
import {
  BlockSyncType,
  BlockSyncStatus,
  BlockSyncAttempt,
} from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { sendToDiscord, TEAM_MENTION } from '@/lib/discord'

const BLOCK_COUNT = new Decimal(2000)
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const SAFE_BLOCK_THRESHOLD = 30

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const provider = getEthersAlchemyProvider(cabinTokenConfigForEnv.networkName)

  const { sync: syncAttempt, message } = await getSyncToWorkOn(provider)
  if (!syncAttempt) {
    console.log(message ?? 'No sync attempt to work on, skipping')
    res.status(200).send({
      message: message ?? 'No sync attempt to work on, skipping',
    })
    return
  }

  try {
    const blocksTillLatest = new Decimal(await provider.getBlockNumber()).sub(
      syncAttempt.endBlock
    )

    await syncTokenBalances(
      provider,
      syncAttempt.startBlock,
      syncAttempt.endBlock
    )

    await prisma.blockSyncAttempt.update({
      where: { id: syncAttempt.id, status: syncAttempt.status },
      data: { status: BlockSyncStatus.Successful },
    })

    res.status(200).send({
      id: syncAttempt.id,
      startBlock: syncAttempt.startBlock.toNumber(),
      endBlock: syncAttempt.endBlock.toNumber(),
      blocksTillLatest: blocksTillLatest.toNumber(),
    })
  } catch (error: unknown) {
    Sentry.captureException(error, {
      extra: { syncAttemptId: syncAttempt.id },
    })
    if (error instanceof Error) {
      console.error(error)
    }

    try {
      await prisma.blockSyncAttempt.update({
        where: { id: syncAttempt.id, status: syncAttempt.status },
        data: { status: BlockSyncStatus.Failed },
      })
    } catch (err2: unknown) {
      Sentry.captureException(err2, {
        extra: { syncAttemptId: syncAttempt.id },
      })
      console.error(err2)
    }

    res
      .status(400)
      .send({ error: 'Sync attempt failed. Will attempt to retry.' })
  }
}

async function syncTokenBalances(
  provider: Provider,
  startBlock: Decimal,
  endBlock: Decimal
): Promise<void> {
  const cabinTokenContract = CabinToken__factory.connect(
    cabinTokenConfigForEnv.contractAddress,
    provider
  )

  const transfers = await cabinTokenContract.queryFilter(
    cabinTokenContract.filters.Transfer(),
    startBlock.toNumber(),
    endBlock.toNumber()
  )

  const uniqueAddresses = new Set<string>()
  const adjustments: {
    address: string
    type: 'ADD' | 'SUBTRACT'
    amount: Decimal
  }[] = []

  transfers.forEach((t) => {
    const { from, to, value } = t.args

    sendToDiscord(
      `${from} sent ${onchainAmountToDecimal(value.toString())} tokens to ${to}`
    )

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
    select: { address: true, cabinTokenBalance: true },
    where: { address: { in: Array.from(uniqueAddresses) } },
  })

  const cabinTokenBalancesByAddress = cabinTokenBalances.reduce((acc, curr) => {
    acc[curr.address] = curr.cabinTokenBalance
    return acc
  }, {} as Record<string, Decimal>)

  const updates: Record<string, Decimal> = {}
  for (const adj of adjustments) {
    const currentBalance =
      updates[adj.address] ??
      cabinTokenBalancesByAddress[adj.address] ??
      new Decimal(0)

    const newBalance =
      adj.type === 'ADD'
        ? currentBalance.add(adj.amount)
        : currentBalance.sub(adj.amount)
    updates[adj.address] = newBalance
  }

  // TODO: this should be a single transaction so it can be atomic
  for (const [address, balance] of Object.entries(updates)) {
    sendToDiscord(`incrementing ${address} balance by ${balance}`)
    await prisma.wallet.upsert({
      where: { address: address.toLowerCase() },
      update: { cabinTokenBalance: { increment: balance } },
      create: { address: address.toLowerCase(), cabinTokenBalance: balance },
    })
  }
}

async function getSyncToWorkOn(
  provider: Provider
): Promise<{ sync: BlockSyncAttempt | null; message: string | null }> {
  const initialBlock = new Decimal(
    cabinTokenConfigForEnv.initialBlock.toString()
  )

  const latestSyncs = await prisma.blockSyncAttempt.findMany({
    where: { type: BlockSyncType.CabinToken },
    distinct: ['status'],
    orderBy: { createdAt: 'desc' },
  })

  const latestPendingSync = latestSyncs.find((a) => a.status === 'Pending')
  if (latestPendingSync) {
    console.log(`token sync already in progress`)
    if (
      latestPendingSync.createdAt < new Date(Date.now() - 6 * 60 * 60 * 1000)
    ) {
      await sendToDiscord(
        `${TEAM_MENTION} Token sync ${latestPendingSync.id} has been pending for over 6 hours`
      )
    }
    return {
      sync: null,
      message: `token sync already in progress`,
    }
  }

  const latestFailedSync = latestSyncs.find((a) => a.status === 'Failed')
  if (latestFailedSync) {
    return { sync: latestFailedSync, message: null }
  }

  const latestSuccessfulSync = latestSyncs.find(
    (a) => a.status === 'Successful'
  )

  const latestBlockNumber = await provider.getBlockNumber()

  // Find the latest safe block number
  const maxSafeBlock = latestBlockNumber - SAFE_BLOCK_THRESHOLD

  // If we're already up to date, there is nothing to attempt
  if (latestSuccessfulSync?.endBlock.eq(maxSafeBlock)) {
    return { sync: null, message: null }
  }

  const startBlock = latestSuccessfulSync
    ? latestSuccessfulSync.endBlock.add(1)
    : initialBlock

  // Find the end block (don't exceed the max safe block)
  const endBlock = startBlock.add(BLOCK_COUNT).gt(maxSafeBlock)
    ? new Decimal(maxSafeBlock)
    : startBlock.add(BLOCK_COUNT)

  // Create a new sync attempt for the next N blocks in pending state
  const sync = await prisma.blockSyncAttempt.create({
    data: {
      type: BlockSyncType.CabinToken,
      status: BlockSyncStatus.Pending,
      startBlock: startBlock,
      endBlock: endBlock,
    },
  })
  return { sync, message: null }
}
