import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { $Enums, ActivityType } from '@prisma/client'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { sanitizeContactValue } from '@/components/profile/validations'
import { ContactFieldType } from '@/utils/types/profile'
import { randomId } from '@/utils/random'

export default withAuth(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  const profile = await requireProfile(req, res, opts)
  if (!profile.isAdmin) {
    res.status(403).send({ error: 'Forbidden' })
    return
  }

  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  await prisma.activity.updateMany({
    where: { type: $Enums.ActivityType.BadgeAdded },
    data: { type: $Enums.ActivityType.StampAdded },
  })

  // insert new badges for joining in 2024 and sotn, along with related activity
  const newProfiles = await prisma.profile.findMany({
    where: {
      createdAt: {
        gte: new Date('2024-01-01T00:00:00Z'),
      },
    },
    include: { stamps: true },
  })

  for (const profile of newProfiles) {
    if (profile.stamps.some((s) => s.id === 9)) continue
    const t = new Date(profile.createdAt.getTime() + 1000)
    await prisma.profileStamp.create({
      data: {
        profileId: profile.id,
        stampId: 46,
        activities: {
          create: {
            createdAt: t,
            updatedAt: t,
            externId: randomId('activity'),
            key: `StampAdded|${profile.externId}|46`,
            type: $Enums.ActivityType.StampAdded,
            profile: { connect: { id: profile.id } },
          },
        },
      },
    })
  }

  const sotnProfiles = await prisma.profile.findMany({
    where: { gotSotn2024Badge: { not: null } },
  })

  for (const profile of sotnProfiles) {
    if (!profile.gotSotn2024Badge) continue
    await prisma.profileStamp.create({
      data: {
        profileId: profile.id,
        stampId: 47,
        activities: {
          create: {
            createdAt: profile.gotSotn2024Badge,
            updatedAt: profile.gotSotn2024Badge,
            externId: randomId('activity'),
            key: `StampAdded|${profile.externId}|47`,
            type: $Enums.ActivityType.StampAdded,
            profile: { connect: { id: profile.id } },
          },
        },
      },
    })
  }

  res.status(200).send({ message: `done` })

  // const contacts = await prisma.profileContactField.findMany({})
  // let updated = 0
  // let skipped = 0
  //
  // for (const contact of contacts) {
  //   const { sanitizedValue, error } = sanitizeContactValue(
  //     contact.type as ContactFieldType,
  //     contact.value
  //   )
  //   if (error) {
  //     // console.error(error, contact.value, sanitizedValue, contact.id)
  //     skipped++
  //   } else if (sanitizedValue !== contact.value) {
  //     await prisma.profileContactField.update({
  //       data: { value: sanitizedValue },
  //       where: { id: contact.id },
  //     })
  //     updated++
  //   }
  // }
  // res
  //   .status(200)
  //   .send({ message: `${updated} records updated, ${skipped} records skipped` })
}
