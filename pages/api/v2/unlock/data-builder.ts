import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import { getEthersAlchemyProvider } from '@/lib/chains'
import { prisma } from '@/lib/prisma'
import { CabinToken__factory } from '@/generated/ethers'
import { CitizenshipStatus } from '@/utils/types/profile'
import { cabinTokenConfig, unlockConfigForEnv } from '@/lib/protocol-config'
import { MINIMUM_CABIN_BALANCE } from '@/utils/citizenship'

type ResponseJson = {
  data: string
}

/*
 * This is the data builder endpoint that is called by the Unlock checkout flow
 * See this Unlock PR for more details: https://github.com/unlock-protocol/unlock/pull/9730
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseJson>
) {
  const recipient = req.query.recipient as string

  // Here we can interrogate the local database to see if the user has a confirmed voucher
  const hasVoucher = await _hasVoucher(recipient)
  const cabinBalance = await _getCabinTokenBalance(recipient)
  const intBalance = Number(cabinBalance.toString()) / 10 ** 18
  const meetCabinBalance = intBalance >= MINIMUM_CABIN_BALANCE
  const canMint = hasVoucher || meetCabinBalance

  console.info(
    `DataBuilder: recipient: ${recipient}, canMint: ${canMint}, cabinBalance: ${cabinBalance.toString()}`
  )

  const coder = ethers.AbiCoder.defaultAbiCoder()

  const payload = coder.encode(['bool', 'uint256'], [canMint, cabinBalance])

  const chainId = BigInt(unlockConfigForEnv.chainId)

  const digest = coder.encode(
    ['string', 'address', 'uint256'],
    ['CabinUnlockData', recipient, chainId]
  )

  // Without this signature, anyone could pass any data to the checkout flow and the user would be able to purchase a key without a voucher
  // or they could get a discount without having the correct cabin token balance
  const hashed = ethers.solidityPackedKeccak256(['bytes'], [digest])
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY)
  const bytes = ethers.getBytes(hashed)
  const signature = await signer.signMessage(bytes)

  const data = coder.encode(['bytes', 'bytes'], [payload, signature])

  res.status(200).json({ data })
}

async function _getCabinTokenBalance(address: string): Promise<bigint> {
  const cabinTokenContract = CabinToken__factory.connect(
    cabinTokenConfig.contractAddress,
    getEthersAlchemyProvider(cabinTokenConfig.networkName)
  )
  return cabinTokenContract.balanceOf(address)
}

async function _hasVoucher(address: string): Promise<boolean> {
  const wallet = await prisma.wallet.findUnique({
    where: {
      address: address,
    },
    include: {
      profile: true,
    },
  })

  if (!wallet?.profile) {
    console.info(`DataBuilder: No profile found for address ${address}`)
    return false
  }

  return (
    wallet.profile.citizenshipStatus == CitizenshipStatus.Vouched ||
    wallet.profile.citizenshipStatus == CitizenshipStatus.Verified
  )
}
