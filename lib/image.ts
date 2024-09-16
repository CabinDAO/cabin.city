type variant = 'public' | 'mapAvatar'

export function cloudflareImageUrl(id: string, variant: variant = 'public') {
  if (!id) return ''
  return `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${id}/${variant}`
}
