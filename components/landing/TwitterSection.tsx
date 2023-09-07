import styled from 'styled-components'
import { Body1, Body2, H4 } from '@/components/core/Typography'
import Image from 'next/image'
import Icon from '@/components/core/Icon'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import lucaPFP from './luca.jpg'
import eileenPFP from './eileenvert.jpg'
import zoyaPFP from './zoya.jpg'
import adrianPFP from './adrian.jpg'

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

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return (
    <Content>
      <Slider
        ref={contentRef}
        style={{ transform: `translateX(${xOffset}px)` }}
      >
        {tweets.map((i) => (
          <Item key={i.name} {...i} />
        ))}
      </Slider>
    </Content>
  )
}

type Tweet = {
  pfpUrl: string
  name: string
  handle: string
  text: string
  date: string
  srcUrl: string
}

const tweets: Tweet[] = [
  {
    pfpUrl: eileenPFP.src,
    name: 'Eileen',
    handle: '@eileenvert',
    text: 'I am so grateful to have found @Montaialife through @cabindotcity last year. Now I am back! This place rly is a home, a basecamp, a taproot to return to.',
    date: 'Jun 11, 2023',
    srcUrl: 'https://twitter.com/eileenvert/status/1667764485288005632',
  },
  {
    pfpUrl: lucaPFP.src,
    name: 'Luca',
    handle: '@luca_tomescu',
    text: 'One of the coolest opportunities out there. No matter who you are or what you want to build',
    date: 'Feb 14, 2023',
    srcUrl: 'https://twitter.com/luca_tomescu',
  },
  {
    pfpUrl: zoyaPFP.src,
    name: 'Zoya Yaseka',
    handle: '@zoyayaseka',
    text: 'The way this opportunity is changing lives and setting the foundation for new ways to live and commune 🥰✨👏🏾',
    date: 'Jun 28, 2023',
    srcUrl: 'https://twitter.com/zoyayaseka',
  },
  {
    pfpUrl: adrianPFP.src,
    name: 'Adrian Seneca',
    handle: '@adrian_seneca',
    text: 'it has been an incredibly expansive and nourishing experience. Connecting, weaving and integrating with community while surrounded by land is 100% my vibe.',
    date: 'Mar 10, 2023',
    srcUrl: 'https://twitter.com/adrian_seneca',
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
        <Link href={props.srcUrl} target={'_blank'} rel={'noreferer'}>
          <XLogo name={'x-logo'} size={3.2} />
        </Link>
      </Top>
      <Text>{props.text}</Text>
      <Date>{props.date}</Date>
    </StyledItem>
  )
}

const Content = styled.div`
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
  gap: 1.2rem;
  width: 100%;
  overflow: hidden;
`

const XLogo = styled(Icon)`
  flex-shrink: 0;
`

const DisplayName = styled(H4)``

const Handle = styled(Body1)`
  opacity: 75%;
`

const Text = styled(Body2)`
  opacity: 75%;
`

const Date = styled(Body2)`
  opacity: 55%;
`
