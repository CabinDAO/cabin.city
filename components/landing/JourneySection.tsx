import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { LandingSectionTitle } from '@/components/landing/shared'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { body1Styles, H4 } from '@/components/core/Typography'
import pic1 from './journey1.png'
import pic2 from './journey2.png'
import pic3 from './journey3.png'

export const JourneySection = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const wrapperDiv = document.getElementById('progressBarWrapper')
    if (!wrapperDiv) return

    const handleScroll = () => {
      const divHeight = wrapperDiv.clientHeight
      const divOffsetTop = wrapperDiv.offsetTop
      const scrollPosition = window.scrollY + 300
      const percentage = ((scrollPosition - divOffsetTop) / divHeight) * 100

      const clampedPercentage = Math.min(100, Math.max(10, percentage))
      setScrollPercentage(clampedPercentage)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Header>
        {/*<Icon name={'backpack-green'} size={8} />*/}
        <LandingSectionTitle>Grow your neighborhood</LandingSectionTitle>
        <BodyText>
          We are a global network of local community builders. Together, we are
          creating places we want to live.
        </BodyText>
      </Header>

      <ProgressBarWrapper id={'progressBarWrapper'}>
        <ProgressBar scrollPercent={scrollPercentage} />

        <Content>
          <Value style={{ gridArea: 'a' }}>
            <ValueTitle>Learn more about Cabin</ValueTitle>
            <BodyText>
              Learn more about Cabin and how you can get involved in growing a
              network city.
              <ul>
                <li>
                  <Link
                    href={EXTERNAL_LINKS.VISION}
                    target="_blank"
                    rel="noopener"
                  >
                    Read our vision
                  </Link>
                </li>
                <li>
                  <Link
                    href={EXTERNAL_LINKS.PODCAST}
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    Listen to our podcast
                  </Link>
                </li>
                <li>
                  <Link
                    href={EXTERNAL_LINKS.FORUM}
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    Check out the forum
                  </Link>
                </li>
              </ul>
            </BodyText>
          </Value>

          <Image
            src={pic1}
            alt={'One'}
            style={{
              gridArea: 'b',
              margin: 'auto',
              width: '80%',
              height: '80%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />

          <Value style={{ gridArea: 'c' }}>
            <ValueTitle>Join a neighborhood</ValueTitle>
            <BodyText>
              Co-create Cabin’s future by joining community members in your
              local area and participating online.
              <ul>
                <li>
                  <AuthenticatedLink href={'/city-directory'}>
                    Sign in & find people near you
                  </AuthenticatedLink>
                </li>
                <li>
                  <Link href={'/city-directory'}>
                    Find neighborhoods to live in
                  </Link>
                </li>
              </ul>
            </BodyText>
          </Value>

          <Image
            src={pic2}
            alt={'Two'}
            style={{
              gridArea: 'd',
              margin: 'auto',
              width: '80%',
              height: '80%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />

          <Value style={{ gridArea: 'e' }}>
            <ValueTitle>Start a neighborhood</ValueTitle>
            <BodyText>
              Grow your local neighborhood into a modern village that’s part of
              a global network city.
              <ul>
                <li>
                  <Link
                    href={`${EXTERNAL_LINKS.CALENDLY_CALL_URL}?utm_source=cabin.city&utm_content=landingpagetimeline`}
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    Book a call to get started
                  </Link>
                </li>
                <li>
                  <Link href={'/accelerator'}>
                    Join the Neighborhood Accelerator
                  </Link>
                </li>
                <li>
                  <AuthenticatedLink href={'/city-directory'}>
                    List your neighborhood
                  </AuthenticatedLink>
                </li>
              </ul>
            </BodyText>
          </Value>

          <Image
            src={pic3}
            alt={'Three'}
            style={{
              gridArea: 'f',
              margin: 'auto',
              width: '80%',
              height: '80%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
        </Content>
      </ProgressBarWrapper>
    </>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  text-align: center;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 40rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 56rem;
  }
`

const ProgressBarWrapper = styled.div`
  position: relative;
`

const ProgressBar = styled.div<{ scrollPercent: number }>`
  position: absolute;
  height: 100%;
  width: 10px;
  top: 0;
  right: calc(50% - 5px); // subtract half the width of the bar itself
  background: linear-gradient(
    to bottom,
    #324841,
    #06774c,
    #06df59 ${(props) => props.scrollPercent}%,
    ${({ theme }) => theme.colors.green900 + '1F'}
      ${(props) => props.scrollPercent}%,
    ${({ theme }) => theme.colors.green900 + '1F'}
  );
  z-index: 10;

  display: none;
  ${({ theme }) => theme.bp.md} {
    display: block;
  }
`

const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template: repeat(3, auto 1fr) / 100%;
  grid-template-areas:
    'a'
    'b'
    'c'
    'd'
    'e'
    'f';
  row-gap: 2.4rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
    column-gap: 8rem;
    grid-template: repeat(3, 1fr) / calc(50% - 4rem) calc(50% - 4rem); // subtract half the column-gap from each
    grid-template-areas:
      'a b'
      'd c'
      'e f';
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
    row-gap: 8rem;
  }
`

const Value = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.sm_max} {
    &:not(:first-of-type) {
      margin-top: 6.4rem;
    }
  }

  ${({ theme }) => theme.bp.lg} {
    &:nth-of-type(2n) {
      padding-left: 4rem;
    }
    &:nth-of-type(2n-1) {
      padding-right: 4rem;
    }
  }
`

const ValueTitle = styled(H4)`
  font-size: 2.4rem;
  line-height: 120%; /* 3.84rem */
  font-weight: 600;

  ${({ theme }) => theme.bp.lg} {
    font-size: 3.2rem;
  }
`

const BodyText = styled.div`
  ${body1Styles}

  opacity: 0.75;

  ul {
    margin-top: 4rem;
    margin-left: 1rem;
    list-style: inside;

    li {
      margin-top: 1.6rem;
    }
  }

  a,
  li > span {
    text-decoration: underline;
  }
`
