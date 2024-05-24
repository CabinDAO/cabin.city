import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { OfferType, OfferPriceInterval, ActivityType } from '@prisma/client'
import { randomId } from '@/utils/random'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { EventNewParams, EventNewResponse } from '@/utils/types/event'
import { canEditLocation } from '@/lib/permissions'
import { toErrorString } from '@/utils/api/error'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventNewResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(req, res, opts)

  const parsed = EventNewParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const location = await prisma.location.findUnique({
    where: {
      externId: params.locationExternId,
    },
  })

  if (!location) {
    res.status(400).send({ error: 'Location not found' })
    return
  }

  if (!canEditLocation(profile, location)) {
    res.status(403).send({ error: 'You are not the steward of this location' })
    return
  }

  const event = await prisma.offer.create({
    data: {
      externId: randomId('event'),
      locationId: location.id,
      title: 'New Event',
      description: '',
      type: OfferType.Event,
      startDate: new Date(),
      endDate: new Date(),
      price: 0,
      priceInterval: OfferPriceInterval.Weekly,
      imageIpfsHash: '',
      applicationUrl: '',
    },
  })

  const activityKey = `OfferCreated|${event.externId}`
  await prisma.activity.upsert({
    where: {
      key: activityKey,
    },
    create: {
      externId: randomId('activity'),
      key: activityKey,
      type: ActivityType.OfferCreated,
      profileId: profile.id,
      offerId: event.id,
    },
    update: {},
  })

  res.status(200).send({ eventExternId: event.externId })
}

export default withAuth(handler)
