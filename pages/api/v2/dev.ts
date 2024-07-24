import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { sanitizeContactValue } from '@/components/profile/validations'
import { ContactFieldType } from '@/utils/types/profile'

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

  res
    .status(200)
    .send({ message: `${updated} records updated, ${skipped} records skipped` })
}
