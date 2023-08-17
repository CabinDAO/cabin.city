import styled from 'styled-components'
import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface HeroImageProps {
  src: string | StaticImageData
  alt: string
  caption?: string
}

export const HeroImage = ({ alt, src, caption }: HeroImageProps) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          alt={alt}
          src={src}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </ImageContainer>
      {caption && <Caption>{caption}</Caption>}
    </Container>
  )
}
const Caption = styled.div`
  color: ${({ theme }) => theme.colors.green800};
  font-size: 1.3rem;
  font-weight: 400;
  opacity: 0.75;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;

  Image {
    object-fit: contain;
  }
`
