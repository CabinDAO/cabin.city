import styled from 'styled-components'
import BaseCountdown, { CountdownRenderProps } from 'react-countdown'
import { fonts } from '@/components/core/Typography'

export const DEADLINE = new Date('2025-02-01T07:00:00Z')

export const deadlineToString = () => {
  const day = DEADLINE.getDate()
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th'
  return (
    DEADLINE.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    }) + suffix
  )
}

export const Countdown = ({ light = false }: { light?: boolean }) => {
  const deadlinePassed = new Date() > DEADLINE

  if (deadlinePassed) return null

  return (
    // https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning
    <Container suppressHydrationWarning={true} light={light}>
      <BaseCountdown
        date={DEADLINE}
        renderer={({
          // completed,
          days,
          hours,
          minutes,
          seconds,
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
