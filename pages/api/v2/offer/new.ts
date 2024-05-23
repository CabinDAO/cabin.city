import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { OfferType, OfferPriceInterval, ActivityType } from '@prisma/client'
import { randomId } from '@/utils/random'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { OfferNewParams, OfferNewResponse } from '@/utils/types/offer'
import { canEditLocation } from '@/lib/permissions'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferNewResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profile = await requireProfile(req, res, opts)

  const body = req.body as OfferNewParams

  const location = await prisma.location.findUnique({
    where: {
      externId: body.locationExternId,
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

  const offer = await prisma.offer.create({
    data: {
      externId: randomId('event'),
      locationId: location.id,
      title: 'New Offer',
      description: '',
      type: OfferType.PaidColiving,
      startDate: new Date(),
      endDate: new Date(),
      price: 0,
      priceInterval: OfferPriceInterval.Weekly,
      imageIpfsHash: '',
      applicationUrl: '',
    },
  })

  const activityKey = `OfferCreated|${offer.externId}`
  await prisma.activity.upsert({
    where: {
      key: activityKey,
    },
    create: {
      externId: randomId('activity'),
      key: activityKey,
      type: ActivityType.OfferCreated,
      profileId: profile.id,
      offerId: offer.id,
    },
    update: {},
  })

  res.status(200).send({ offerExternId: offer.externId })
}

export default withAuth(handler)
