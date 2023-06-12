import { CabinToken__factory } from '@/generated/contract'
import { CitizenshipStatus } from '@/generated/graphql'
import { getAlchemyProvider } from '@/lib/alchemy'
import { getProfileByAddress } from '@/lib/fauna-server/getProfileByAddress'
import { cabinTokenConfig, unlockConfig } from '@/lib/protocol-config'
import { MINIMUM_CABIN_BALANCE } from '@/utils/citizenship'
import { BigNumber, ethers } from 'ethers'
import { defaultAbiCoder } from 'ethers/lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

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
  const query = req.query
  const recipient = query.recipient as string

  // Here we can interrogate the off-chain Fauna database to see if the user has a confirmed voucher
  const hasVoucher = await _hasVoucher(recipient)
  const cabinBalance = await _getCabinTokenBalance(recipient)
  const intBalance = Number(cabinBalance.toString()) / 10 ** 18
  const meetCabinBalance = intBalance >= MINIMUM_CABIN_BALANCE
  const canMint = hasVoucher || meetCabinBalance

  console.info(
    `DataBuilder: recipient: ${recipient}, canMint: ${canMint}, cabinBalance: ${cabinBalance.toString()}`
  )

  const payload = defaultAbiCoder.encode(
    ['bool', 'uint256'],
    [canMint, cabinBalance]
  )

  const chainId = BigNumber.from(unlockConfig.chainId)

  const digest = defaultAbiCoder.encode(
    ['string', 'address', 'uint256'],
    ['CabinUnlockData', query.recipient, chainId]
  )

  // Without this signature, anyone could pass any data to the checkout flow and the user would be able to purchase a key without a voucher
  // or they could get a discount without having the correct cabin token balance
  const hashed = ethers.utils.solidityKeccak256(['bytes'], [digest])
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY)
  const bytes = ethers.utils.arrayify(hashed)
  const signature = await signer.signMessage(bytes)

  const data = defaultAbiCoder.encode(['bytes', 'bytes'], [payload, signature])

  res.status(200).json({ data })
}

async function _getCabinTokenBalance(address: string): Promise<BigNumber> {
  const provider = getAlchemyProvider(cabinTokenConfig.networkName)
  const cabinTokenContract = CabinToken__factory.connect(
    cabinTokenConfig.contractAddress,
    provider
  )
  return cabinTokenContract.balanceOf(address)
}

async function _hasVoucher(address: string): Promise<boolean> {
  const profile = await getProfileByAddress(address)

  if (!profile) {
    console.info(`DataBuilder: No profile found for address ${address}`)
    return false
  }

  return [CitizenshipStatus.Vouched, CitizenshipStatus.Verified].includes(
    profile.data.citizenshipStatus
  )
}
