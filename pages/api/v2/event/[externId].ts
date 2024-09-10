import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { toErrorString } from '@/utils/api/error'
import {
  AuthData,
  ProfileWithWallet,
  requireProfile,
  withAuth,
} from '@/utils/api/withAuth'
import {
  EventDeleteResponse,
  EventEditParams,
  EventEditResponse,
  EventGetResponse,
  EventQueryInclude,
  EventWithRelations,
} from '@/utils/types/event'
import { eventToFragment } from '@/pages/api/v2/event/list'
import { canEditLocation } from '@/lib/permissions'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  switch (req.method) {
    case 'POST':
      await handlePost(req, res, await requireProfile(req, res, opts))
      return
    case 'DELETE':
      await handleDelete(req, res, await requireProfile(req, res, opts))
      return
    case 'GET':
      await handleGet(req, res)
      return
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).send({ error: 'Method not allowed' })
      return
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<EventGetResponse>
) {
  const query: Prisma.OfferFindUniqueArgs = {
    where: { externId: req.query.externId as string },
    include: EventQueryInclude,
  }

  const event = await prisma.offer.findUnique(query)

  if (!event) {
    res.status(404).send({ error: 'Offer not found' })
    return
  }

  res.status(200).send({
    event: eventToFragment(event as EventWithRelations),
  })
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<EventEditResponse>,
  profile: ProfileWithWallet
) {
  const parsed = EventEditParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const externId = req.query.externId as string

  const eventToEdit = await prisma.offer.findUnique({
    where: {
      externId: externId,
    },
    include: EventQueryInclude,
  })

  if (!eventToEdit) {
    res.status(404).send({ error: 'Offer not found' })
    return
  }

  if (!canEditLocation(profile, eventToEdit.location)) {
    res.status(403).send({ error: 'You cannot edit this location' })
    return
  }

  const mediaItemsToDelete: number[] = []
  if (params.mediaItems) {
    for (const mediaItem of eventToEdit.mediaItems) {
      if (
        !params.mediaItems.find(
          (newMediaItem) => newMediaItem.ipfsHash === mediaItem.ipfsHash
        )
      ) {
        mediaItemsToDelete.push(mediaItem.id)
      }
    }
  }

  const [, updatedEvent] = await prisma.$transaction([
    prisma.offerMediaItem.deleteMany({
      where: { id: { in: mediaItemsToDelete } },
    }),
    prisma.offer.update({
      where: {
        id: eventToEdit.id,
      },
      include: EventQueryInclude,
      data: {
        title: params.title,
        description: params.description,
        startDate: params.startDate,
        endDate: params.endDate,
        price: params.price,
        applicationUrl: params.applicationUrl,
        mediaItems: params.mediaItems
          ? {
              connectOrCreate: params.mediaItems.map((mediaItem) => ({
                where: {
                  offerId_ipfsHash: {
                    offerId: eventToEdit.id,
                    ipfsHash: mediaItem.ipfsHash,
                  },
                },
                create: {
                  ipfsHash: mediaItem.ipfsHash,
                },
              })),
            }
          : undefined,
      },
    }),
  ])

  res.status(200).send({
    event: eventToFragment(updatedEvent as EventWithRelations),
  })
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse<EventDeleteResponse>,
  profile: ProfileWithWallet
) {
  const externId = req.query.externId as string

  const offerToDelete = await prisma.offer.findUnique({
    where: { externId },
    include: {
      location: {
        include: {
          steward: true,
        },
      },
    },
  })

  if (!offerToDelete) {
    res.status(404).send({ error: 'Offer not found' })
    return
  }

  if (!canEditLocation(profile, offerToDelete.location)) {
    res.status(403).send({ error: 'You cannot delete this offer' })
    return
  }

  await prisma.offer.delete({ where: { id: offerToDelete.id } })

  res.status(200).send({})
}
export default withAuth(handler)
