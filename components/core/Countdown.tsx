import styled from 'styled-components'
import BaseCountdown, { CountdownRenderProps } from 'react-countdown'

export const Countdown = ({ target }: { target: Date }) => {
  return (
    <Container>
      <BaseCountdown
        date={target}
        renderer={({
          days,
          hours,
          minutes,
          seconds,
          completed,
        }: CountdownRenderProps) => {
          return (
            <>
              <Place>
                <Number>{days}</Number>
                <span>days</span>
              </Place>
              <Place>
                <Number>{hours}</Number>
                <span>hours</span>
              </Place>
              <Place>
                <Number>{minutes}</Number>
                <span>mins</span>
              </Place>
              <Place>
                <Number>{seconds}</Number>
                <span>secs</span>
              </Place>
            </>
          )
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  background-color: ${({ theme }) => theme.colors.yellow200};
  padding: 2rem;
  border-radius: 1rem;
`

const Place = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  font-size: 2rem;
`

const Number = styled.div`
  display: flex;
  width: 5.5rem;
  height: 5.5rem;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.yellow300};
  border-radius: 1rem;
  font-weight: 700;
  font-size: 2.4rem;
`
