import type { NextApiRequest, NextApiResponse } from 'next'
import {
  AuthData,
  ProfileWithWallet,
  requireProfile,
  withAuth,
} from '@/utils/api/withAuth'
import { randomId } from '@/utils/random'
import { prisma } from '@/lib/prisma'
import { Invite, PaymentStatus, CitizenshipStatus } from '@prisma/client'
import {
  InviteClaimParams,
  InviteClaimResponse,
  PaymentMethod,
} from '@/utils/types/invite'
import { YEARLY_PRICE_IN_USD } from '@/utils/citizenship'
import { resolveAddressOrName } from '@/lib/ens'
import { createPrivyAccount, privy } from '@/lib/privy'
import { createProfile } from '@/utils/profile'

export default withAuth(handler)

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

  let profile: ProfileWithWallet | null = null
  if (opts.auth.authToken) {
    profile = await requireProfile(req, res, opts)
  }

  const body = req.body as InviteClaimParams

  const invite = await createInvite(res, body, profile)
  if (!invite) {
    return
  }

  const resData: InviteClaimResponse = { externId: invite.externId }

  const hasCryptoWallet = !!(profile || invite.walletAddress)
  const checkoutThroughUnlock =
    hasCryptoWallet && body.paymentMethod === PaymentMethod.Crypto

  if (checkoutThroughUnlock) {
    const name = invite.name
    const email = invite.email
    const walletAddress = invite.walletAddress

    if (!email || !name || !walletAddress) {
      res.status(400).send({
        error: 'Must provide name, email, and wallet if not logged in',
      })
      return null
    }

    const privyAccount = await createPrivyAccount(email, walletAddress)

    // just to track account creation status
    await prisma.invite.update({
      where: { id: invite.id },
      data: { privyDID: privyAccount.id },
    })

    const profile = await createProfile({
      privyDID: privyAccount.id,
      invite: invite,
      name: name,
      email: email,
      walletAddress: walletAddress,
    })

    resData.profileId = profile.externId
  } else {
    const cart = await prisma.cart.create({
      data: {
        externId: randomId('cart'),
        amount: YEARLY_PRICE_IN_USD,
        inviteId: invite.id,
        paymentStatus: PaymentStatus.Pending,
        notes: '',
      },
    })

    await prisma.invite.update({
      where: { id: invite.id },
      data: { cartId: cart.id },
    })

    resData.cartId = cart.externId
  }

  res.status(200).send(resData)
}

async function createInvite(
  res: NextApiResponse<InviteClaimResponse>,
  body: InviteClaimParams,
  profile: ProfileWithWallet | null
): Promise<Invite | null> {
  const inviter = await prisma.profile.findUnique({
    where: { inviteCode: body.inviteCode },
  })

  if (!inviter) {
    res.status(400).send({ error: 'Invalid invite code' })
    return null
  }

  if (profile) {
    const invite = await prisma.invite.create({
      data: {
        externId: randomId('invite'),
        code: body.inviteCode,
        inviterId: inviter.id,
        paymentMethod: body.paymentMethod,
        invitee: {
          connect: { id: profile.id },
        },
      },
    })
    if (
      profile.citizenshipStatus === null ||
      profile.citizenshipStatus === CitizenshipStatus.VouchRequested
    ) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          citizenshipStatus: CitizenshipStatus.Vouched,
          voucher: { connect: { id: inviter.id } },
        },
      })
    }
    return invite
  }

  if (!body.newAccountParams) {
    res
      .status(400)
      .send({ error: 'Must provide newAccountParams if not logged in' })
    return null
  }

  if (await privy.getUserByEmail(body.newAccountParams.email)) {
    res.status(400).send({ error: 'User with this email already exists' })
    return null
  }

  let walletAddress: string | undefined
  if (body.newAccountParams.walletAddressOrENS) {
    walletAddress = await resolveAddressOrName(
      body.newAccountParams.walletAddressOrENS
    )
    if (!walletAddress) {
      res
        .status(400)
        .send({ error: 'Invalid wallet walletAddress or ENS name' })
      return null
    }

    if (await privy.getUserByWalletAddress(walletAddress)) {
      res
        .status(400)
        .send({ error: 'User with this wallet address already exists' })
      return null
    }
  }

  return prisma.invite.create({
    data: {
      externId: randomId('invite'),
      name: body.newAccountParams.name,
      email: body.newAccountParams.email,
      code: body.inviteCode,
      inviterId: inviter.id,
      walletAddress: walletAddress || '',
      paymentMethod: body.paymentMethod,
    },
  })
}
