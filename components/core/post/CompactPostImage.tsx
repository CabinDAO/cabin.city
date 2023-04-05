import Image from 'next/image'

interface CompactPostImageProps {
  imageUrl: string
  alt: string
}

export const CompactPostImage = (props: CompactPostImageProps) => (
  <Image alt={props.alt} src={props.imageUrl} width={91} height={91} />
)
