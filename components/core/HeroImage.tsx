import styled from 'styled-components'
import { StaticImageData } from 'next/image'
import { Caption } from '@/components/core/Typography'
import { AutoImage } from '@/components/core/AutoImage'

interface HeroImageProps {
  src: string | StaticImageData
  alt: string
  caption?: string
}

export const HeroImage = ({ alt, src, caption }: HeroImageProps) => {
  return (
    <OuterContainer>
      <ImageContainer>
        <AutoImage alt={alt} src={src} />
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
