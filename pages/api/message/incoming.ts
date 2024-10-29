import type { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
import formidable from 'formidable'
import { z } from 'zod'
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

    const schema = z.object({
      envelope: z.array(
        z.string().transform((str) =>
          z
            .object({
              to: z.array(z.string()),
              from: z.string(),
            })
            .parse(JSON.parse(str))
        )
      ),
      subject: z.array(z.string()),
      text: z.array(z.string()),
      html: z.array(z.string()),
    })

    const parsed = schema.parse(fields)

    sendToDiscord(
      `Got inbound message from ${parsed.envelope[0].from} to ${parsed.envelope[0].to[0]} with subject ${parsed.subject[0]}\n\n\`\`\`\n${parsed.text[0]}\n\`\`\`\n\n---\n\n\`\`\`\n${parsed.html[0]}\n\`\`\``
    )

    res.status(200).end()
  } catch (error: any) {
    Sentry.captureException(error)
    console.error(error)
    res.status(500).send({ error: 'Error parsing form data' })
  }
}
