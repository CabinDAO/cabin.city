import { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'
import { RefetchParams, RefetchResponse } from '@/utils/types/unlock'
import { PublicLock__factory } from '@/generated/ethers'
import { unlockConfigForEnv } from '@/lib/protocol-config'
import { getEthersAlchemyProvider } from '@/lib/chains'
import { prisma } from '@/lib/prisma'
import { ActivityType, CitizenshipStatus } from '@prisma/client'
import { randomId } from '@/utils/random'
import { toErrorString } from '@/utils/api/error'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RefetchResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const parsed = RefetchParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const address = params.address

  if (!address) {
    res.status(401).end('Unauthorized')
    return
  }

  const lockContract = PublicLock__factory.connect(
    unlockConfigForEnv.contractAddress,
    getEthersAlchemyProvider(unlockConfigForEnv.networkName)
  )

  const hasValidKey = await lockContract.getHasValidKey(address)

  if (hasValidKey) {
    const tokenId = await lockContract.tokenOfOwnerByIndex(address, 0)
    const profile = await setCitizenshipStatus(
      address,
      CitizenshipStatus.Verified,
      Number(tokenId)
    )
    if (profile) {
      res.json({ updated: true })
      return
    }
  } else {
    // If the user has a Verified key, but no longer has a valid key, set the status to Vouched.
    const profile = await setCitizenshipStatus(
      address,
      CitizenshipStatus.Vouched,
      null
    )
    if (profile) {
      res.json({ updated: true })
      return
    }
  }

  res.send({ updated: false })
}

const setCitizenshipStatus = async (
  address: string,
  newStatus: CitizenshipStatus,
  tokenId: number | null = null
) => {
  const wallet = await prisma.wallet.findUnique({
    where: {
      address: address.toLowerCase(),
    },
    include: {
      profile: true,
    },
  })

  if (!wallet?.profile) {
    console.info(`DataBuilder: No profile found for address ${address}`)
    return false
  }

  if (wallet.profile.citizenshipStatus === newStatus) {
    return false
  }

  const currStatus = wallet.profile.citizenshipStatus
  const shouldUpdate =
    newStatus === CitizenshipStatus.Verified || // they are getting citizenship
    (currStatus === CitizenshipStatus.Verified && // their citizenship expired and they go back to vouched
      newStatus === CitizenshipStatus.Vouched)

  if (!shouldUpdate) {
    return false
  }

  const citizenshipMintedAt =
    newStatus === CitizenshipStatus.Verified ? new Date() : null

  await prisma.profile.update({
    where: {
      id: wallet.profile.id,
    },
    data: {
      citizenshipStatus: newStatus,
      citizenshipTokenId: tokenId,
      citizenshipMintedAt: citizenshipMintedAt,
    },
  })

  if (newStatus === CitizenshipStatus.Verified) {
    const activityKey = `VerifiedCitizenship|${wallet.profile.externId}` // todo: this is not unique! what if you lose citizenship and then renew it? maybe include the year?
    await prisma.activity.upsert({
      where: {
        key: activityKey,
      },
      create: {
        externId: randomId('activity'),
        profileId: wallet.profile.id,
        key: activityKey,
        type: ActivityType.CitizenshipVerified,
        citizenshipTokenId: tokenId,
      },
      update: {},
    })
  }

  return true
}

export default withAuth(handler)
