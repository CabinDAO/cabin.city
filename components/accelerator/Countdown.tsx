import styled from 'styled-components'
import BaseCountdown, { CountdownRenderProps } from 'react-countdown'
import { fonts } from '@/components/core/Typography'

export const Countdown = ({ target }: { target: Date }) => {
  return (
    // https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning
    <Container suppressHydrationWarning={true}>
      <BaseCountdown
        date={target}
        renderer={({
          days,
          hours,
          minutes,
          seconds,
          completed,
        }: CountdownRenderProps) => {
          return `${days} days : ${hours} hrs : ${minutes} mins : ${seconds} sec`
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  color: ${({ theme }) => theme.colors.yellow100};
  font-family: ${fonts.ibmPlexMono};
  font-size: 1.4rem;
`
