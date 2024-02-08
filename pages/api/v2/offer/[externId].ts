import type { NextApiRequest, NextApiResponse } from 'next'
import {
  AuthData,
  ProfileWithWallet,
  requireProfile,
  withAuth,
} from '@/utils/api/withAuth'
import { prisma } from '@/utils/prisma'
import { Prisma } from '@prisma/client'
import {
  OfferDeleteResponse,
  OfferEditParams,
  OfferEditResponse,
  OfferGetResponse,
  OfferQueryInclude,
  OfferWithRelations,
} from '@/utils/types/offer'
import { offerToFragment } from '@/pages/api/v2/offer/list'

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
  res: NextApiResponse<OfferGetResponse>
) {
  const query: Prisma.OfferFindUniqueArgs = {
    where: { externId: req.query.externId as string },
    include: OfferQueryInclude,
  }

  const offer = await prisma.offer.findUnique(query)

  if (!offer) {
    res.status(404).send({ error: 'Offer not found' })
    return
  }

  res.status(200).send({
    offer: offerToFragment(offer as OfferWithRelations),
  } as OfferGetResponse)
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<OfferEditResponse>,
  profile: ProfileWithWallet
) {
  const externId = req.query.externId as string

  const offerToEdit = await prisma.offer.findUnique({
    where: {
      externId: externId,
    },
    include: OfferQueryInclude,
  })

  if (!offerToEdit) {
    res.status(404).send({ error: 'Offer not found' })
    return
  }

  if (offerToEdit.location.caretakerId !== profile.id && !profile.isAdmin) {
    res.status(403).send({ error: 'Only caretakers can edit their offers' })
    return
  }

  const params: OfferEditParams = req.body

  const mediaItemsToDelete: number[] = []
  if (params.mediaItems) {
    for (const mediaItem of offerToEdit.mediaItems) {
      if (
        !params.mediaItems.find(
          (newMediaItem) => newMediaItem.ipfsHash === mediaItem.ipfsHash
        )
      ) {
        mediaItemsToDelete.push(mediaItem.id)
      }
    }
  }

  const [_, updatedOffer] = await prisma.$transaction([
    prisma.offerMediaItem.deleteMany({
      where: { id: { in: mediaItemsToDelete } },
    }),
    prisma.offer.update({
      where: {
        id: offerToEdit.id,
      },
      include: OfferQueryInclude,
      data: {
        title: params.title,
        description: params.description,
        startDate: params.startDate,
        endDate: params.endDate,
        price: params.price,
        applicationUrl: params.applicationUrl,
        imageIpfsHash: params.imageIpfsHash,
        mediaItems: params.mediaItems
          ? {
              connectOrCreate: params.mediaItems.map((mediaItem) => ({
                where: {
                  offerId_ipfsHash: {
                    offerId: offerToEdit.id,
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
    offer: offerToFragment(updatedOffer as OfferWithRelations),
  })
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse<OfferDeleteResponse>,
  profile: ProfileWithWallet
) {
  const externId = req.query.externId as string

  const offerToDelete = await prisma.offer.findUnique({
    where: { externId },
    include: {
      location: {
        include: {
          caretaker: true,
        },
      },
    },
  })

  if (!offerToDelete) {
    res.status(404).send({ error: 'Offer not found' })
    return
  }

  if (offerToDelete.location.caretaker.id !== profile.id && !profile.isAdmin) {
    res.status(403).send({ error: 'Only caretakers can delete their offers' })
    return
  }

  await prisma.location.delete({ where: { id: offerToDelete.id } })

  res.status(200).send({})
}
export default withAuth(handler)
