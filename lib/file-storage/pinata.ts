import PinataClient from '@pinata/sdk'
import { Readable } from 'stream'

const pinata = new PinataClient({
  pinataJWTKey: process.env.PINATA_API_JWT,
})

async function uploadFile(
  readable: Readable,
  filename: string
): Promise<string> {
  const result = await pinata.pinFileToIPFS(readable, {
    pinataMetadata: {
      name: filename,
    },
  })

  return result.IpfsHash
}

const pinataService = {
  uploadFile,
}

export default pinataService
