import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/utils/api/withAuth'
import { CartResponse, PaymentStatus } from '@/utils/types/cart'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const externId = req.query.externId as string

  const cart = await prisma.cart.findUnique({
    where: {
      externId: externId,
    },
    include: {
      invite: {
        include: {
          invitee: true,
        },
      },
    },
  })

  if (!cart) {
    res.status(404).send({ error: 'Cart not found' })
    return
  }

  const invite = cart.invite

  const existingAccount = !!(invite?.invitee && !invite?.privyDID)

  res.status(200).send({
    externId: cart.externId,
    amount: cart.amount.toNumber(),
    paymentStatus: cart.paymentStatus as PaymentStatus,
    accountSetupStatus: {
      existingAccount: existingAccount,
      hasWallet: existingAccount || !!invite?.walletAddress,
      providedEmailDomain: invite?.email?.split('@')[1],
      privyAccountExists: existingAccount || !!invite?.privyDID,
      localProfileExists: existingAccount || !!invite?.invitee,
      profileExternId: invite?.invitee?.externId ?? '',
      grantTxSent: !!invite?.citizenshipGrantTx,
      grantTxConfirmed: !!invite?.citizenshipTxConfirmed,
      error: invite?.error ?? '',
    },
  })
}

export default withAuth(handler)
