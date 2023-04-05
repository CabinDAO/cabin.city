import { OwnedNft } from 'alchemy-sdk'

export const getImageUrl = (imageUrl: string) => {
  return imageUrl.startsWith('ipfs://')
    ? imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/' as string)
    : imageUrl
}

export const getImageUrlFromNft = (nft: OwnedNft) => {
  return getImageUrl(nft.media[0]?.thumbnail || nft.media[0]?.gateway)
}
