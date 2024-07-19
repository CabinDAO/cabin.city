import Image, { ImageProps } from 'next/image'

export function AutoImage({ src, alt, style, ...props }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      style={{ ...{ width: '100%', height: 'auto' }, ...style }}
      {...props}
    />
  )
}
