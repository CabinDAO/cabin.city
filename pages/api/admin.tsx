import type { NextApiRequest, NextApiResponse } from 'next'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'
import { onchainAmountToDecimal, prisma } from '@/lib/prisma'
import { getAlchemySdk } from '@/lib/chains'
import { cabinTokenConfigForEnv } from '@/lib/protocol-config'
import { ContactFieldType } from '@/utils/types/profile'
import { sanitizeContactValue } from '@/components/profile/validations'
import { toErrorString } from '@/utils/api/error'
import { AdminParams } from '@/utils/types/admin'

export const config = { maxDuration: 300 } // let this run for up to 5 minutes

export default wrapHandler(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: OptsWithAuth
) {
  const user = await requireUser(opts.auth)
  if (!user.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const parsed = AdminParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  switch (params.action) {
    case 'fixTokenBalances':
      const { updated: walletsUpdated } = await fixTokenBalances()
      res.status(200).send({ walletsUpdated })
      return
    case 'sanitizeContacts':
      const { updated, skipped } = await sanitizeContacts()
      res.status(200).send({ updated, skipped })
      return
    default:
      res.status(400).send({ error: 'Invalid action' })
      return
  }
}

async function sanitizeContacts() {
  const contacts = await prisma.profileContactField.findMany({})
  let updated = 0
  let skipped = 0

  for (const contact of contacts) {
    const { sanitizedValue, error } = sanitizeContactValue(
      contact.type as ContactFieldType,
      contact.value
    )
    if (error) {
      // console.error(error, contact.value, sanitizedValue, contact.id)
      skipped++
    } else if (sanitizedValue !== contact.value) {
      await prisma.profileContactField.update({
        data: { value: sanitizedValue },
        where: { id: contact.id },
      })
      updated++
    }
  }

  return { updated, skipped }
}

async function fixTokenBalances() {
  const alchemy = getAlchemySdk(cabinTokenConfigForEnv.networkName)

  const take = 50
  let skip = 0
  let updated = 0

  while (true) {
    const wallets = await prisma.wallet.findMany({
      skip: skip,
      take: take,
    })

    for (const wallet of wallets) {
      if (!wallet.address) {
        // throw new Error(`Wallet ${wallet.id} has blank address`)
        continue
      }

      const balanceRes = await alchemy.core.getTokenBalances(wallet.address, [
        cabinTokenConfigForEnv.contractAddress,
      ])

      const balance = onchainAmountToDecimal(
        balanceRes.tokenBalances[0].tokenBalance ?? '0'
      )

      if (balance.cmp(wallet.cabinTokenBalance) !== 0) {
        // console.log(
        //   `Balance for ${wallet.address} is ${wallet.cabinTokenBalance} but should be ${balance}`
        // )
        updated++
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: { cabinTokenBalance: balance },
        })
      }
    }

    if (wallets.length < take) {
      break
    }

    skip += take
  }

  return { updated }
}
