import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ message: 'Method not allowed' })
    return
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        externalUserId: req.query.did as string,
      },
    })

    res.status(profile ? 200 : 404).send({ externId: profile?.externId })
  } catch (e) {
    console.log(e)
    if (e instanceof PrismaClientValidationError) {
      res.status(200).send({
        profile: null,
        error: `PrismaClientValidationError: ${e.message}`,
      })
    } else {
      res.status(200).send({
        profile: null,
        error: e as string,
      })
    }
  }
}

export default handler
