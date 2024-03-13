import { prisma } from '../lib/prisma'
import { getAlchemyProvider } from '../lib/chains'
import { CabinToken__factory } from '../generated/ethers'
import { cabinTokenConfig } from '../lib/protocol-config'

async function main() {
  const provider = getAlchemyProvider(cabinTokenConfig.networkName)

  const cabinTokenContract = CabinToken__factory.connect(
    cabinTokenConfig.contractAddress,
    provider
  )

  // await cabinTokenContract.

  const transferFilter = cabinTokenContract.filters.Transfer()
  const transfers = await cabinTokenContract.queryFilter(
    transferFilter,
    0,
    await provider.getBlockNumber()
  )

  console.log(transfers)
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
