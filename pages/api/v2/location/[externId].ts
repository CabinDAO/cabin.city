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
  LocationDeleteResponse,
  LocationEditParams,
  LocationEditResponse,
  LocationGetResponse,
  LocationQueryInclude,
  LocationWithRelations,
} from '@/utils/types/location'
import { locationToFragment } from '@/pages/api/v2/location/list'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res)
      return
    case 'POST':
      await handlePost(req, res, await requireProfile(req, res, opts))
      return
    case 'DELETE':
      await handleDelete(req, res, await requireProfile(req, res, opts))
      return
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).send({ error: 'Method not allowed' })
      return
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<LocationGetResponse>
) {
  const query: Prisma.LocationFindUniqueArgs = {
    where: { externId: req.query.externId as string },
    include: LocationQueryInclude,
  }

  const location = await prisma.location.findUnique(query)

  if (!location) {
    res.status(404).send({ error: 'Location not found' })
    return
  }

  res.status(200).send({
    location: locationToFragment(location as LocationWithRelations),
  } as LocationGetResponse)
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<LocationEditResponse>,
  profile: ProfileWithWallet
) {
  const externId = req.query.externId as string

  const locationToEdit = await prisma.location.findUnique({
    where: {
      externId: externId,
    },
    include: {
      caretaker: true,
      mediaItems: true,
    },
  })

  if (!locationToEdit) {
    res.status(404).send({ error: 'Location not found' })
    return
  }

  if (locationToEdit.caretaker.id !== profile.id && !profile.isAdmin) {
    res.status(403).send({ error: 'Only caretakers can edit their locations' })
    return
  }

  const params: LocationEditParams = req.body

  const mediaItemsToDelete: number[] = []
  if (params.mediaItems) {
    for (const mediaItem of locationToEdit.mediaItems) {
      if (
        !params.mediaItems.find(
          (newMediaItem) =>
            newMediaItem.category === mediaItem.category &&
            newMediaItem.ipfsHash === mediaItem.ipfsHash
        )
      ) {
        mediaItemsToDelete.push(mediaItem.id)
      }
    }
  }

  const [_, updatedLocation] = await prisma.$transaction([
    prisma.locationMediaItem.deleteMany({
      where: { id: { in: mediaItemsToDelete } },
    }),
    prisma.location.update({
      where: {
        id: locationToEdit.id,
      },
      include: LocationQueryInclude,
      data: {
        name: params.name,
        tagline: params.tagline,
        description: params.description,
        sleepCapacity: params.sleepCapacity,
        internetSpeedMbps: params.internetSpeedMbps,
        caretakerEmail: params.caretakerEmail,
        bannerImageIpfsHash: params.bannerImageIpfsHash,
        mediaItems: params.mediaItems
          ? {
              connectOrCreate: params.mediaItems.map((mediaItem) => ({
                where: {
                  locationId_category_ipfsHash: {
                    locationId: locationToEdit.id,
                    category: mediaItem.category,
                    ipfsHash: mediaItem.ipfsHash,
                  },
                },
                create: {
                  category: mediaItem.category,
                  ipfsHash: mediaItem.ipfsHash,
                },
              })),
            }
          : undefined,
        address: params.address
          ? {
              upsert: {
                create: {
                  ...params.address,
                },
                update: {
                  ...params.address,
                },
              },
            }
          : undefined,
      },
    }),
  ])

  res.status(200).send({
    location: locationToFragment(updatedLocation as LocationWithRelations),
  })
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse<LocationDeleteResponse>,
  profile: ProfileWithWallet
) {
  const externId = req.query.externId as string

  const locationToDelete = await prisma.location.findUnique({
    where: { externId },
    include: { caretaker: true },
  })

  if (!locationToDelete) {
    res.status(404).send({ error: 'Location not found' })
    return
  }

  if (locationToDelete.caretaker.id !== profile.id && !profile.isAdmin) {
    res
      .status(403)
      .send({ error: 'Only caretakers can delete their locations' })
    return
  }

  await prisma.location.delete({ where: { id: locationToDelete.id } })

  res.status(200).send({})
}
export default withAuth(handler)
