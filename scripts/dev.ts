import { prisma } from '../lib/prisma'
import { getEthersAlchemyProvider } from '../lib/chains'
import { CabinToken__factory } from '../generated/ethers'
import { cabinTokenConfig } from '../lib/protocol-config'
import { sanitizeContactValue } from '@/components/profile/validations'
import { ContactFieldType } from '@/utils/types/profile'

async function main() {
  const contacts = await prisma.profileContactField.findMany({})

  for (const contact of contacts) {
    const { sanitizedValue, error } = sanitizeContactValue(
      contact.type as ContactFieldType,
      contact.value
    )
    if (error) {
      console.error(error, contact.value, sanitizedValue, contact.id)
    } else if (sanitizedValue !== contact.value) {
      // await prisma.profileContactField.update({
      //   data: { value: sanitizedValue },
      //   where: { id: contact.id },
      // })
    }
  }

  return

  const provider = getEthersAlchemyProvider(cabinTokenConfig.networkName)

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
