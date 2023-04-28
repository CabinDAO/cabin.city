import { OwnedNft } from 'alchemy-sdk'

const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? 'https://ipfs.io/ipfs/'
// TODO: replace with GraphQL type
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
    ? imageUrl.replace('ipfs://', IPFS_GATEWAY as string)
    : imageUrl
}

export const getImageUrlFromNft = (nft: OwnedNft) => {
  return getImageUrl(nft.media[0]?.thumbnail || nft.media[0]?.gateway)
}

export const getImageUrlByIpfsHash = (ipfsHash: string | null | undefined) => {
  return ipfsHash ? `${IPFS_GATEWAY}${ipfsHash}` : null
}

export const resolveImageUrl = (image: ResolvableImage) => {
  if (image.ipfsHash ?? image.imageIpfsHash) {
    return getImageUrlByIpfsHash(image.ipfsHash ?? image.imageIpfsHash)
  } else if (image.url) {
    return getImageUrl(image.url)
  } else {
    return ''
  }
}
