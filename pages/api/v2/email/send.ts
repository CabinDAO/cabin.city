import type { NextApiRequest, NextApiResponse } from 'next'
import { SendgridService } from '@/lib/mail/sendgrid-service'
import { ResponseError } from '@sendgrid/helpers/classes'
import { EmailType } from '@/lib/mail/types'
import {
  OptsWithAuth,
  requireProfile,
  wrapHandler,
} from '@/utils/api/wrapHandler'

export interface EmailParams {
  data: object
  type: EmailType
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: OptsWithAuth
) {
  await requireProfile(opts.auth)

  const body = req.body as EmailParams
  const sendgrid = new SendgridService()

  try {
    const response = await sendgrid.sendEmail(body.type, body.data)
    console.info('sendgrid sendEmail response', response)
    res.status(200).send({ message: 'OK' })
  } catch (e: unknown) {
    if (e instanceof ResponseError) {
      console.error('sendgrid ResponseError', e, e.response?.body)
      res.status(500).send({
        message:
          process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : `Sendgrid ResponseError: ${e.message}`,
      })
    } else {
      console.error(e)
      res.status(500).send({
        message:
          process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : `${e}`,
      })
    }
  }
}

export default wrapHandler(handler)
