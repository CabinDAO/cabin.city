import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import type { NextApiRequest, NextApiResponse } from 'next'
import withAuth from '@/utils/api/withAuth'
import { SendgridService } from '@/lib/mail/sendgrid-service'
import { EmailPayload, EmailType } from '@/lib/mail/types'

export interface EmailParams<T extends EmailPayload> {
  to: string
  data: T
  type: EmailType
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts?: { auth?: { externalUserId?: string } }
) {
  const externalUserId = opts?.auth?.externalUserId

  if (!externalUserId) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  const body = req.body as EmailParams<EmailPayload>
  const sendgrid = new SendgridService()

  try {
    const response = await sendgrid.sendEmail(body.to, body.data, body.type)
    console.info('sendgrid response', response)
    res.status(200).send({ message: 'OK' })
  } catch (error) {
    console.error('sendgrid error', error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
}

export default withIronSessionApiRoute(withAuth(handler), ironOptions)
