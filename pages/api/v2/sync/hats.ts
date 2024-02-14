import { NextApiRequest, NextApiResponse } from 'next'
import { attemptSync, SyncAttemptState } from '@/lib/sync/attemptSync'
import { prisma } from '@/utils/prisma'
import {
  ActivityType,
  BlockSyncType,
  RoleLevel,
  RoleType,
} from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { getAlchemyProvider } from '@/lib/alchemy'
import { randomId } from '@/utils/random'
import { hatsClient } from '@/lib/hats/hatsClient'
import { hatsConfig } from '@/lib/protocol-config'
import { GetHatsEventsDocument } from '@/generated/gql/hats/graphql'
import { getRoleInfoFromHat } from '@/lib/hats/hats-utils'

const BLOCK_COUNT = new Decimal('1000000')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await attemptSync({
    type: BlockSyncType.Hats,
    provider: getAlchemyProvider(hatsConfig.networkName),
    initialBlock: new Decimal(hatsConfig.initialBlock.toString()),
    blockCount: BLOCK_COUNT,
    res,
    handler: _syncHandler,
  })
}

async function _syncHandler(state: SyncAttemptState): Promise<void> {
  const { data } = await hatsClient.query({
    query: GetHatsEventsDocument,
    variables: {
      treeId: hatsConfig.treeId,
      startBlock: state.startBlock.toNumber(),
      endBlock: state.endBlock.toNumber(),
    },
  })

  const hatsToAdd: HatToAdd[] = []
  const hatsToRemove: HatToRemove[] = []

  data.hatsEvents.forEach((e) => {
    switch (e.__typename) {
      case 'HatMintedEvent':
        const role = getRoleInfoFromHat(e.hat.prettyId)

        hatsToAdd.push({
          address: e.wearer.id,
          hatsProtocolId: e.hat.id,
          details: e.hat.details,
          imageUri: e.hat.imageUri,
          level: e.hat.levelAtLocalTree,
          role,
          activity: {
            key: e.transactionID,
            transactionId: e.transactionID,
            timestamp: e.timestamp,
            blockNumber: e.blockNumber.toString(),
          },
        })
        break
      case 'HatBurnedEvent':
        const roleInfo = getRoleInfoFromHat(e.hat.prettyId)
        if (roleInfo) {
          hatsToRemove.push({
            address: e.wearer.id,
            hatsProtocolId: e.hat.id,
            type: roleInfo.type,
            level: roleInfo.level,
          })
        }
      default:
        // Skip
        break
    }
  })

  console.info({ hatsToAdd })

  await addHats(hatsToAdd)
  await removeHats(hatsToRemove)
}

type HatToAdd = {
  address: string
  hatsProtocolId: string
  details: string
  imageUri: string
  level: number
  role: ReturnType<typeof getRoleInfoFromHat>
  activity: {
    key: string
    timestamp: string
    transactionId?: string
    blockNumber?: string
  }
}

async function addHats(hatsToAdd: HatToAdd[]) {
  for (const hatToAdd of hatsToAdd) {
    const hat = await prisma.hat.upsert({
      where: {
        hatsProtocolId: hatToAdd.hatsProtocolId,
      },
      create: {
        hatsProtocolId: hatToAdd.hatsProtocolId,
        details: hatToAdd.details,
        imageUri: hatToAdd.imageUri,
        level: hatToAdd.level,
        wallets: {
          create: {
            wallet: {
              connectOrCreate: {
                where: {
                  address: hatToAdd.address,
                },
                create: {
                  address: hatToAdd.address,
                  cabinTokenBalance: '0',
                },
              },
            },
          },
        },
      },
      update: {
        details: hatToAdd.details,
        imageUri: hatToAdd.imageUri,
        level: hatToAdd.level,
      },
      include: {
        wallets: {
          include: {
            wallet: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    })

    if (!hatToAdd.role) continue

    const walletHat = hat.wallets.find(
      (wh) => wh.wallet.address === hatToAdd.address
    )

    if (!walletHat?.wallet.profile) continue

    const role = await prisma.role.upsert({
      where: {
        profileId_type: {
          profileId: walletHat.wallet.profile.id,
          type: hatToAdd.role.type,
        },
      },
      create: {
        walletHatId: walletHat.id,
        profileId: walletHat.wallet.profile.id,
        type: hatToAdd.role.type,
        level: hatToAdd.role.level,
      },
      update: {
        level: hatToAdd.role.level,
      },
    })

    await prisma.activity.upsert({
      where: {
        key: hatToAdd.activity.key,
      },
      create: {
        key: hatToAdd.activity.key,
        externId: randomId('activity'),
        type: ActivityType.RoleAdded,
        profile: {
          connect: {
            id: walletHat.wallet.profile.id,
          },
        },
        roleTransactionId: hatToAdd.activity.transactionId,
        role: {
          connect: {
            id: role.id,
          },
        },
      },
      update: {},
    })
  }
}

export interface HatToRemove {
  address: string
  hatsProtocolId: string
  type: RoleType
  level: RoleLevel
}

async function removeHats(hatsToRemove: HatToRemove[]) {
  for (const hat of hatsToRemove) {
    const walletHat = await prisma.walletHat.findFirst({
      where: {
        wallet: {
          address: hat.address,
        },
        hat: {
          hatsProtocolId: hat.hatsProtocolId,
        },
      },
    })
    if (walletHat) {
      await prisma.walletHat.delete({
        where: {
          id: walletHat.id,
        },
      })
    }
  }
}
