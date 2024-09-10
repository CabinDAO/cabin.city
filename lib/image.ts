import { imageUrlForId } from '@/lib/cloudflareImages'

const DEFAULT_GATEWAY = 'https://ipfs.io/ipfs/'
const OWNED_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? DEFAULT_GATEWAY

export type TempImage = ResolvableImage & {
  name: string
}

const getImageUrl = (imageUrl: string, useGateway = false) => {
  return imageUrl.startsWith('ipfs://')
    ? imageUrl.replace('ipfs://', useGateway ? OWNED_GATEWAY : DEFAULT_GATEWAY)
    : imageUrl
}

export const getImageUrlByIpfsHash = (
  ipfsHash: string | null | undefined,
  useGateway = false
) => {
  return ipfsHash
    ? `${useGateway ? OWNED_GATEWAY : DEFAULT_GATEWAY}${ipfsHash}`
    : null
}

type ResolvableImage = {
  ipfsHash?: string | null | undefined
  imageIpfsHash?: string | null | undefined
  cfId?: string | null | undefined
  url?: string | null | undefined
}

export const resolveImageUrl = (image: ResolvableImage, useGateway = false) => {
  if (image.cfId) {
    return imageUrlForId(image.cfId)
  } else if (image.ipfsHash ?? image.imageIpfsHash) {
    return getImageUrlByIpfsHash(
      image.ipfsHash ?? image.imageIpfsHash,
      useGateway
    )
  } else if (image.url) {
    return getImageUrl(image.url, useGateway)
  } else {
    return ''
  }
}
