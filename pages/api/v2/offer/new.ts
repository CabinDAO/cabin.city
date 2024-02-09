import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
import { OfferType, OfferPriceInterval, ActivityType } from '@prisma/client'
import { randomId } from '@/utils/random'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import { OfferNewParams, OfferNewResponse } from '@/utils/types/offer'

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

  if (location.caretakerId != profile.id && !profile.isAdmin) {
    res
      .status(403)
      .send({ error: 'You are not the caretaker of this location' })
    return
  }

  const offer = await prisma.offer.create({
    data: {
      externId: randomId('experience'),
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

  if (location.publishedAt) {
    await prisma.activity.create({
      data: {
        externId: randomId('activity'),
        key: `OfferCreated|${offer.externId}`,
        type: ActivityType.OfferCreated,
        profileId: profile.id,
        offerId: offer.id,
      },
    })
  }

  res.status(200).send({ offerExternId: offer.externId })
}

export default withAuth(handler)
