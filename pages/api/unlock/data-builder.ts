import { defaultAbiCoder } from 'ethers/lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseJson = {
  data: string
}

/*
 * This is the data builder endpoint that is called by the Unlock checkout flow
 * See this Unlock PR for more details: https://github.com/unlock-protocol/unlock/pull/9730
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseJson>
) {
  const query = req.query
  console.log(query.recipient)

  // Here we can interrogate the off-chain Fauna database to see if the user has a confirmed voucher
  const hasVoucher = false

  // This encoded data format must match the expected format in CabinUnlockHools.sol:onKeyPurchase
  const data = defaultAbiCoder.encode(['bool'], [hasVoucher])
  console.log({ data })
  res.status(200).json({ data })
}
