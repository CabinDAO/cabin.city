import Image from 'next/image'
import styled from 'styled-components'

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`

export const AutofitImage = ({ src, alt }: ImageProps) => {
  return <StyledImage src={src} alt={alt} fill />
}
