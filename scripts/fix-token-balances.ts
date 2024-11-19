import { onchainAmountToDecimal, prisma } from '@/lib/prisma'
import { cabinTokenConfigs } from '@/lib/protocol-config'
import { getAlchemySdk } from '@/lib/chains'
import { Decimal } from '@prisma/client/runtime/library'

const dryRun = true // true = print sql queries for required changes but dont actually update the database

async function main() {
  const addressesDone = new Set<string>()

  const balanceUpdates: { [key: string]: Decimal } = {}

  const conf = cabinTokenConfigs.prod
  const alchemy = getAlchemySdk(conf.networkName)
  const moralisApiKey = process.env.MORALIS_API_KEY
  const chain = conf.networkName === 'mainnet' ? 'eth' : 'sepolia'
  const contractAddress = conf.contractAddress

  if (!moralisApiKey) {
    throw new Error('MORALIS_API_KEY is not set')
  }

  const countWalletsWithBalance = await prisma.wallet.count({
    where: { cabinTokenBalance: { gt: 0 } },
  })

  console.log(`Found ${countWalletsWithBalance} wallets with token balances`)

  const take = 100
  let skip = 0

  while (true) {
    const walletsWithTokens = await prisma.wallet.findMany({
      where: { cabinTokenBalance: { gt: 0 } },
      skip: skip,
      take: take,
    })

    if (walletsWithTokens.length === 0) {
      break
    }

    for (const wallet of walletsWithTokens) {
      if (!wallet.address) {
        throw new Error(`Wallet ${wallet.id} has blank address`)
      }

      const balanceRes = await alchemy.core.getTokenBalances(wallet.address, [
        contractAddress,
      ])

      const balance = onchainAmountToDecimal(
        balanceRes.tokenBalances[0].tokenBalance ?? '0'
      )

      if (balance.cmp(wallet.cabinTokenBalance) !== 0) {
        console.log(
          `Balance for ${wallet.address} is ${wallet.cabinTokenBalance} but should be ${balance}`
        )
        balanceUpdates[wallet.address] = balance
        if (!dryRun) {
          await prisma.wallet.update({
            where: { id: wallet.id },
            data: { cabinTokenBalance: balance },
          })
        }
      }

      addressesDone.add(wallet.address)
    }

    skip += take

    console.log(`Processed ${skip} wallets`)
  }

  console.log(
    `Done with ${addressesDone.size} addresses. Now doing tokenholders`
  )

  let cursor: string | null = null

  while (true) {
    const cursorParam = cursor ? `&cursor=${cursor}` : ''
    const url = `https://deep-index.moralis.io/api/v2.2/erc20/${contractAddress}/owners?chain=${chain}&order=DESC${cursorParam}`

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        'X-API-Key': moralisApiKey,
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Moralis API error: ${data.message}`)
    }

    cursor = data.cursor

    const holders = data.result
    console.log(`Processing ${holders.length} holders`)

    for (const holder of holders) {
      const address = holder.owner_address

      if (addressesDone.has(address)) {
        continue
      }

      const balance = new Decimal(holder.balance_formatted)
      const wallet = await prisma.wallet.findUnique({
        where: { address: address },
      })

      if (wallet && balance.cmp(wallet.cabinTokenBalance) !== 0) {
        console.log(
          `Balance for ${address} is ${wallet.cabinTokenBalance} but should be ${balance}`
        )
        balanceUpdates[wallet.address] = balance
        if (!dryRun) {
          await prisma.wallet.update({
            where: { id: wallet.id },
            data: { cabinTokenBalance: balance },
          })
        }
      } else if (!wallet) {
        console.log(`No wallet found for ${address}`)
        balanceUpdates[address] = balance
        if (!dryRun) {
          await prisma.wallet.create({
            data: {
              address: address.toLowerCase(),
              cabinTokenBalance: balance,
            },
          })
        }
      }

      addressesDone.add(address)
    }

    if (!cursor) {
      break
    }

    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  console.log(`Processed ${addressesDone.size} addresses total`)

  for (const [address, balance] of Object.entries(balanceUpdates)) {
    console.log(
      `INSERT INTO "Wallet" ("address", "cabinTokenBalance", "updatedAt") ` +
        `VALUES ('${address.toLowerCase()}', '${balance}', NOW()) ` +
        `ON CONFLICT ("address") DO UPDATE SET "cabinTokenBalance" = '${balance}', "updatedAt" = NOW();`
    )
  }
}

main()
  .then(async () => {
    console.log('done')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
