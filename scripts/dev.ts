import { prisma } from '../lib/prisma'
import { createPrivyAccount, privy } from '../lib/privy'

async function main() {
  // const res = await createPrivyAccount(
  //   'grin+realaddress@cabin.city',
  //   '0x3DedB545E9B89f63FA71Ab75497735d802C9d26F'
  // )
  // console.log(res)

  const privyUser = await privy.getUserByWalletAddress(
    '0x3DedB545E9B89f63FA71Ab75497735d802C9d26F'
  )
  console.log(privyUser)
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
