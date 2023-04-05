import styled from 'styled-components'

interface ImageProps {
  src: string
  alt: string
}

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`
export const AutofitImage = ({ src, alt }: ImageProps) => (
  <StyledImg src={src} alt={alt} />
)
