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
import kathi from '@/components/accelerator/Kathi Slide.png'
import { BaseContainer } from '@/components/core/BaseContainer'

export function NeighborhoodStoriesSection({
  variant,
}: {
  variant?: 'nap' | 'landing'
}) {
  const { deviceSize } = useDeviceSize()
  return (
    <Container maxWidth={'wide'}>
      {variant === 'landing' ? (
        <LandingSectionTitle>Neighborhood Stories</LandingSectionTitle>
      ) : (
        <SectionTitle>Neighborhood Stories</SectionTitle>
      )}
      <Subtitle>
        <Body1>
          Real moments + stories from the incredible folks in the Neighborhood
          Accelerator Program. Read more stories in our{' '}
          <Link
            href={EXTERNAL_LINKS.NEIGHBORHOOD_MONTH_ONE_UPDATE}
            style={{ textDecoration: 'underline' }}
            target={'_blank'}
            rel={'noopener'}
          >
            Accelerator 1-Month Update
          </Link>{' '}
          and{' '}
          <Link
            href={EXTERNAL_LINKS.NEIGHBORHOOD_MONTH_TWO_UPDATE}
            style={{ textDecoration: 'underline' }}
            target={'_blank'}
            rel={'noopener'}
          >
            Accelerator 2-Month Update
          </Link>
          .
        </Body1>
      </Subtitle>

      {deviceSize === 'mobile' ? (
        pics.map((i, n) => <AutoImage key={n} src={i.src} alt={'slide'} />)
      ) : (
        <SlideshowCenteringDiv>
          <Slideshow key={deviceSize} loop fadeColor={'yellow200'}>
            {pics.map((i, n) => (
              <Slide key={n} src={i.src} />
            ))}
          </Slideshow>
        </SlideshowCenteringDiv>
      )}
    </Container>
  )
}

const pics = [kathi, bethany, savannah]

const SlideshowCenteringDiv = styled.div`
  width: fit-content;
  max-width: 100%;
`

const Container = styled(BaseContainer)`
  gap: 4rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: center;
`

const Subtitle = styled.div`
  width: 80%;
  text-align: center;

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
  width: 30rem;

  ${({ theme }) => theme.bp.lg} {
    width: 48rem;
  }
`
