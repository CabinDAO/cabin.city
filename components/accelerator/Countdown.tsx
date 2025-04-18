import styled from 'styled-components'
import BaseCountdown, { CountdownRenderProps } from 'react-countdown'
import { fonts } from '@/components/core/Typography'

const timezone = 'America/Los_Angeles'
const utcToPstOffset = new Date()
  .toLocaleString('en-US', { timeZone: timezone })
  .includes('PDT')
  ? 7
  : 8

// midnight in pst
export const DEADLINE = new Date(`2025-05-23T0${utcToPstOffset - 1}:59:59Z`)

export const deadlineToString = () => {
  // get the day of the month in pst so it says the right date no matter what timezone the user is in
  const day = new Date(
    DEADLINE.toLocaleString('en-US', { timeZone: timezone })
  ).getDate()
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
      timeZone: timezone,
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
