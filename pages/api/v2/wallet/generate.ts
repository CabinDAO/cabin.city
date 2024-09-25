import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import {
  OptsWithAuth,
  requireProfile,
  wrapHandler,
} from '@/utils/api/wrapHandler'
import { createPrivyAccount } from '@/lib/privy'
import {
  WalletGenerateParams,
  WalletGenerateResponse,
} from '@/utils/types/wallet'
import { toErrorString } from '@/utils/api/error'

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WalletGenerateResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(opts.auth)
  if (!profile.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  const parsed = WalletGenerateParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const targetProfile = await prisma.profile.findUnique({
    where: { externId: params.profileExternId },
    include: { wallet: true },
  })

  if (!targetProfile) {
    res.status(400).send({ error: 'Profile not found for that externId' })
    return
  }

  if (targetProfile.wallet) {
    res.status(400).send({
      error: `Wallet exists: ${targetProfile.wallet.address}`,
    })
    return
  }

  try {
    const privyAccount = await createPrivyAccount(targetProfile.email)
    if (!privyAccount.id) {
      res.status(400).send({ error: 'Failed to create Privy account' })
      return
    }

    const newWallet = privyAccount.linked_accounts.find(
      (w) => w.type === 'wallet' && w.wallet_client_type == 'privy'
    )
    if (!newWallet) {
      res.status(400).send({ error: 'Failed find wallet in privy response' })
      return
    }

    await prisma.wallet.create({
      data: {
        address: newWallet.address.toLowerCase(),
        cabinTokenBalance: 0,
        profile: { connect: { id: targetProfile.id } },
      },
    })

    res.status(200).send({ address: newWallet.address })
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).send({ error: e.message })
    } else {
      res.status(500).send({ error: `${e}` })
    }
    return
  }
}
