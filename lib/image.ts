import { OwnedNft } from 'alchemy-sdk'

const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'

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
