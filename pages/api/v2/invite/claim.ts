import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { randomId } from '@/utils/random'
import {
  InviteClaimParams,
  InviteClaimResponse,
  PaymentMethod,
} from '@/utils/types/partialInviteClaim'
import { PaymentStatus } from '@prisma/client'
import { YEARLY_PRICE_IN_USD } from '@/utils/citizenship'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InviteClaimResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  if (opts.auth.privyDID) {
    res.status(400).send({ error: 'Implement this case' }) // todo: make sure it works when they have an account already
    return
  }

  const body = req.body as InviteClaimParams

  const inviter = await prisma.profile.findUnique({
    where: { inviteCode: body.inviteCode },
  })

  if (!inviter) {
    res.status(400).send({ error: 'Invalid invite code' })
    return
  }

  const partialClaim = await prisma.partialInviteClaim.create({
    data: {
      externId: randomId('partialInviteClaim'),
      name: body.name,
      email: body.email,
      code: body.inviteCode,
      inviterId: inviter.id,
      hasWallet: body.hasWallet,
      paymentMethod: body.paymentMethod,
    },
  })

  const resData: InviteClaimResponse = { externId: partialClaim.externId }

  const checkoutThroughUnlock =
    body.hasWallet && body.paymentMethod === PaymentMethod.Crypto

  if (!checkoutThroughUnlock) {
    const cart = await prisma.cart.create({
      data: {
        externId: randomId('cart'),
        amount: YEARLY_PRICE_IN_USD,
        partialInviteClaimId: partialClaim.id,
        paymentStatus: PaymentStatus.Pending,
        notes: '',
      },
    })

    await prisma.partialInviteClaim.update({
      where: { id: partialClaim.id },
      data: { cartId: cart.id },
    })

    resData.cartId = cart.externId
  }

  res.status(200).send(resData)
}

export default withAuth(handler)
