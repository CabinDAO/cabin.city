import type { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
import formidable from 'formidable'
import { wrapHandler } from '@/utils/api/wrapHandler'
import { sendToDiscord } from '@/lib/discord'

export default wrapHandler(handler)

export const config = {
  api: {
    bodyParser: false,
  },
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const form = formidable({ keepExtensions: true })

  try {
    const [fields] = await form.parse(req)
    console.log('Fields:', fields)
    res.status(200).end()
  } catch (error: any) {
    Sentry.captureException(error)
    console.error(error)
    res.status(500).send({ error: 'Error parsing form data' })
  }
}
