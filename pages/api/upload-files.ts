import nextConnect from 'next-connect'
import fs from 'fs'
import { NextApiResponse } from 'next'
import middleware, {
  NextApiRequestWithFiles,
} from '@/lib/file-storage/multipart.middleware'
import pinataService from '@/lib/file-storage/pinata'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { SUPPORTED_FILE_TYPES } from '@/lib/file-storage/configuration'

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
  const { method } = req

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${method} Not Allowed`)
  }

  try {
    const files = req.files.files

    if (!files) {
      return res.status(400).json({ error: 'Bad request' })
    }

    const ipfsHashMap = {} as FileNameIpfsHashMap

    for (const file of files) {
      const supported = SUPPORTED_FILE_TYPES.includes(
        file.headers['content-type']
      )
      if (supported) {
        const { path, originalFilename } = file
        const readStream = fs.createReadStream(path)

        const ipfsHash = await pinataService.uploadFile(
          readStream,
          originalFilename
        )

        ipfsHashMap[originalFilename] = ipfsHash
      }
    }

    return res.status(201).json(ipfsHashMap)
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: 'Bad request' })
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

// TODO: Authenticated route
export default handler
