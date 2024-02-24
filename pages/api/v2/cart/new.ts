import { NextApiRequest, NextApiResponse } from 'next'
import { AuthData, withAuth } from '@/utils/api/withAuth'
import { prisma } from '@/lib/prisma'
import { randomId } from '@/utils/random'
import { CartNewResponse } from '@/utils/types/cart'
import { PaymentStatus } from '@prisma/client'

type CartNewParams = {
  amount: number
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CartNewResponse>,
  opts: { auth: AuthData }
) => {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const body = req.body as CartNewParams

  const cart = await prisma.cart.create({
    data: {
      externId: randomId('cart'),
      amount: body.amount,
      paymentStatus: PaymentStatus.Pending,
      notes: '',
    },
  })

  res.status(200).send({ externId: cart.externId })
}

export default withAuth(handler)
