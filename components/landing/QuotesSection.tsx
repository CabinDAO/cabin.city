import styled from 'styled-components'
// import theme from '@/styles/theme'
import { Body2, H4 } from '../core/Typography'
import { LandingSectionContent } from './styles'

export const QuotesSection = () => {
  return (
    <Content>
      {testimonialData.map((i) => (
        <Item key={i.name} imgUrl={i.imgUrl} name={i.name} text={i.text} />
      ))}
    </Content>
  )
}

type Datum = {
  imgUrl: string
  name: string
  text: string
}

const testimonialData: Datum[] = [
  {
    imgUrl: '/images/testimonial-ddwchen.jpg',
    name: '@ddwchen',
    text: 'This experience made me feel like we were all family. I formed lifelong friendships this week, which is pretty special and rare when you’re normally working remotely and can feel pretty isolated.',
  },
  {
    imgUrl: '/images/testimonial-richiebonilla.jpg',
    name: '@richiebonilla',
    text: 'A unique combination of intentional gathering, deeply thoughtful discussion, and barefoot child-like play. I’m still processing and integrating this very special experience.',
  },
  {
    imgUrl: '/images/testimonial-spengrah.jpg',
    name: '@spengrah',
    text: 'One of the most fulfilling experiences I’ve had in a long time. The opportunity to connect with, jam, and become friends with so many impressive people was a thrill and an honor.',
  },
]

const Item = (props: Datum) => {
  return (
    <ItemContent>
      <PFP src={props.imgUrl} />
      <H4>{props.name}</H4>
      <Body2>{props.text}</Body2>
    </ItemContent>
  )
}

const Content = styled(LandingSectionContent)`
  gap: 2.5rem;
  padding-bottom: 0;
`

const PFP = styled.img`
  border-radius: 50%;
  width: 64px;
  filter: drop-shadow(4px 4px 0 ${({ theme }) => theme.colors.yellow500});
`

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  gap: 2.4rem;
  padding: 2.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.yellow500};
  background-color: ${({ theme }) => theme.colors.yellow100};

  ${Body2} {
    font-size: 1.6rem;
    line-height: 2.4rem;
    flex-grow: 1;
  }

  ${({ theme }) => theme.bp.md} {
    padding-right: 5rem;
    ${PFP} {
      width: 75px;
    }
  }

  ${({ theme }) => theme.bp.lg} {
    ${PFP} {
      width: 100px;
    }
    width: 26.4rem;
    padding-bottom: 5rem;
  }
`
