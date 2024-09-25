import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { $Enums } from '@prisma/client'
import { randomId } from '@/utils/random'
import { LocationNewResponse } from '@/utils/types/location'
import {
  OptsWithAuth,
  requireProfile,
  wrapHandler,
} from '@/utils/api/wrapHandler'
import { sendToDiscord } from '@/lib/discord'
import { appDomainWithProto } from '@/utils/display-utils'
import { isProd } from '@/utils/dev'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationNewResponse>,
  opts: OptsWithAuth
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(opts.auth)

  const location = await prisma.location.create({
    data: {
      stewardId: profile.id,
      externId: randomId('location'),
      type: $Enums.LocationType.Neighborhood,
      name: `${profile.name}'s New Neighborhood`,
      description: '',
      bannerImageCfId: '',
    },
  })

  if (isProd) {
    await sendToDiscord(
      `<@202214676761804801> <@733769026009956383> <@481990685881532419> New location listed by ${profile.name}: ${appDomainWithProto}/location/${location.externId}`
    )
  }

  res.status(200).send({ locationExternId: location.externId })
}

export default wrapHandler(handler)
