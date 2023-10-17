import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import type { NextApiRequest, NextApiResponse } from 'next'
import withAuth from '@/utils/api/withAuth'
import { SendgridService } from '@/lib/mail/sendgrid-service'
import { EmailType } from '@/lib/mail/types'

export interface EmailParams {
  data: object
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

  const body = req.body as EmailParams
  const sendgrid = new SendgridService()

  try {
    const response = await sendgrid.sendEmail(body.type, body.data)
    console.info('sendgrid response', response)
    res.status(200).send({ message: 'OK' })
  } catch (error: any) {
    console.error('sendgrid error', error, error.response?.body)
    res.status(500).send({
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : error.message,
    })
  }
}

export default withIronSessionApiRoute(withAuth(handler), ironOptions)
