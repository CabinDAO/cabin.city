import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { $Enums } from '@prisma/client'
import { randomId } from '@/utils/random'
import { LocationNewResponse } from '@/utils/types/location'
import { OptsWithAuth, requireUser, wrapHandler } from '@/utils/api/wrapHandler'
import { sendToDiscord, TEAM_MENTION } from '@/lib/discord'
import { appDomainWithProto } from '@/utils/display-utils'
import { isProd } from '@/utils/dev'
import { expandRoute } from '@/utils/routing'

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

  const user = await requireUser(opts.auth)

  const location = await prisma.location.create({
    data: {
      stewardId: user.id,
      externId: randomId('location'),
      type: $Enums.LocationType.Neighborhood,
      name: `${user.name}'s New Neighborhood`,
      description: '',
      bannerImageCfId: '',
    },
  })

  if (isProd) {
    await sendToDiscord(
      `${TEAM_MENTION} New location listed by ${
        user.name
      }: ${appDomainWithProto}${expandRoute([
        'n_id',
        { id: location.externId },
      ])}`
    )
  }

  res.status(200).send({ locationExternId: location.externId })
}

export default wrapHandler(handler)
