import nextConnect from 'next-connect'
import multiparty, { File } from 'multiparty'
import { NextApiRequest } from 'next'

const middleware = nextConnect()

export interface NextApiRequestWithFiles extends NextApiRequest {
  files: {
    [key: string]: File[]
  }
}

middleware.use(async (req: NextApiRequestWithFiles, res, next) => {
  const form = new multiparty.Form()

  form.parse(req, function (err, fields, files) {
    req.body = fields
    req.files = files

    next()
  })
})

export default middleware
