import styled from 'styled-components'
import { Slideshow } from '@/components/core/gallery/Slideshow'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { Body1, H3 } from '@/components/core/Typography'
import Image from 'next/image'

export const TestimonialSection = () => {
  const { deviceSize } = useDeviceSize()

  return (
    <Content>
      <Slideshow key={deviceSize}>
        {testimonials.map((i) => (
          <Item key={i.name} imgUrl={i.imgUrl} name={i.name} text={i.text} />
        ))}
      </Slideshow>
    </Content>
  )
}

type Datum = {
  imgUrl: string
  name: string
  text: string
}

const testimonials: Datum[] = [
  {
    imgUrl: '/images/testimonial-charlie.jpg',
    name: 'Charlie',
    text: '“People who are initially strangers come together and build something together. This leaves a real sense of camaraderie and a sense of accomplishment.”',
  },
  {
    imgUrl: '/images/testimonial-estefania.jpg',
    name: 'Estefania',
    text: '“Cabin was life-changing for many reasons. The people are able to put ego aside to connect and work towards a greater good.”',
  },
  {
    imgUrl: '/images/testimonial-rudi.jpg',
    name: 'Rudi',
    text: '“All of the people I met at Cabin inspired me in different ways.”',
  },
]

const Item = (props: Datum) => {
  return (
    <StyledItem>
      <H3>{props.name}</H3>
      <TextContent>
        <PFP
          src={props.imgUrl}
          alt={props.name}
          width={400}
          height={400}
          style={{ width: '11.2rem', height: '11.2rem' }}
        />
        <Text>{props.text}</Text>
      </TextContent>
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

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  flex-shrink: 0;
  width: 31rem;
  height: 44rem;
  background-color: ${({ theme }) => theme.colors.yellow400};

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`

const PFP = styled(Image)`
  border-radius: 50%;
  width: 64px;
  filter: drop-shadow(4px 4px 0 ${({ theme }) => theme.colors.yellow500});
`

const Text = styled(Body1)`
  max-width: 42rem;
  opacity: 75%;
  text-align: center;
  padding: 0 2rem;
`
