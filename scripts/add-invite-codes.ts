import { prisma } from '../utils/prisma'
import { randomInviteCode } from '../utils/random'

async function addInviteCodes() {
  const profilesWithoutInviteCode = await prisma.profile.findMany({
    where: {
      inviteCode: null,
    },
  })

  for (const profile of profilesWithoutInviteCode) {
    await prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        inviteCode: randomInviteCode(),
      },
    })
  }
}

addInviteCodes()
  .then(async () => {
    console.log('done')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
