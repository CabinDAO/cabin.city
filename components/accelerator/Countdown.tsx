import styled from 'styled-components'
import BaseCountdown, { CountdownRenderProps } from 'react-countdown'
import { fonts } from '@/components/core/Typography'

export const Countdown = ({ light = false }: { light?: boolean }) => {
  return (
    // https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning
    <Container suppressHydrationWarning={true} light={light}>
      <BaseCountdown
        date={new Date('2024-09-08')}
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

const Container = styled.div<{ light: boolean }>`
  color: ${({ theme, light }) =>
    light ? theme.colors.yellow100 : theme.colors.green900};
  font-family: ${fonts.ibmPlexMono};
  font-size: 1.4rem;
`
