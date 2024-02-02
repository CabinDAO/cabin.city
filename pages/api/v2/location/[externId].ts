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
  LocationEditParams,
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
      const profile = await requireProfile(req, res, opts)
      await handlePost(req, res, profile)
      return
    case 'DELETE':
      res.status(400).send({ error: 'Not implemented yet' })
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
  res: NextApiResponse<LocationGetResponse>,
  profile: ProfileWithWallet
) {
  const externId = req.query.externId as string

  const locationToEdit = await prisma.location.findUnique({
    where: {
      externId: externId,
    },
    include: {
      caretaker: true,
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

  console.log(req.body)
}

export default withAuth(handler)
