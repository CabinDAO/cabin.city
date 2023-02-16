import { HatToAdd } from '@/fauna/lib/AddHats'
import { HatToRemove } from '@/fauna/lib/RemoveHats'
import { AddressActivity } from '@/fauna/lib/UpsertActivities'
import { GetHatsEventsDocument } from '@/generated/gql/hats/graphql'
import { getAlchemyProvider } from '@/lib/alchemy'
import { syncHatRoles } from '@/lib/fauna-server/syncHatRoles'
import { getProfileRoleFromHat } from '@/lib/hats/hats-utils'
import { hatsClient } from '@/lib/hats/hatsClient'
import { hatsConfig } from '@/lib/protocol-config'
import { attemptSync, SyncAttemptState } from '@/lib/sync/attemptSync'
import { BigNumber } from 'ethers'
import { ActivityType } from 'generated/graphql'
import { NextApiRequest, NextApiResponse } from 'next'

const HATS_SYNC_KEY = 'HatsProtocol'
const BLOCK_COUNT = BigNumber.from('1000000')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await attemptSync({
    key: HATS_SYNC_KEY,
    provider: getAlchemyProvider(hatsConfig.networkName),
    initialBlock: hatsConfig.initialBlock,
    blockCount: BLOCK_COUNT,
    res,
    handler: _syncHandler,
  })
}

async function _syncHandler(state: SyncAttemptState): Promise<void> {
  const { startBlock, endBlock, ref } = state
  const { data } = await hatsClient.query({
    query: GetHatsEventsDocument,
    variables: {
      treeId: hatsConfig.treeId,
      startBlock: startBlock.toNumber(),
      endBlock: endBlock.toNumber(),
    },
  })

  const hatsToAdd: HatToAdd[] = []
  const hatsToRemove: HatToRemove[] = []
  const activities: AddressActivity[] = []

  data.hatsEvents.forEach((e) => {
    switch (e.__typename) {
      case 'HatMintedEvent':
        const profileRole = getProfileRoleFromHat(e.hat)

        hatsToAdd.push({
          address: e.wearer.id,
          hat: {
            hatId: e.hat.id,
            details: e.hat.details,
            imageUri: e.hat.imageUri,
            level: e.hat.level,
          },
          profileRole,
        })

        activities.push({
          address: e.wearer.id,
          activity: {
            key: e.transactionID,

            type: ActivityType.ProfileRoleAdded,
            transactionId: e.transactionID,
            timestamp: e.timestamp,
            blockNumber: e.blockNumber.toString(),
            metadata: {
              profileRole,
            },
          },
        })
        break
      case 'HatBurnedEvent':
        hatsToRemove.push({
          address: e.wearer.id,
          hatId: e.hat.id,
        })
      default:
        // Skip
        break
    }
  })

  await syncHatRoles(ref, hatsToAdd, hatsToRemove, activities)
}
