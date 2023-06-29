import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import { PublicLock__factory } from '@/generated/contract'
import { unlockConfig } from '@/lib/protocol-config'
import { getAlchemyProvider } from '@/lib/alchemy'
import { CitizenshipStatus } from '@/generated/graphql'
import { setCitizenshipStatus } from '@/lib/fauna-server/setCitizenshipStatus'
import withAuth from '@/utils/api/withAuth'

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
      const address = req.query.address as string

      if (!address) {
        res.status(401).end('Unauthorized')
        return
      }

      const lockContract = PublicLock__factory.connect(
        unlockConfig.contractAddress,
        getAlchemyProvider(unlockConfig.networkName)
      )

      const hasValidKey = await lockContract.getHasValidKey(address)

      if (hasValidKey) {
        const tokenId = await lockContract.tokenOfOwnerByIndex(address, 0)

        const profile = await setCitizenshipStatus(
          address,
          CitizenshipStatus.Verified,
          tokenId.toString()
        )
        if (profile) {
          res.json({ updated: true })
          return
        }
      } else {
        // If the user has a Verified key, but no longer has a valid key, set the status to Vouched.
        const profile = await setCitizenshipStatus(
          address,
          CitizenshipStatus.Vouched
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

export default withIronSessionApiRoute(withAuth(handler), ironOptions)
