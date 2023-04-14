import { OwnedNft } from 'alchemy-sdk'

const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? 'https://ipfs.io/ipfs/'
// TODO: replace with GraphQL type
export type TempImage = {
  name: string
  ipfsHash?: string
  url?: string
}

export const getImageUrl = (imageUrl: string) => {
  return imageUrl.startsWith('ipfs://')
    ? imageUrl.replace('ipfs://', IPFS_GATEWAY as string)
    : imageUrl
}

export const getImageUrlFromNft = (nft: OwnedNft) => {
  return getImageUrl(nft.media[0]?.thumbnail || nft.media[0]?.gateway)
}

export const getImageUrlByIpfsHash = (ipfsHash: string) => {
  return `${IPFS_GATEWAY}${ipfsHash}`
}

export const resolveImageUrl = (image: TempImage) => {
  if (image.ipfsHash) {
    return getImageUrlByIpfsHash(image.ipfsHash)
  } else if (image.url) {
    return getImageUrl(image.url)
  } else {
    return ''
  }
}
