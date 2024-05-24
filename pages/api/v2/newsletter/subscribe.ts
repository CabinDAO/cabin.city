import { NextApiRequest, NextApiResponse } from 'next'
import { subscribe } from '@/lib/convertkit'
import { AxiosError } from 'axios'

export type SubscribeParams = {
  email: string
}

export type SubscribeResponse = {
  success: boolean
  message: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>
) {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const body = req.body as SubscribeParams
  const email = body.email
  if (!email) {
    res.send({ success: false, message: 'Enter your email and try again.' })
    return
  }

  try {
    await subscribe(email)
    res.send({ success: true, message: 'Subscribed' })
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      // console.log(e.response?.data)
      res.send({ success: false, message: e.response?.data.message })
    } else {
      console.error(e)
      res.send({
        success: false,
        message: `An unexpected error occurred: ${e}`,
      })
    }
  }
}

export default handler
