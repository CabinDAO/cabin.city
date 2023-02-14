import { BigNumber, providers } from 'ethers'
import { Expr } from 'faunadb'
import { NextApiResponse } from 'next'
import { createSyncAttempt } from '../fauna-server/createSyncAttempt'
import { getLatestSyncAttempts } from '../fauna-server/getLatestSyncAttempts'
import { updateSyncAttemptStatus } from '../fauna-server/updateSyncAttemptStatus'

const SAFE_BLOCK_THRESHOLD = 30

export interface SyncAttemptInput {
  provider: providers.Provider
  key: string
  initialBlock: BigNumber
  blockCount: BigNumber
  res: NextApiResponse
  handler: (state: SyncAttemptState) => Promise<object | void>
}

export interface SyncAttemptState {
  key: string
  provider: providers.Provider
  ref: Expr
  startBlock: BigNumber
  endBlock: BigNumber
}

export async function attemptSync(input: SyncAttemptInput) {
  const { key, provider, res, handler } = input

  const { latestPendingAttempt, latestSuccessfulAttempt, latestFailedAttempt } =
    await getLatestSyncAttempts(key)

  // Short circuit if there are any pending sync attempts
  if (latestPendingAttempt) {
    console.log('Pending sync attempt found, skipping')
    res
      .status(200)
      .send(JSON.stringify({ message: 'Pending sync attempt found, skipping' }))
    return
  }

  const latestBlockNumber = await provider.getBlockNumber()
  const syncAttempt =
    latestFailedAttempt ??
    (await _tryCreateNewSyncAttempt(
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

  const startBlock = BigNumber.from(syncAttempt.data.startBlock)
  const endBlock = BigNumber.from(syncAttempt.data.endBlock)
  const blocksTillLatest = BigNumber.from(latestBlockNumber).sub(endBlock)

  const state = {
    key,
    provider,
    ref: syncAttempt.ref,
    startBlock,
    endBlock,
  }

  try {
    const result = await handler(state)
    res.status(200).send(
      JSON.stringify(
        {
          key,
          startBlock: startBlock.toString(),
          endBlock: endBlock.toString(),
          blocksTillLatest: blocksTillLatest.toString(),
          ref: syncAttempt.ref,
          result,
        },
        null,
        2
      )
    )
  } catch (error) {
    console.error(error)
    try {
      await updateSyncAttemptStatus(syncAttempt.ref, 'Failed')

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
        .status(422)
        .send(JSON.stringify({ error: 'Sync attempt failed.' }, null, 2))
    }
  }
}

async function _tryCreateNewSyncAttempt(
  input: SyncAttemptInput,
  latestBlockNumber: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  latestSuccessfulAttempt: any
) {
  const { key, initialBlock, blockCount } = input

  // Find the latest safe block number
  const maxSafeBlock = latestBlockNumber - SAFE_BLOCK_THRESHOLD

  let startBlock
  if (latestSuccessfulAttempt) {
    // If we're already up to date, there is nothing to attempt
    if (latestSuccessfulAttempt.data.endBlock === maxSafeBlock.toString()) {
      return null
    }
    startBlock = BigNumber.from(latestSuccessfulAttempt.data.endBlock).add(1)
  } else {
    startBlock = initialBlock
  }

  // Find the end block (don't exceed the max safe block)
  const endBlock = startBlock.add(blockCount).gt(maxSafeBlock)
    ? BigNumber.from(maxSafeBlock)
    : startBlock.add(blockCount)

  // Create a new sync attempt for the next N blocks in pending state
  return await createSyncAttempt(
    key,
    'Pending',
    startBlock.toString(),
    endBlock.toString()
  )
}
