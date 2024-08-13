import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { Body1, Body2, H4 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'

import savannahPFP from './savannah-pfp.jpg'
import bethanyPFP from './bethany-pfp.jpg'
import jacksonPFP from './jackson-pfp.jpg'
import stefiPFP from './stefi-pfp.jpg'
import bethanyPic from './bethany-tweetimg.png'
import jacksonPic from './jackson-tweetimg.png'
import savannahPic from './savannah-tweetimg.png'
import { AutoImage } from '@/components/core/AutoImage'

export const TwitterSection = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  const [xOffset, setXOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      // get viewport height, and how far down the viewport we scrolled.
      // scrolling starts when bottom of tweets is 10% above viewport bottom
      // scrolling ends when tweet top is 10% below viewport top

      const viewportWidth = window.innerWidth
      const contentWidth =
        contentRef.current?.getBoundingClientRect().width ?? 0

      if (viewportWidth > contentWidth) {
        setXOffset(0)
        return
      }

      const viewportHeight = window.innerHeight
      const contentTop = contentRef.current?.getBoundingClientRect().top ?? 0
      const contentBottom =
        contentRef.current?.getBoundingClientRect().bottom ?? 0
      const contentHeight = contentBottom - contentTop

      const scrollStart = (viewportHeight - contentHeight) * 0.4
      const scrollEnd = (viewportHeight - contentHeight) * 0.8
      const scrollProgress = Math.max(
        0,
        Math.min(1, (contentTop - scrollStart) / (scrollEnd - scrollStart))
      )

      const parentLeft =
        contentRef.current?.parentElement?.getBoundingClientRect().left ?? 0

      const leftOverflow = (contentWidth - viewportWidth + parentLeft) / 2

      const xOffset = scrollProgress * leftOverflow * 2 - leftOverflow
      setXOffset(xOffset)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return (
    <Container>
      <Slider
        ref={contentRef}
        style={{ transform: `translateX(${xOffset}px)` }}
      >
        {tweets.map((i) => (
          <Item key={i.name} {...i} />
        ))}
      </Slider>
    </Container>
  )
}

const Text = styled(Body2)`
  opacity: 75%;
`

type Tweet = {
  pfpUrl: string
  name: string
  handle: string
  content: React.ReactNode
  date: string
  srcUrl: string
}

const tweets: Tweet[] = [
  {
    pfpUrl: savannahPFP.src,
    name: 'Savannah Kruger',
    handle: '@savkruger',
    content: (
      <>
        <Text>
          Favorite quote from our neighborhood park hang this evening:
        </Text>
        <Text>"I came tonight because I wanted to feel belonging."</Text>
        <Text>Guys, we did it. We did the thing.</Text>
        <AutoImage src={savannahPic.src} alt={'savannah park hang'} />
      </>
    ),
    date: 'May 20, 2024',
    srcUrl: 'https://twitter.com/savkruger/status/1792428314323493070',
  },
  {
    pfpUrl: bethanyPFP.src,
    name: 'Bethany Crystal',
    handle: '@bethanymarz',
    content: (
      <>
        <Text>
          Some messages that I've got since starting to build community on my
          block (step 1 of the @cabindotcity "Neighborhood Accelerator" plan).
        </Text>
        <Text></Text>
        <Text>1 - from a neighbor</Text>
        <Text>2 - another neighbor</Text>
        <Text>3 - from the building manager next door</Text>
        <Text>4 - from the building landlord (already nervous, lol)</Text>
        <AutoImage src={bethanyPic.src} alt={'bethany texts'} />
      </>
    ),
    date: 'Jun 19, 2024',
    srcUrl: 'https://twitter.com/bethanymarz/status/1803451606744051785',
  },
  {
    pfpUrl: jacksonPFP.src,
    name: 'Jackson Steger',
    handle: '@JacksonSteger',
    content: (
      <>
        <Text>
          Hosted another brunch for 117 creative and curious Venice Beach
          residents🎨
        </Text>
        <Text>
          We had stand-up comedy, 2 poetry readings, 4 musical acts, a
          portraitist, water painting, seed planets, and a freestyle jam (seen
          here) that lasted 6 hours
        </Text>
        <Text>Thanks to @cabindotcity for helping us do it!</Text>
        <AutoImage src={jacksonPic.src} alt={'creative kickback pic'} />
      </>
    ),
    date: 'May 2, 2024',
    srcUrl: 'https://twitter.com/JacksonSteger/status/1786184851810562510',
  },
  {
    pfpUrl: stefiPFP.src,
    name: 'SteFi',
    handle: '@NFTMami',
    content: (
      <>
        <Text>
          Thank you Cabin fam for always supporting your community. It was
          Creator Cabins that was pivotal for me to find my place in an onchain
          world.
        </Text>
        <Text>
          I hope some of you will join my and my friends for a creative
          residency after #ETHCC.
        </Text>
      </>
    ),
    date: 'May 16, 2024',
    srcUrl: 'https://twitter.com/NFTMami/status/1791170556190163451',
  },
]

const Item = (props: Tweet) => {
  return (
    <StyledItem>
      <Top>
        <PFP
          src={props.pfpUrl}
          alt={props.name}
          width={400}
          height={400}
          style={{ width: '5.6rem', height: '5.6rem' }}
        />
        <Name>
          <DisplayName>{props.name}</DisplayName>
          <Handle>{props.handle}</Handle>
        </Name>
        <Link
          href={props.srcUrl}
          target="_blank"
          rel="noopener nofollow noreferrer"
        >
          <XLogo name={'x-logo'} size={3.2} />
        </Link>
      </Top>
      <TweetContent>{props.content}</TweetContent>
      {/*<Date>{props.date}</Date>*/}
    </StyledItem>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 100%;
  }
`

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  width: 100%;
  transition: transform 0.7s cubic-bezier(0.5, 1, 0.89, 1); // https://easings.net/#easeOutQuad

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    gap: 2.4rem;
    width: auto;
  }
`

const StyledItem = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  width: 100%;
  height: min-content;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2.4rem;

  ${({ theme }) => theme.bp.lg} {
    align-self: stretch;
    width: 42rem;
    gap: 2.6rem;
    padding: 3.2rem;
  }
`

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.6rem;
  width: 100%;
`

const PFP = styled(Image)`
  border-radius: 50%;
  width: 64px;
  filter: drop-shadow(4px 4px 0 ${({ theme }) => theme.colors.yellow500});
`

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  overflow: hidden;
`

const TweetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;

  img {
    margin-top: 1rem;
  }
`

const XLogo = styled(Icon)`
  flex-shrink: 0;
`

const DisplayName = styled(H4)``

const Handle = styled(Body1)`
  opacity: 75%;
`

const Date = styled(Body2)`
  opacity: 55%;
`
