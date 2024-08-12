import React from 'react'
import Link from 'next/link'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { SectionTitle } from '@/components/accelerator/shared'
import { LandingSectionTitle } from '@/components/landing/shared'
import { Slideshow } from '@/components/core/gallery/Slideshow'
import { Body1 } from '@/components/core/Typography'
import { AutoImage } from '@/components/core/AutoImage'
import savannah from '@/components/accelerator/SK Slide.png'
import bethany from '@/components/accelerator/Bethany Slide.png'
import Kathi from '@/components/accelerator/Kathi Slide.png'

export function NeighborhoodStoriesSection({
  variant,
}: {
  variant?: 'accelerator' | 'landing'
}) {
  const { deviceSize } = useDeviceSize()
  return (
    <Container>
      {variant === 'landing' ? (
        <LandingSectionTitle>Neighborhood Stories</LandingSectionTitle>
      ) : (
        <SectionTitle>Neighborhood Stories</SectionTitle>
      )}
      <Subtitle>
        <Body1>
          Real moments + stories from the incredible folks in our program. Read
          more stories in our{' '}
          <Link
            href={EXTERNAL_LINKS.NEIGHBORHOOD_MONTH_ONE_UPDATE}
            style={{ textDecoration: 'underline' }}
            target={'_blank'}
            rel={'noopener'}
          >
            Accelerator 1-Month Update
          </Link>
          .
        </Body1>
      </Subtitle>

      {deviceSize === 'mobile' ? (
        pics.map((i, n) => <AutoImage key={n} src={i.src} alt={'slide'} />)
      ) : (
        <Slideshow key={deviceSize} loop>
          {pics.map((i, n) => (
            <Slide key={n} src={i.src} />
          ))}
        </Slideshow>
      )}
    </Container>
  )
}

const pics = [Kathi, bethany, savannah]

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

const Subtitle = styled.div`
  width: 80%;

  ${({ theme }) => theme.bp.lg} {
    width: 55rem;
  }
`

const Slide = ({ src }: { src: string }) => {
  return (
    <SlideContent>
      <AutoImage src={src} alt={'slide'} />
    </SlideContent>
  )
}

const SlideContent = styled.div`
  width: 44rem;

  ${({ theme }) => theme.bp.lg} {
    width: 62rem;
  }
`
