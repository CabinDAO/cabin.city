import React from 'react'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import styled from 'styled-components'
import {
  GreenUnderline,
  SectionTitle,
} from '@/components/accelerator/SectionTitle'
import { Slideshow } from '@/components/core/gallery/Slideshow'
import { AutoImage } from '@/components/core/AutoImage'
import { fonts } from '@/components/core/Typography'
import shani from '@/components/accelerator/shani-neighborhood.jpg'
import sk from '@/components/accelerator/sk-neighborhood.jpg'
import forest from '@/components/accelerator/forest-neighborhood.jpg'
import bethany from '@/components/accelerator/bethany-neighborhood.jpg'
import shani2 from '@/components/accelerator/shani2-neighborhood.jpg'

export function ImagineSection() {
  const { deviceSize } = useDeviceSize()
  return (
    <Container>
      <SectionTitle light>Imagine a neighborhood where...</SectionTitle>

      <Slideshow key={deviceSize} loop>
        {slides.map((i, n) => (
          <Slide key={n} {...i} />
        ))}
      </Slideshow>

      <BottomText>
        People in our program made these things happen.{' '}
        <GreenUnderline>You can too.</GreenUnderline>
      </BottomText>
    </Container>
  )
}

const slides: { src: string; subtext: string }[] = [
  {
    src: shani.src,
    subtext: 'Neighbors come together to celebrate sweet annual traditions.',
  },
  {
    src: sk.src,
    subtext: 'Friends and neighbors discuss philosophy and meaning.',
  },
  {
    src: forest.src,
    subtext:
      'Neighbors of different generations go for walks together like one big family.',
  },
  {
    src: bethany.src,
    subtext: 'Kiddos get involved in neighborhood-building.',
  },
  {
    src: shani2.src,
    subtext: 'Front yards are converted into community gardens.',
  },
]

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.bp.md} {
    width: calc(100vw - 30rem);
  }
`

const Slide = ({ src, subtext }: { src: string; subtext: string }) => {
  return (
    <SlideContent>
      <AutoImage src={src} alt={'slide'} />
      <Subtext>{subtext}</Subtext>
    </SlideContent>
  )
}

const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 80vw;

  ${({ theme }) => theme.bp.md} {
    width: 44rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 62rem;
  }
`

const Subtext = styled.div`
  font-family: ${fonts.inter};
  font-weight: 500;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.yellow100};
  font-size: 2.4rem;
`

const BottomText = styled.div`
  font-family: ${fonts.inter};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.yellow100};
  font-size: 3.2rem;
  text-align: center;
`
