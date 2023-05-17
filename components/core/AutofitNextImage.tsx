import Image from 'next/image'
import styled from 'styled-components'

interface ImageProps {
  src: string
  alt: string
  className?: string
  onLoadingComplete?: () => void
}

const StyledNextImage = styled(Image)`
  width: 100%;
  height: 100%;
`

export const AutofitNextImage = ({
  src,
  alt,
  className,
  onLoadingComplete,
}: ImageProps) => (
  <StyledNextImage
    onLoadingComplete={onLoadingComplete}
    className={className}
    src={src}
    alt={alt}
    fill
  />
)
