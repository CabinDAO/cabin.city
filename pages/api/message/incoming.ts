import type { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
import formidable from 'formidable'
import { z } from 'zod'
import { wrapHandler } from '@/utils/api/wrapHandler'
import { sendToDiscord } from '@/lib/discord'
import EmailReplyParser from 'email-reply-parser'

export default wrapHandler(handler)

export const config = { api: { bodyParser: false } }

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const form = formidable({ keepExtensions: true })

  try {
    // NOTE: if testing via curl, you need to:
    // -  put the body data into a file
    // -  unix2dos the file so each line ends with \r\n
    // -  send the data with `--data-binary @/path/to/file`
    // -  set the boundary with -H 'Content-Type: multipart/form-data; boundary=xYzZY' (must match the boundary in the file)
    const [fields] = await form.parse(req)

    const schema = z.object({
      from: z.array(z.string()),
      to: z.array(z.string()),
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

    const replyParser = new EmailReplyParser()
    const replyText = replyParser.parseReply(parsed.text[0])

    console.log(replyText)

    sendToDiscord(
      `Got inbound message from ${parsed.from[0]} to ${parsed.to[0]} with subject ${parsed.subject[0]}\n\nlast reply:\n\`\`\`\n${replyText}\n\`\`\`\n\nfull text:\n\`\`\`\n${parsed.text[0]}\n\`\`\``
    )

    res.status(200).end()
  } catch (error: any) {
    Sentry.captureException(error)
    console.error(error)
    res.status(500).send({ error: 'Error parsing form data' })
  }
}
