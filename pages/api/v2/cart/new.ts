import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).send({ error: 'Not implemetend' })
  // <ApplyButton> used to create the cart. see commit 0f92ab8fa96c963700344edb7acaa2737b947582
}

export default handler
