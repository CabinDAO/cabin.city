export function imageUrlForId(id: string, variant = 'public') {
  return `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${id}/${variant}`
}
