type variant = 'public' | 'mapAvatar'

export function cloudflareImageUrl(id: string, variant: variant = 'public') {
  if (!id) return ''
  return `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${id}/${variant}`
}

export function avatarImageUrl(cfIdOrUrl: string, variant: variant = 'public') {
  return cfIdOrUrl.startsWith('http://') || cfIdOrUrl.startsWith('https://')
    ? cfIdOrUrl
    : cloudflareImageUrl(cfIdOrUrl, variant)
}
