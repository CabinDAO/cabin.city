import Image from 'next/image'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { Body1, H3 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { LandingSectionTitle } from '@/components/landing/shared'
import { BaseContainer } from '@/components/core/BaseContainer'
import pic from './supperclub.jpg'

export const SupperClubSection = () => {
  return (
    <Container maxWidth={'full'}>
      <Image
        src={pic}
        alt={'Intro Cabin Event'}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      <Text>
        <TextChunk>
          <Title>Join the Neighborhood Accelerator Program</Title>
          <Body>
            Make friends with your neighbors and make neighbors out of your
            friends. Our Neighborhood Accelerator Program can guide you every
            step of the way.
          </Body>
          <Buttons>
            <Link href="https://nap.community" target="_blank" rel="noopener">
              <Button variant={'primary'}>Learn More</Button>
            </Link>
          </Buttons>
        </TextChunk>
        {/* <TextChunk>
          <H3>Join Our Next Community Call:</H3>
          <Title>The Neighborhood Story Circle</Title>
          <Body>
            4th Thursday of Each Month <br />
            at 9am PST / 11am ET / 6pm CET
          </Body>
          <Buttons>
            <Link href={EXTERNAL_LINKS.LUMA} target="_blank" rel="noopener">
              <Button variant={'secondary'}>RSVP</Button>
            </Link>
          </Buttons>
        </TextChunk> */}
      </Text>
    </Container>
  )
}

const Container = styled(BaseContainer)`
  align-items: center;
  justify-content: center;

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
  gap: 6rem;
  padding: 6.4rem 4rem;

  ${({ theme }) => theme.bp.md} {
    width: calc(50% - 2.4rem);
    padding-left: 0;
  }
`

const TextChunk = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`

const Title = styled(LandingSectionTitle)`
  ${({ theme }) => theme.bp.lg} {
    max-width: 30rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 44rem;
  }
`

const Body = styled(Body1)`
  opacity: 0.75;

  ${({ theme }) => theme.bp.lg} {
    max-width: 30rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 44rem;
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
