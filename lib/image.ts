export const getImageUrl = (imageUrl: string) => {
  return imageUrl.startsWith('ipfs://')
    ? imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/' as string)
    : imageUrl
}
