import { OwnedNft } from 'alchemy-sdk'

const DEFAULT_GATEWAY = 'https://ipfs.io/ipfs/'
const MAYBE_OWNED_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? DEFAULT_GATEWAY

export type TempImage = ResolvableImage & {
  name: string
}

export type ResolvableImage = {
  ipfsHash?: string | null | undefined
  imageIpfsHash?: string | null | undefined
  url?: string | null | undefined
}

export const getImageUrl = (imageUrl: string) => {
  return imageUrl.startsWith('ipfs://')
    ? imageUrl.replace('ipfs://', MAYBE_OWNED_GATEWAY)
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
    ? `${useGateway ? MAYBE_OWNED_GATEWAY : DEFAULT_GATEWAY}${ipfsHash}`
    : null
}

export const resolveImageUrl = (image: ResolvableImage, useGateway = false) => {
  if (image.ipfsHash ?? image.imageIpfsHash) {
    return getImageUrlByIpfsHash(
      image.ipfsHash ?? image.imageIpfsHash,
      useGateway
    )
  } else if (image.url) {
    return getImageUrl(image.url)
  } else {
    return ''
  }
}
