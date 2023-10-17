import { NextApiRequest, NextApiResponse } from 'next'
import { subscribe } from '@/utils/convertkit'
import { AxiosError } from 'axios'

type SubscribeData = {
  email: string
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const body = req.body as SubscribeData
  const email = body.email
  if (!email) {
    res.send({ success: false, message: 'Enter your email and try again.' })
    return
  }

  try {
    const { data } = await subscribe(email)
    res.send({ success: true, data: data })
  } catch (e: any) {
    if (e instanceof AxiosError) {
      // console.log(e.response?.data)
      res.send({ success: false, message: e.response?.data.message })
    } else {
      console.error(e)
      res.send({
        success: false,
        message: 'An unexpected error occurred.',
        error: e,
      })
    }
  }
}

export default handler
