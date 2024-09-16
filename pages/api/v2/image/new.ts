import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'
import axios from 'axios'
import { ImageNewResponse } from '@/utils/types/image'

type CloudflareUploadResponse = {
  success: boolean
  // errors: []
  // messages: []
  result: {
    id: string
    uploadURL: string
  }
}

export default withAuth(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageNewResponse>,
  opts: { auth: AuthData }
) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  // await requireProfile(opts.auth) // THIS BREAK PFP UPLOAD FOR NEW USERS

  try {
    const form = new FormData()
    // form.append('requireSignedURLs', 'true') // havent implemented signed urls yet
    const cfRes = await axios.post<CloudflareUploadResponse>(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_ID}/images/v2/direct_upload`,
      form,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_API_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    if (cfRes.data.success) {
      res.status(200).send({ url: cfRes.data.result.uploadURL })
      return
    }

    res.status(500).send({ error: 'Something went wrong' })
    return
  } catch (error: unknown) {
    if (axios.isAxiosError(error) || error instanceof Error) {
      res.status(500).send({ error: error.message })
    } else {
      res.status(500).send({ error: `${error}` })
    }
  }
}
