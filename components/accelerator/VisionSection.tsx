import React from 'react'
import Link from 'next/link'
import { useWindowSize } from 'react-use'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { Body1, H3 } from '@/components/core/Typography'
import { SectionTitle } from '@/components/accelerator/SectionTitle'
import { AutoImage } from '@/components/core/AutoImage'
import { Button } from '@/components/core/Button'
import mapAndPolaroids from '@/components/accelerator/map-and-polaroids.jpg'
import mapOnly from '@/components/accelerator/map-only.jpg'
import { acceleratorApplyClickEvent } from '@/lib/googleAnalytics/analytics'

export const VisionSection = () => {
  const { width } = useWindowSize()
  const { deviceSize } = useDeviceSize()
  return (
    <Container width={width}>
      <Content>
        <Left>
          <StyledH3>Our Vision at Cabin</StyledH3>
          <Title>A network of modern villages</Title>
          <Body1>
            We’re building neighborhoods we’d want to grow up in and grow old
            in. We are our best selves when we live near people we admire. We
            want to live in neighborhoods where friends become family – where we
            have elders we respect and we raise our kids together – where we
            share resources and solve problems.
          </Body1>
          <Body1>
            We know that it takes a village to raise kids and it also takes a
            village to thrive as an adult.
          </Body1>
          <Body1>
            Cabin neighborhoods are places where we can dream about our ideal
            vision of the future, and start building it right in our own
            backyards.{' '}
            <strong>If this excites you, we’d love for you to join us</strong>.
          </Body1>
          <Buttons>
            <Link
              href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM}
              onClick={() => acceleratorApplyClickEvent('accelerator-vision')}
              style={{ width: 'min-content' }}
              target="_blank"
              rel="noopener"
            >
              <Button variant={'primary'}>Apply</Button>
            </Link>
            <Link
              href={EXTERNAL_LINKS.VISION}
              style={{ width: 'min-content' }}
              target="_blank"
              rel="noopener"
            >
              <Button variant={'tertiary'}>Learn More</Button>
            </Link>
          </Buttons>
        </Left>

        <Right>
          <AutoImage
            src={deviceSize === 'desktop' ? mapAndPolaroids.src : mapOnly.src}
            alt={'neighborhoods map'}
          />
        </Right>
      </Content>
    </Container>
  )
}

const Container = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: auto;
    max-width: ${({ width }) => (width > 1320 ? '1100' : width - 220)}px;
  }
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg} {
    width: 48%;
  }
`

const Right = styled.div`
  width: 100%;

  ${({ theme }) => theme.bp.lg} {
    width: 48%;
  }
`

const Title = styled(SectionTitle)`
  ${({ theme }) => theme.bp.lg} {
    width: auto;
    text-align: left;
  }
`

const StyledH3 = styled(H3)`
  text-align: center;
  ${({ theme }) => theme.bp.lg} {
    text-align: left;
  }
`

const Buttons = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 2.4rem;
  margin-bottom: 4rem;
`