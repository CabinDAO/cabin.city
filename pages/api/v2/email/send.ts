import type { NextApiRequest, NextApiResponse } from 'next'
import { SendgridService } from '@/lib/mail/sendgrid-service'
import { EmailType } from '@/lib/mail/types'
import { AuthData, requireProfile, withAuth } from '@/utils/api/withAuth'

export interface EmailParams {
  data: object
  type: EmailType
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { auth: AuthData }
) {
  await requireProfile(req, res, opts)

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

export default withAuth(handler)
