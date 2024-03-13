import { Provider } from 'ethers'
import { NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import {
  BlockSyncType,
  BlockSyncAttempt,
  BlockSyncStatus,
} from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

const SAFE_BLOCK_THRESHOLD = 30

export interface SyncAttemptInput {
  provider: Provider
  type: BlockSyncType
  initialBlock: Decimal
  blockCount: Decimal
  res: NextApiResponse
  handler: (state: SyncAttemptState) => Promise<object | void>
}

export interface SyncAttemptState {
  provider: Provider
  startBlock: Decimal
  endBlock: Decimal
}

export async function attemptSync(input: SyncAttemptInput) {
  const { type, provider, res, handler } = input

  const latest = await prisma.blockSyncAttempt.findMany({
    where: { type },
    distinct: ['status'],
    orderBy: { createdAt: 'desc' },
  })

  const latestPendingAttempt = latest.find((a) => a.status === 'Pending')
  const latestSuccessfulAttempt = latest.find((a) => a.status === 'Successful')
  const latestFailedAttempt = latest.find((a) => a.status === 'Failed')

  // Short circuit if there are any pending sync attempts
  if (latestPendingAttempt) {
    console.log(`${type} sync already in progress`)
    res
      .status(200)
      .send(JSON.stringify({ message: `${type} sync already in progress` }))
    return
  }

  const latestBlockNumber = await provider.getBlockNumber()
  const syncAttempt =
    latestFailedAttempt ??
    (await createNewSyncAttempt(
      input,
      latestBlockNumber,
      latestSuccessfulAttempt
    ))

  if (!syncAttempt) {
    console.log('No sync attempt created, skipping')
    res
      .status(200)
      .send(JSON.stringify({ message: 'No sync attempt created, skipping' }))
    return
  }

  try {
    const blocksTillLatest = new Decimal(latestBlockNumber).sub(
      syncAttempt.endBlock
    )

    const result = await handler({
      provider,
      startBlock: syncAttempt.startBlock,
      endBlock: syncAttempt.endBlock,
    })

    await completeSync(syncAttempt)

    res.status(200).send(
      JSON.stringify(
        {
          type,
          id: syncAttempt.id,
          startBlock: syncAttempt.startBlock.toNumber(),
          endBlock: syncAttempt.endBlock.toNumber(),
          blocksTillLatest: blocksTillLatest.toNumber(),
          result,
        },
        null,
        2
      )
    )
  } catch (error) {
    console.error(error)
    try {
      await failSync(syncAttempt)

      res
        .status(400)
        .send(
          JSON.stringify(
            { error: 'Sync attempt failed. Will attempt to retry.' },
            null,
            2
          )
        )
    } catch (error) {
      console.error(error)
      res
        .status(400)
        .send(JSON.stringify({ error: 'Sync attempt failed.' }, null, 2))
    }
  }
}

async function createNewSyncAttempt(
  input: SyncAttemptInput,
  latestBlockNumber: number,
  latestSuccessfulAttempt: BlockSyncAttempt | undefined
) {
  const { type, initialBlock, blockCount } = input

  // Find the latest safe block number
  const maxSafeBlock = latestBlockNumber - SAFE_BLOCK_THRESHOLD

  let startBlock
  if (latestSuccessfulAttempt) {
    // If we're already up to date, there is nothing to attempt
    if (latestSuccessfulAttempt.endBlock.eq(maxSafeBlock)) {
      return null
    }
    startBlock = latestSuccessfulAttempt.endBlock.add(1)
  } else {
    startBlock = initialBlock
  }

  // Find the end block (don't exceed the max safe block)
  const endBlock = startBlock.add(blockCount).gt(maxSafeBlock)
    ? new Decimal(maxSafeBlock)
    : startBlock.add(blockCount)

  // Create a new sync attempt for the next N blocks in pending state
  return prisma.blockSyncAttempt.create({
    data: {
      type,
      status: BlockSyncStatus.Pending,
      startBlock: startBlock,
      endBlock: endBlock,
    },
  })
}

async function completeSync(syncAttempt: BlockSyncAttempt) {
  if (syncAttempt.status == BlockSyncStatus.Successful) {
    console.error(`sync attempt ${syncAttempt.id} already completed`)
    return
  }

  return prisma.blockSyncAttempt.update({
    where: {
      id: syncAttempt.id,
      status: syncAttempt.status,
    },
    data: {
      status: BlockSyncStatus.Successful,
    },
  })
}

async function failSync(syncAttempt: BlockSyncAttempt) {
  if (syncAttempt.status == BlockSyncStatus.Failed) {
    console.error(`sync attempt ${syncAttempt.id} already failed`)
    return
  }

  return prisma.blockSyncAttempt.update({
    where: {
      id: syncAttempt.id,
      status: syncAttempt.status,
    },
    data: {
      status: BlockSyncStatus.Failed,
    },
  })
}
