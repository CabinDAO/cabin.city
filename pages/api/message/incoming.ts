import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import EmailReplyParser from 'email-reply-parser'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { wrapHandler } from '@/utils/api/wrapHandler'
import { toErrorString } from '@/utils/api/error'
import { sendToDiscord } from '@/lib/discord'
import {
  createAndSendMessage,
  messageExternIdFromReplyToEmail,
  sendReplyError,
} from '@/utils/message'

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
      // envelope: z.array(
      //   z.string().transform((str) =>
      //     z
      //       .object({
      //         to: z.array(z.string()),
      //         from: z.string(),
      //       })
      //       .parse(JSON.parse(str))
      //   )
      // ),
      subject: z.array(z.string()).optional(),
      text: z.array(z.string()),
      // html: z.array(z.string()), // unused
      SPF: z.array(z.string()).optional(),
      dkim: z.array(z.string()).optional(),
    })

    const parsed = schema.safeParse(fields)
    if (!parsed.success) {
      sendToDiscord(
        `<@202214676761804801> failed to parse inbound message.\nError: ${toErrorString(
          parsed.error
        )}\nRequest body: \`\`\`\n${JSON.stringify(req.body)}\n\`\`\``
      )
      res.status(400).send({ error: toErrorString(parsed.error) })
      return
    }
    const params = parsed.data

    const senderEmail = params.from[0].includes('<')
      ? params.from[0].split('<')[1].split('>')[0]
      : params.from[0]
    const ourMessageReplyEmail = params.to[0].includes('<')
      ? params.to[0].split('<')[1].split('>')[0]
      : params.to[0]

    const replyParser = new EmailReplyParser()
    const replyText = replyParser.parseReply(params.text[0])

    sendToDiscord(
      `Got inbound message from ${senderEmail} to ${ourMessageReplyEmail} with subject ${
        params.subject?.[0] || '(none)'
      }\n\nlast reply:\n\`\`\`\n${replyText}\n\`\`\`\n\nfull text:\n\`\`\`\n${
        params.text[0]
      }\n\`\`\``
    )

    res.status(200).end() // tell Sendgrid we're done before continuing

    console.log(params)

    if (
      !params.SPF ||
      params.SPF[0] !== 'pass' ||
      !params.dkim ||
      !params.dkim[0].includes('pass')
    ) {
      sendToDiscord(
        `Security checks failed: SPF: ${params.SPF?.[0] || '(none)'}, DKIM: ${
          params.dkim?.[0] || '(none)'
        }`
      )
      // await sendReplyError(senderEmail, 'spf-failed')
      return
    }

    const sender = await prisma.profile.findUnique({
      where: { email: senderEmail },
    })

    if (!sender) {
      sendToDiscord(`Profile not found for ${senderEmail}`)
      await sendReplyError(senderEmail, 'emailNotFound')
      return
    }

    const inReplyToExternId =
      messageExternIdFromReplyToEmail(ourMessageReplyEmail)

    const message = await prisma.message.findUnique({
      where: { externId: inReplyToExternId },
      include: { sender: true }, // current message is a reply to sender of prev message
    })

    if (!message) {
      sendToDiscord(`Message not found for externId ${inReplyToExternId}`)
      await sendReplyError(senderEmail, 'messageNotFound')
      return
    }

    await createAndSendMessage({
      sender,
      recipient: message.sender,
      inReplyTo: message,
      text: replyText,
    })
  } catch (error: unknown) {
    console.error(error)
    res.status(500).send({ error: 'Error parsing form data' })
  }
}
