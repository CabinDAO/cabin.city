import { prisma } from '../lib/prisma'

async function main() {
  console.log('running main()')
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
