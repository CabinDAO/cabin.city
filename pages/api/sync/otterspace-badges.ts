import { getAlchemyProvider } from '@/lib/alchemy'
import { syncBadges } from '@/lib/fauna-server/syncBadges'
import { otterspaceClient } from '@/lib/otterspace/otterspaceClient'
import { otterspaceConfig } from '@/lib/protocol-config'
import { attemptSync, SyncAttemptState } from '@/lib/sync/attemptSync'
import { BigNumber } from 'ethers'
import { GetBadgesDocument } from 'generated/gql/otterspace/graphql'
import { NextApiRequest, NextApiResponse } from 'next'

const OTTERSPACE_SYNC_KEY = 'Otterspace'
const BLOCK_COUNT = BigNumber.from('1000000')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await attemptSync({
    key: OTTERSPACE_SYNC_KEY,
    provider: getAlchemyProvider(otterspaceConfig.networkName),
    initialBlock: otterspaceConfig.initialBlock,
    blockCount: BLOCK_COUNT,
    res,
    handler: _syncHandler,
  })
}

async function _syncHandler(state: SyncAttemptState): Promise<void> {
  const { startBlock, endBlock, ref } = state
  const { data } = await otterspaceClient.query({
    query: GetBadgesDocument,
    variables: {
      raftId: otterspaceConfig.raftId,
      startBlock: startBlock.toNumber(),
      endBlock: endBlock.toNumber(),
    },
  })

  const badgesToAdd = data.badges.map((b) => {
    return {
      address: b.owner,
      badge: {
        badgeId: b.id,
        createdAt: b.createdAt.toString(),
      },
      spec: {
        specId: b.spec.id,
        name: b.spec.metadata?.name,
        description: b.spec.metadata?.description,
        image: b.spec.metadata?.image,
      },
    }
  })

  console.log({ badgesToAdd })

  await syncBadges(ref, badgesToAdd)
}
