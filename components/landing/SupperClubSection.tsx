import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Body1, H4, Subline1 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { EXTERNAL_LINKS } from '@/utils/external-links'

import pic from './people-circle-mountains.jpg'

export const SupperClubSection = () => {
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
          <Subline1>Supper Club</Subline1>
          <Title>
            You can’t build a city if you’ve never hosted a dinner party.
          </Title>
          <Body>
            Supper Club is the kindling to our fire, a get together with friends
            to grow community, discuss your favorite topics, and start fanning
            the flame of new ways of living.
          </Body>
          <Buttons>
            <Link href={EXTERNAL_LINKS.SUPPER_CLUB_LUMA}>
              <Button variant={'primary'}>Attend a Supper Club</Button>
            </Link>
            <Link href={'mailto:home@cabin.city'}>
              <Button variant={'secondary'}>Become a host</Button>
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
