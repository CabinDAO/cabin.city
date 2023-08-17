import styled from 'styled-components'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import { Caption } from '@/components/core/Typography'

interface HeroImageProps {
  src: string | StaticImageData
  alt: string
  caption?: string
}

export const HeroImage = ({ alt, src, caption }: HeroImageProps) => {
  return (
    <OuterContainer>
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
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
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
