const DEFAULT_GATEWAY = 'https://ipfs.io/ipfs/'
const OWNED_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? DEFAULT_GATEWAY

export const getImageUrlByIpfsHash = (ipfsHash: string, useGateway = false) => {
  return `${useGateway ? OWNED_GATEWAY : DEFAULT_GATEWAY}${ipfsHash}`
}

export function cloudflareImageUrl(id: string, variant = 'public') {
  if (!id) return ''
  return `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${id}/${variant}`
}
