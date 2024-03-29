import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Body1, H4, Subline1 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { EXTERNAL_LINKS } from '@/utils/external-links'

import pic from './supperclub.jpg'

export const SupperClubSection = () => {
  return (
    <>
      <Content>
        <Image
          src={pic}
          alt={'Intro Cabin Experience'}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        <Text>
          <Subline1>Get started</Subline1>
          <Title>Make meaningful connections in the Cabin community</Title>
          <Body>
            Supper Club is the kindling to our fire. Get together with friends
            to grow community, discuss your favorite topics, and start fanning
            the flame of new ways of living.
          </Body>
          <Buttons>
            <Link href={EXTERNAL_LINKS.SUPPER_CLUB_LUMA}>
              <Button variant={'primary'}>Attend a Supper Club</Button>
            </Link>
            <Link href={EXTERNAL_LINKS.SUPPER_CLUB_INFO}>
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
    max-height: 700px;
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
  margin-top: 1.6rem;

  ${({ theme }) => theme.bp.md_max} {
    flex-direction: column;
    width: 100%;
    * {
      width: 100%;
    }
  }
`
