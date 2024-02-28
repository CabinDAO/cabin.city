import { NextApiRequest, NextApiResponse } from 'next'
import { attemptSync, SyncAttemptState } from '@/lib/sync/attemptSync'
import { prisma } from '@/lib/prisma'
import { BlockSyncType, ActivityType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { getAlchemyProvider } from '@/lib/alchemy'
import { randomId } from '@/utils/random'
import { otterspaceClient } from '@/lib/otterspace/otterspaceClient'
import { otterspaceConfig } from '@/lib/protocol-config'
import { GetBadgesDocument } from 'generated/gql/otterspace/graphql'

const BLOCK_COUNT = new Decimal('1000000')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await attemptSync({
    type: BlockSyncType.Otterspace,
    provider: getAlchemyProvider(otterspaceConfig.networkName),
    initialBlock: new Decimal(otterspaceConfig.initialBlock.toString()),
    blockCount: BLOCK_COUNT,
    res,
    handler: _syncHandler,
  })
}

async function _syncHandler(state: SyncAttemptState): Promise<void> {
  const { data } = await otterspaceClient.query({
    query: GetBadgesDocument,
    variables: {
      raftId: otterspaceConfig.raftId,
      startBlock: state.startBlock.toNumber(),
      endBlock: state.endBlock.toNumber(),
    },
  })

  for (const b of data.badges) {
    const badgeInfo = {
      address: b.owner.id,
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

    const badge = await prisma.badge.upsert({
      where: {
        otterspaceBadgeId: badgeInfo.badge.badgeId,
      },
      create: {
        createdAt: badgeInfo.badge.createdAt,
        otterspaceBadgeId: badgeInfo.badge.badgeId,
        spec: {
          connectOrCreate: {
            where: {
              otterspaceSpecId: badgeInfo.spec.specId,
            },
            create: {
              createdAt: badgeInfo.badge.createdAt,
              otterspaceSpecId: badgeInfo.spec.specId,
              name: badgeInfo.spec.name ?? '',
              description: badgeInfo.spec.description ?? '',
              image: badgeInfo.spec.image ?? '',
            },
          },
        },
        wallet: {
          connectOrCreate: {
            where: {
              address: badgeInfo.address,
            },
            create: {
              address: badgeInfo.address,
              cabinTokenBalance: 0,
            },
          },
        },
      },
      update: {},
      include: {
        wallet: {
          include: {
            profile: true,
          },
        },
      },
    })

    if (badge.wallet.profile) {
      await prisma.activity.upsert({
        where: {
          key: badge.otterspaceBadgeId,
        },
        create: {
          key: badge.otterspaceBadgeId,
          externId: randomId('activity'),
          type: ActivityType.BadgeAdded,
          text: '',
          profile: {
            connect: {
              id: badge.wallet.profile.id,
            },
          },
          badge: {
            connect: {
              id: badge.id,
            },
          },
        },
        update: {},
      })
    }
  }
}
