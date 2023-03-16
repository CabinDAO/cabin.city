import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import { PublicLock__factory } from '@/generated/contract'
import { unlockConfig } from '@/lib/protocol-config'
import { getAlchemyProvider } from '@/lib/alchemy'
import { CitizenshipStatus } from '@/generated/graphql'
import { setCitizenshipStatus } from '@/lib/fauna-server/setCitizenshipStatus'

type ResponseJson = {
  updated?: boolean
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseJson>
) {
  const { method } = req

  switch (method) {
    case 'GET':
      const address = req.session.siwe?.address
      if (!address) {
        console.error('CheckStatus: No address in session', req.session.siwe)
        res.status(401).end('Unauthorized')
        return
      }

      const lockContract = PublicLock__factory.connect(
        unlockConfig.contractAddress,
        getAlchemyProvider(unlockConfig.networkName)
      )

      const hasValidKey = await lockContract.getHasValidKey(address)

      if (hasValidKey) {
        const profile = await setCitizenshipStatus(
          address,
          CitizenshipStatus.Verified
        )
        if (profile) {
          res.json({ updated: true })
          return
        }
      }

      res.send({ updated: false })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
