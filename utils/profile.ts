import { prisma } from '@/lib/prisma'
import {
  Profile,
  RoleType,
  RoleLevel,
  ActivityType,
  Prisma,
  CitizenshipStatus,
  PartialInviteClaim,
} from '@prisma/client'
import { randomId, randomInviteCode } from '@/utils/random'
import { getRoleInfoFromHat } from '@/lib/hats/hats-utils'
import { PublicLock__factory } from '@/generated/contract'
import { unlockConfig } from '@/lib/protocol-config'
import { getAlchemyProvider } from '@/lib/alchemy'
import { Wallet } from 'alchemy-sdk'
import { ContractReceipt, ContractTransaction } from 'ethers'

type ProfileCreateParams = {
  privyDID: string
  walletAddress: string
  name: string
  email: string
  avatar?: {
    url: string
    contractAddress?: string | null
    title?: string | null
    tokenId?: string | null
    tokenUri?: string | null
    network?: string | null
  }
  claimedInvite: Prisma.PartialInviteClaimGetPayload<null> | null
}

// must match ProfileWithRelations below
type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    wallet: true
    claimedInvite: {
      include: {
        cart: true
      }
    }
  }
}>

// must match ProfileWithRelations type above
export const ProfileQueryInclude = {
  wallet: true,
  claimedInvite: {
    include: {
      cart: true,
    },
  },
} satisfies Prisma.ProfileInclude

export async function createProfile(
  params: ProfileCreateParams
): Promise<ProfileWithRelations> {
  const profile = await prisma.profile.create({
    data: {
      externId: randomId('profile'),
      privyDID: params.privyDID,
      name: params.name,
      email: params.email,
      bio: '',
      location: '',
      inviteCode: randomInviteCode(),
      wallet: {
        connectOrCreate: {
          where: {
            address: params.walletAddress,
          },
          create: {
            address: params.walletAddress,
            cabinTokenBalance: '0',
          },
        },
      },
      avatar: params.avatar
        ? {
            create: {
              url: params.avatar.url,
              contractAddress: params.avatar.contractAddress,
              title: params.avatar.title,
              tokenId: params.avatar.tokenId,
              tokenUri: params.avatar.tokenUri,
              network: params.avatar.network,
            },
          }
        : undefined,

      citizenshipStatus: params.claimedInvite
        ? CitizenshipStatus.Vouched
        : undefined, // should this be verified? the only way to get to this flow is through instant citizenship
      voucher: params.claimedInvite
        ? { connect: { id: params.claimedInvite.inviterId } }
        : undefined,
      claimedInvite: params.claimedInvite
        ? { connect: { id: params.claimedInvite.id } }
        : undefined,
    },
    // include must match ProfileWithIncludes type below
    include: ProfileQueryInclude,
  })

  const activityKey = `ProfileCreated|${profile.externId}`
  await prisma.activity.upsert({
    where: {
      key: activityKey,
    },
    create: {
      externId: randomId('activity'),
      key: activityKey,
      type: ActivityType.ProfileCreated,
      profileId: profile.id,
    },
    update: {},
  })

  await createHats(profile)

  if (params.claimedInvite) {
    await grantOrExtendCitizenship(profile)
  }

  return profile
}

async function createHats(profile: Profile) {
  const walletHats = await prisma.walletHat.findMany({
    where: {
      walletId: profile.walletId,
    },
    include: {
      hat: true,
    },
  })

  if (!walletHats.length) return

  const rolesToAdd = walletHats
    .map((wh) => {
      const r = getRoleInfoFromHat(wh.hat.hatsProtocolId)

      return {
        walletHatId: wh.id,
        type: r?.type,
        level: r?.level,
      }
    })
    .filter((r) => r.type && r.level)

  await prisma.role.createMany({
    data: rolesToAdd.map((r) => {
      return {
        profileId: profile.id,
        walletHatId: r.walletHatId,
        type: r.type as RoleType,
        level: r.level as RoleLevel,
      }
    }),
    skipDuplicates: true,
  })
}

async function grantOrExtendCitizenship(profile: ProfileWithRelations) {
  const claim = profile.claimedInvite

  if (!claim) {
    return null
  }

  if (claim.citizenshipGrantTx) {
    // todo: maybe this is not an error? there may be race conditions
    // res.status(400).send({
    //   error: `Citizenship was already granted in tx ${claim.citizenshipGrantTx}`,
    // })
    console.error(
      `Citizenship was already granted in tx ${claim.citizenshipGrantTx}`
    )
    return null
  }

  const address = profile.wallet.address
  const provider = getAlchemyProvider(unlockConfig.networkName)

  const privateKey = process.env.SIGNER_PRIVATE_KEY
  if (!privateKey) {
    throw new Error('SIGNER_PRIVATE_KEY env var is missing')
  }

  const wallet = new Wallet(privateKey, provider)
  // console.log(wallet.address)
  // console.log(await wallet.getBalance())

  const lockContract = PublicLock__factory.connect(
    unlockConfig.contractAddress,
    wallet
  )

  const keyIndex = 0 // we only support one key per user for now, but Unlock supports more
  let hasKey = false
  let hasValidKey = false

  try {
    // need to check this to ensure they don't already have an expired key.
    // if they do, need to extend them instead of granting a new one
    const totalKeys = await lockContract.totalKeys(address)
    hasKey = totalKeys.toNumber() > 0

    hasValidKey = await lockContract.getHasValidKey(address)
  } catch (e: unknown) {
    console.error(e)
    await claimSetError(claim, `Couldnt fetch data about lock contract: ${e}`)
  }

  if (hasValidKey) {
    // tx will fail and revert if we try to grant a citizenship when they already have one
    // TODO: if they did pay, maybe we should just extend their citizenship?
    await claimSetError(claim, `User already has a valid key`)
    return null
  }

  const hasExpiredKey = hasKey && !hasValidKey
  const oneYearInSeconds = 60 * 60 * 24 * 365 * 1
  const expiration = Math.floor(new Date().getTime() / 1000) + oneYearInSeconds
  const keyManager = '0x3DedB545E9B89f63FA71Ab75497735d802C9d26F' // grin

  // this is mostly for testing, but it can be useful to create and sign the tx without sending it
  // const tx = await lockContract.populateTransaction.grantKeys(
  //   [address],
  //   [expiration],
  //   [keyManager]
  // )
  // console.log(tx)
  //
  // const signed = await wallet.signTransaction(tx)
  // console.log(signed)

  let tx: ContractTransaction | null = null
  let receipt: ContractReceipt | null = null

  // sign and send the tx all in one shot
  try {
    const overrides = { gasLimit: 500000 }

    tx = hasExpiredKey
      ? await lockContract.grantKeyExtension(
          keyIndex,
          oneYearInSeconds,
          overrides
        )
      : await lockContract.grantKeys(
          [address],
          [expiration],
          [keyManager],
          overrides
        )

    console.log(`tx granting key or extension: ${tx.hash}`)
  } catch (e: unknown) {
    console.error(e)
    await claimSetError(claim, `Failed to send citizenship tx: ${e}`)
  }

  if (!tx) {
    return null
  }

  await prisma.partialInviteClaim.update({
    where: { id: claim.id },
    data: { citizenshipGrantTx: tx.hash },
  })

  // wait till tx is included in a block
  try {
    receipt = await tx.wait()
    console.log(`tx ${tx.hash} included in block: ${receipt.blockNumber}`)
  } catch (e: unknown) {
    console.error(e)
    await claimSetError(claim, `Failed waiting to include tx: ${e}`)
  }

  if (!receipt) {
    return null
  }

  await prisma.partialInviteClaim.update({
    where: { id: claim.id },
    data: { citizenshipTxConfirmed: true },
  })

  const tokenId = await lockContract.tokenOfOwnerByIndex(address, keyIndex)

  await prisma.profile.update({
    where: { id: profile.id },
    data: {
      citizenshipStatus: CitizenshipStatus.Verified,
      citizenshipTokenId: tokenId.toNumber(),
      citizenshipMintedAt: new Date(),
    },
  })

  return receipt
}

async function claimSetError(claim: PartialInviteClaim, error: string) {
  await prisma.partialInviteClaim.update({
    where: { id: claim.id },
    data: { error: error },
  })
}
