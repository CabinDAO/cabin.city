import type { NextApiRequest, NextApiResponse } from 'next'
import { wrapHandler } from '@/utils/api/wrapHandler'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getPageParams } from '@/utils/api/backend'
import {
  EventFragment,
  EventListParams,
  EventListResponse,
  EventQueryInclude,
  EventType,
  EventWithRelations,
  OfferPriceInterval,
} from '@/utils/types/event'
import { LocationType } from '@/utils/types/location'
import { toErrorString } from '@/utils/api/error'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventListResponse>
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const parsed = EventListParams.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data
  const { skip, take } = getPageParams(params)

  const query: Prisma.OfferFindManyArgs = {
    where: {
      type: params.eventType,
      endDate: params.futureOnly === 'true' ? { gte: new Date() } : undefined,
      location: {
        externId: params.locationId,
      },
    },
    include: EventQueryInclude,
    orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
    skip: skip,
    take: take,
  }

  const events = await prisma.offer.findMany(query)

  res.status(200).send({
    events: events.map((event) => eventToFragment(event as EventWithRelations)),
    count: events.length,
  })
}

export const eventToFragment = (event: EventWithRelations): EventFragment => {
  return {
    externId: event.externId,
    type: event.type as EventType,
    title: event.title,
    description: event.description,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate.toISOString(),
    price: event.price.toNumber(),
    priceInterval: event.priceInterval as OfferPriceInterval,
    applicationUrl: event.applicationUrl,
    location: {
      externId: event.location.externId,
      name: event.location.name,
      type: event.location.type as LocationType,
      bannerImageCfId: event.location.bannerImageCfId,
      address: event.location.address
        ? {
            locality: event.location.address.locality,
            admininstrativeAreaLevel1Short:
              event.location.address.admininstrativeAreaLevel1Short,
            country: event.location.address.country,
            countryShort: event.location.address.countryShort,
            lat: event.location.address.lat,
            lng: event.location.address.lng,
          }
        : null,
      stewards: event.location.stewards.map((s) => ({
        externId: s.profile.externId,
      })),
    },
  }
}

export default wrapHandler(handler)
