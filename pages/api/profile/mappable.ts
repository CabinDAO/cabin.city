import type { NextApiRequest, NextApiResponse } from 'next'
// import crypto from 'crypto'
import { wrapHandler } from '@/utils/api/wrapHandler'
import { prisma } from '@/lib/prisma'
import { ProfileMappableResponse } from '@/utils/types/profile'

export default wrapHandler(handler)

const cacheTime = 3600

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileMappableResponse>
) {
  if (req.method != 'GET') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const profiles = await prisma.profile.findMany({
    select: {
      name: true,
      externId: true,
      avatarCfId: true,
      address: {
        select: { lat: true, lng: true },
      },
    },
    where: { address: { lat: { not: null } } },
  })

  // const etag = crypto
  //   .createHash('md5')
  //   .update(JSON.stringify(profiles))
  //   .digest('hex')

  // // Check if the client's ETag matches the current one
  // if (req.headers['if-none-match'] === etag) {
  //   // Client's cache is up-to-date, no need to send the response again
  //   res.status(304).end() // Not Modified
  //   return
  // }
  // res.setHeader('ETag', etag)

  res.setHeader(
    'Cache-Control',
    `s-maxage=${cacheTime}, stale-while-revalidate`
  )

  res.status(200).send({
    profiles: profiles.map((profile) => ({
      name: profile.name,
      externId: profile.externId,
      avatarCfId: profile.avatarCfId,
      lat: profile.address?.lat || 0,
      lng: profile.address?.lng || 0,
    })),
  })
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: cacheTime,
  }
}
