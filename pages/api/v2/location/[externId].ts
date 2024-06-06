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
  LocationGetParams,
  LocationGetResponse,
  LocationEditParams,
  LocationEditResponse,
  LocationDeleteResponse,
  LocationQueryInclude,
  LocationWithRelations,
} from '@/utils/types/location'
import { locationToFragment } from '@/pages/api/v2/location/list'
import { canEditLocation } from '@/lib/permissions'

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
  const { externId, ...queryParams } = req.query
  const parsed = LocationGetParams.safeParse(queryParams)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

  const query: Prisma.LocationFindUniqueArgs = {
    where: { externId: externId as string },
    include: LocationQueryInclude({
      countActiveEventsOnly: params.countActiveEventsOnly === 'true',
    }),
  }

  const location = await prisma.location.findUnique(query)
  if (!location) {
    res.status(404).send({ error: 'Location not found' })
    return
  }

  res.status(200).send({
    location: locationToFragment(location as LocationWithRelations),
  })
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
      steward: true,
      mediaItems: true,
    },
  })

  if (!locationToEdit) {
    res.status(404).send({ error: 'Location not found' })
    return
  }

  if (!canEditLocation(profile, locationToEdit)) {
    res.status(403).send({ error: 'You cannot edit this location' })
    return
  }

  const parsed = LocationEditParams.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).send({ error: toErrorString(parsed.error) })
    return
  }
  const params = parsed.data

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

  const [, updatedLocation] = await prisma.$transaction([
    prisma.locationMediaItem.deleteMany({
      where: { id: { in: mediaItemsToDelete } },
    }),
    prisma.location.update({
      where: {
        id: locationToEdit.id,
      },
      include: LocationQueryInclude(),
      data: {
        name: params.name,
        description: params.description,
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
    include: { steward: true },
  })

  if (!locationToDelete) {
    res.status(404).send({ error: 'Location not found' })
    return
  }

  if (!canEditLocation(profile, locationToDelete)) {
    res.status(403).send({ error: 'You cannot delete this location' })
    return
  }

  await prisma.location.delete({ where: { id: locationToDelete.id } })

  res.status(200).send({})
}
export default withAuth(handler)
