import styled from 'styled-components'
import { Body1 } from '@/components/core/Typography'
import Image from 'next/image'

export const TwitterSection = () => {
  return (
    <Content>
      {tweets.map((i) => (
        <Item key={i.name} {...i} />
      ))}
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
    pfpUrl: '/images/testimonial-charlie.jpg',
    name: 'Luca',
    handle: 'luca_tomescu',
    text: 'One of the coolest opportunities out there. No matter who you are or what you want to build',
    date: 'Feb 14, 2023',
    srcUrl: 'https://twitter.com/luca_tomescu/status/1448320000000000000',
  },
  {
    pfpUrl: '/images/testimonial-charlie.jpg',
    name: 'Luca',
    handle: 'luca_tomescu',
    text: 'One of the coolest opportunities out there. No matter who you are or what you want to build',
    date: 'Feb 14, 2023',
    srcUrl: 'https://twitter.com/luca_tomescu/status/1448320000000000000',
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
          style={{ width: '11.2rem', height: '11.2rem' }}
        />
        <Name>
          <DisplayName></DisplayName>
          <Handle></Handle>
        </Name>
        X
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
  width: 31rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`
const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`

const Top = styled.div``

const PFP = styled(Image)`
  border-radius: 50%;
  width: 64px;
  filter: drop-shadow(4px 4px 0 ${({ theme }) => theme.colors.yellow500});
`

const Name = styled.div``

const DisplayName = styled.div``

const Handle = styled.div``

const Text = styled(Body1)`
  max-width: 42rem;
  opacity: 75%;
  text-align: center;
  padding: 0 2rem;
`

const Date = styled.div``
