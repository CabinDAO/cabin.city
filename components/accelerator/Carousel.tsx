import React from 'react'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import styled from 'styled-components'
import { Slideshow } from '@/components/core/gallery/Slideshow'
import { Body1, H3 } from '@/components/core/Typography'
import { AutoImage } from '@/components/core/AutoImage'

import forestWalk from '@/components/accelerator/forest-walk.jpg'
import firePit from '@/components/accelerator/fire-pit.jpg'
import parkPicnic from '@/components/accelerator/park-picnic.jpg'
import { SectionTitle } from '@/components/accelerator/shared'

export const Carousel = () => {
  const { deviceSize } = useDeviceSize()

  return (
    <Content>
      <SectionTitle light>Imagine a neighborhood where...</SectionTitle>
      <Slideshow key={deviceSize} loop advanceAfter={9}>
        {testimonials.map((i, n) => (
          <Slide key={n} {...i} />
        ))}
      </Slideshow>
    </Content>
  )
}

type Datum = {
  imgUrl: string
  sideText: string
  caption: string
}

const testimonials: Datum[] = [
  {
    sideText:
      'Neighbors of different generations go for walk together like one big family.',
    imgUrl: forestWalk.src,
    caption: 'Forest’s neighborhood in Olympia, WA',
  },
  {
    sideText: 'A weekly picnic brings people together in the park.',
    imgUrl: parkPicnic.src,
    caption: 'Families meet in the plaza in Healdsburg, CA',
  },
  {
    sideText: 'The neighborhood comes together to celebrate annual traditions.',
    imgUrl: firePit.src,
    caption:
      'Neighbors gather around the bonfire in Shani’s neighborhood in Perth, Australia',
  },
]

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 8rem); // 4rem padding on each side. THIS IS A HACK :(
  margin-bottom: 4rem;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`

const Slide = (props: Datum) => {
  return (
    <SlideContent>
      <Left>
        <H3>{props.sideText}</H3>
      </Left>
      <Right>
        <Picture src={props.imgUrl} alt={props.caption} />
        <Text>{props.caption}</Text>
      </Right>
    </SlideContent>
  )
}

const SlideContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  flex-shrink: 0;
  width: calc(100vw - 8rem);
  height: 44rem;
  background-color: ${({ theme }) => theme.colors.yellow400};
  padding: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  gap: 2.4rem;
  padding: 3rem;
  transform: rotate(4deg);
  transform-origin: center;
  max-width: 100%;
  max-height: 100%;
`

const Picture = styled(AutoImage)`
  filter: drop-shadow(4px 4px 0 ${({ theme }) => theme.colors.yellow500});
`

const Text = styled(Body1)`
  max-width: 42rem;
  opacity: 75%;
  text-align: center;
  padding: 0 2rem;
  width: 100%;
`
