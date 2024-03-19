import { OwnedNft } from 'alchemy-sdk'

const DEFAULT_GATEWAY = 'https://ipfs.io/ipfs/'
const OWNED_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? DEFAULT_GATEWAY

export type TempImage = ResolvableImage & {
  name: string
}

export type ResolvableImage = {
  ipfsHash?: string | null | undefined
  imageIpfsHash?: string | null | undefined
  url?: string | null | undefined
}

export const getImageUrl = (imageUrl: string, useGateway = false) => {
  return imageUrl.startsWith('ipfs://')
    ? imageUrl.replace('ipfs://', useGateway ? OWNED_GATEWAY : DEFAULT_GATEWAY)
    : imageUrl.startsWith('https://ipfs.io/ipfs/')
    ? imageUrl.replace(
        'https://ipfs.io/ipfs/',
        useGateway ? OWNED_GATEWAY : DEFAULT_GATEWAY
      )
    : imageUrl
}

export const getImageUrlFromNft = (nft: OwnedNft) => {
  return getImageUrl(nft.image.originalUrl || nft.image.cachedUrl || '')
}

export const getImageUrlByIpfsHash = (
  ipfsHash: string | null | undefined,
  useGateway = false
) => {
  return ipfsHash
    ? `${useGateway ? OWNED_GATEWAY : DEFAULT_GATEWAY}${ipfsHash}`
    : null
}

export const resolveImageUrl = (image: ResolvableImage, useGateway = false) => {
  if (image.ipfsHash ?? image.imageIpfsHash) {
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
