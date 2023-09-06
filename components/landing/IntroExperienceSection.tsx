import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Body1, H4, Subline1 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { EXTERNAL_LINKS } from '@/utils/external-links'

import pic from './people-circle-mountains.jpg'

export const IntroExperienceSection = () => {
  return (
    <>
      <Content>
        <Image
          src={pic}
          alt={'Intro Cabin Experience'}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />

        <Text style={{ gridArea: 'c' }}>
          <Subline1>Getting started</Subline1>
          <Title>Attend an Intro Cabin Experience</Title>
          <Body>
            These 1-2 week long events are our official welcome to the Cabin
            community and a taste of coliving grounded in collaboration,
            connection, and contribution.
          </Body>
          <Buttons>
            <Link href={EXTERNAL_LINKS.CABIN_WEEK_BOOKING_TYPEFORM}>
              <Button variant={'primary'}>Join a Cabin Week</Button>
            </Link>
            <Link href={'/cabin-week'}>
              <Button variant={'secondary'}>Learn more</Button>
            </Link>
          </Buttons>
        </Text>
      </Content>
    </>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 4rem;
    img {
      width: 50%;
    }
  }

  ${({ theme }) => theme.bp.lg} {
    gap: 8rem;
  }
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
  padding: 6.4rem 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
    padding-left: 0;
  }
`

const Title = styled(H4)`
  font-size: 3.2rem;
  line-height: 120%; /* 3.84rem */
  font-weight: 600;

  ${({ theme }) => theme.bp.lg} {
    max-width: 30rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 42rem;
  }
`

const Body = styled(Body1)`
  opacity: 0.75;

  ${({ theme }) => theme.bp.lg} {
    max-width: 30rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 42rem;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.8rem;
`
