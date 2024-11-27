import Image from 'next/image'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { Body1 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { LandingSectionTitle } from '@/components/landing/shared'
import { BaseContainer } from '@/components/core/BaseContainer'
import { acceleratorApplyClickEvent } from '@/lib/googleAnalytics/analytics'
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
        <Title>Join the Neighborhood Accelerator</Title>
        <Body>
          Make friends with your neighbors and make neighbors out of your
          friends. Our Neighborhood Accelerator Program can guide you every step
          of the way.
        </Body>
        <Buttons>
          <Link
            href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM}
            target="_blank"
            rel="noopener"
            onClick={() => acceleratorApplyClickEvent('landing-upgradesection')}
          >
            <ShakeButton variant={'primary'}>Apply</ShakeButton>
          </Link>
          <Link href={'/accelerator'}>
            <Button variant={'secondary'}>Learn more</Button>
          </Link>
        </Buttons>
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
  gap: 2.4rem;
  padding: 6.4rem 4rem;

  ${({ theme }) => theme.bp.md} {
    width: calc(50% - 2.4rem);
    padding-left: 0;
  }
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

// https://elrumordelaluz.github.io/csshake/
const ShakeButton = styled(Button)`
  animation-name: shake-slow;
  animation-duration: 5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  transform-origin: center center;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes shake-slow {
    2% {
      transform: translate(-2px, 9px) rotate(-1.5deg);
    }
    4% {
      transform: translate(-7px, 10px) rotate(2.5deg);
    }
    6% {
      transform: translate(-5px, -9px) rotate(0.5deg);
    }
    8% {
      transform: translate(-4px, 6px) rotate(-1.5deg);
    }
    10% {
      transform: translate(8px, 9px) rotate(1.5deg);
    }
    12% {
      transform: translate(10px, 5px) rotate(-1.5deg);
    }
    14% {
      transform: translate(-1px, 5px) rotate(-0.5deg);
    }
    16% {
      transform: translate(2px, -2px) rotate(-0.5deg);
    }
    18% {
      transform: translate(1px, 10px) rotate(0.5deg);
    }
    20% {
      transform: translate(9px, 5px) rotate(-1.5deg);
    }
    22% {
      transform: translate(8px, -6px) rotate(2.5deg);
    }
    24% {
      transform: translate(-5px, -5px) rotate(3.5deg);
    }
    26% {
      transform: translate(-3px, -8px) rotate(2.5deg);
    }
    28% {
      transform: translate(5px, 0px) rotate(-0.5deg);
    }
    30% {
      transform: translate(5px, -8px) rotate(3.5deg);
    }
    32% {
      transform: translate(3px, -4px) rotate(0.5deg);
    }
    34% {
      transform: translate(5px, 0px) rotate(1.5deg);
    }
    36% {
      transform: translate(8px, -3px) rotate(2.5deg);
    }
    38% {
      transform: translate(5px, 5px) rotate(2.5deg);
    }
    40% {
      transform: translate(9px, 2px) rotate(-0.5deg);
    }
    42% {
      transform: translate(6px, -7px) rotate(2.5deg);
    }
    44% {
      transform: translate(10px, -8px) rotate(3.5deg);
    }
    46% {
      transform: translate(6px, -1px) rotate(1.5deg);
    }
    48% {
      transform: translate(2px, 7px) rotate(-1.5deg);
    }
    50% {
      transform: translate(5px, 6px) rotate(1.5deg);
    }
    52% {
      transform: translate(8px, 10px) rotate(-1.5deg);
    }
    54% {
      transform: translate(-8px, 6px) rotate(-0.5deg);
    }
    56% {
      transform: translate(3px, 7px) rotate(-0.5deg);
    }
    58% {
      transform: translate(9px, 4px) rotate(2.5deg);
    }
    60% {
      transform: translate(3px, -7px) rotate(-0.5deg);
    }
    62% {
      transform: translate(-5px, 1px) rotate(3.5deg);
    }
    64% {
      transform: translate(9px, 0px) rotate(2.5deg);
    }
    66% {
      transform: translate(-1px, -4px) rotate(1.5deg);
    }
    68% {
      transform: translate(7px, -1px) rotate(-2.5deg);
    }
    70% {
      transform: translate(-5px, 5px) rotate(1.5deg);
    }
    72% {
      transform: translate(8px, 5px) rotate(2.5deg);
    }
    74% {
      transform: translate(-9px, 8px) rotate(-0.5deg);
    }
    76% {
      transform: translate(-8px, -6px) rotate(-0.5deg);
    }
    78% {
      transform: translate(-8px, 9px) rotate(-0.5deg);
    }
    80% {
      transform: translate(-8px, -2px) rotate(2.5deg);
    }
    82% {
      transform: translate(-8px, -1px) rotate(-1.5deg);
    }
    84% {
      transform: translate(-2px, 4px) rotate(0.5deg);
    }
    86% {
      transform: translate(-5px, 4px) rotate(-0.5deg);
    }
    88% {
      transform: translate(1px, 5px) rotate(-2.5deg);
    }
    90% {
      transform: translate(7px, 6px) rotate(3.5deg);
    }
    92% {
      transform: translate(-4px, 7px) rotate(-2.5deg);
    }
    94% {
      transform: translate(-6px, 10px) rotate(1.5deg);
    }
    96% {
      transform: translate(-1px, 1px) rotate(-1.5deg);
    }
    98% {
      transform: translate(-5px, 0px) rotate(1.5deg);
    }
    0%,
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }
`
