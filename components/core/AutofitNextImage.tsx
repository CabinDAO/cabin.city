import Image from 'next/image'
import styled from 'styled-components'

interface ImageProps {
  src: string
  alt: string
}

const StyledNextImage = styled(Image)`
  width: 100%;
  height: 100%;
`

export const AutofitNextImage = ({ src, alt }: ImageProps) => (
  <StyledNextImage src={src} alt={alt} fill />
)
