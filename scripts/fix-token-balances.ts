import { onchainAmountToDecimal, prisma } from '@/lib/prisma'
import { cabinTokenConfig } from '@/lib/protocol-config'
import { getAlchemySdk } from '@/lib/chains'

async function main() {
  const alchemy = getAlchemySdk(cabinTokenConfig.networkName)

  const take = 50
  let skip = 0

  while (true) {
    const wallets = await prisma.wallet.findMany({
      skip: skip,
      take: take,
    })

    for (const wallet of wallets) {
      if (!wallet.address) {
        throw new Error(`Wallet ${wallet.id} has blank address`)
      }

      const balanceRes = await alchemy.core.getTokenBalances(wallet.address, [
        cabinTokenConfig.contractAddress,
      ])

      const balance = onchainAmountToDecimal(
        balanceRes.tokenBalances[0].tokenBalance ?? '0'
      )

      if (balance.cmp(wallet.cabinTokenBalance) !== 0) {
        console.log(
          `Balance for ${wallet.address} is ${wallet.cabinTokenBalance} but should be ${balance}`
        )
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

    console.log(`Processed ${skip} wallets`)
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
