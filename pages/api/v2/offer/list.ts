import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PAGE_SIZE } from '@/utils/api/backend'
import {
  OfferFragment,
  OfferListParams,
  OfferListResponse,
  OfferQueryInclude,
  OfferType,
  OfferWithRelations,
  OfferPriceInterval,
} from '@/utils/types/offer'
import { LocationType } from '@/utils/types/location'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferListResponse>
) {
  if (req.method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const params: OfferListParams = {
    // searchQuery: req.query.searchQuery
    //   ? (req.query.searchQuery as string)
    //   : undefined,
    offerType: req.query.offerType
      ? (req.query.offerType as OfferType)
      : undefined,
    locationId: req.query.locationId
      ? (req.query.locationId as string)
      : undefined,
    // sort: req.query.sort ? (req.query.sort as LocationSort) : undefined,
    page: req.query.page ? parseInt(req.query.page as string) : undefined,
    publiclyVisibleOnly:
      req.query.publiclyVisibleOnly && req.query.publiclyVisibleOnly === 'true'
        ? 'true'
        : 'false',
  }

  // TODO: data validation

  const publiclyVisibleOnly = params.publiclyVisibleOnly === 'true'

  const query: Prisma.OfferFindManyArgs = {
    where: {
      type: params.offerType,
      endDate: publiclyVisibleOnly ? { gte: new Date() } : undefined,
      location: {
        externId: params.locationId,
        publishedAt: publiclyVisibleOnly ? { not: null } : undefined,
      },
    },
    include: OfferQueryInclude,
    orderBy: {
      createdAt: 'desc',
    },
    skip: params.page ? PAGE_SIZE * (params.page - 1) : undefined,
    take: PAGE_SIZE,
  }

  // await Promise.all() might be even better here because its parallel, while transaction is sequential
  const [offers, totalCount] = await prisma.$transaction([
    prisma.offer.findMany(query),
    prisma.offer.count({ where: query.where }),
  ])

  res.status(200).send({
    offers: offers.map((offer) => offerToFragment(offer as OfferWithRelations)),
    count: offers.length,
    totalCount,
  })
}

export const offerToFragment = (offer: OfferWithRelations): OfferFragment => {
  return {
    externId: offer.externId,
    type: offer.type as OfferType,
    title: offer.title,
    description: offer.description,
    startDate: offer.startDate.toISOString(),
    endDate: offer.endDate.toISOString(),
    imageIpfsHash: offer.imageIpfsHash,
    price: offer.price.toNumber(),
    priceInterval: offer.priceInterval as OfferPriceInterval,
    applicationUrl: offer.applicationUrl,
    mediaItems: offer.mediaItems.map((mediaItem) => {
      return {
        ipfsHash: mediaItem.ipfsHash,
      }
    }),
    location: {
      externId: offer.location.externId,
      name: offer.location.name,
      type: offer.location.type as LocationType,
      bannerImageIpfsHash: offer.location.bannerImageIpfsHash,
      publishedAt: offer.location.publishedAt
        ? offer.location.publishedAt.toISOString()
        : null,
      address: offer.location.address
        ? {
            locality: offer.location.address.locality,
            admininstrativeAreaLevel1Short:
              offer.location.address.admininstrativeAreaLevel1Short,
            country: offer.location.address.country,
            countryShort: offer.location.address.countryShort,
          }
        : null,
      caretaker: {
        externId: offer.location.caretaker.externId,
      },
    },
  }
}

export default withAuth(handler)
