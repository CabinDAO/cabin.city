import React from 'react'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import styled from 'styled-components'
import theme from '@/styles/theme'
import { Body1, fonts, H3, H4 } from '@/components/core/Typography'
import { BaseContainer } from '@/components/core/BaseContainer'
import { SectionTitle } from '@/components/accelerator/shared'
import grin from '@/components/accelerator/team/grin.jpg'

export const TeamSection = () => {
  return (
    <Container maxWidth={100}>
      <TitleContainer>
        <SectionTitle style={{ maxWidth: '65rem' }}>Team</SectionTitle>
      </TitleContainer>

      <Section>
        {team.map((person) => (
          <Link
            key={person.name}
            target={'_blank'}
            rel={'noopener'}
            href={person.url}
          >
            <PersonContent>
              <PersonImage>
                <Image
                  src={person.image.src}
                  alt={person.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    // borderRadius: '10%',
                    objectFit: 'cover',
                  }}
                />
              </PersonImage>
              <Name>{person.name}</Name>
              <Title>{person.title}</Title>
            </PersonContent>
          </Link>
        ))}
      </Section>
    </Container>
  )
}

type Person = {
  name: string
  title: string
  image: StaticImageData
  url: string
}

const team: Person[] = [
  {
    name: 'Jon',
    title: 'Founder',
    image: grin,
    url: 'https://jonhillis.com',
  },
  {
    name: 'Savannah',
    title: 'NAP Steward',
    image: grin,
    url: 'https://twitter.com/gptbrooke',
  },
  {
    name: 'Grin',
    title: 'Tech Lead',
    image: grin,
    url: 'https://grin.io',
  },
  {
    name: 'Kaela',
    title: 'Marketing & Community Growth',
    image: grin,
    url: 'https://jonhillis.com',
  },
  {
    name: 'Shani',
    title: 'Mentor',
    image: grin,
    url: 'https://twitter.com/gptbrooke',
  },
  {
    name: 'Liam',
    title: 'Mentor',
    image: grin,
    url: 'https://twitter.com/gptbrooke',
  },
  {
    name: 'Priya',
    title: 'Mentor',
    image: grin,
    url: 'https://twitter.com/gptbrooke',
  },
  {
    name: 'Bethany',
    title: 'Mentor',
    image: grin,
    url: 'https://www.bethanycrystal.com',
  },
]

const Container = styled(BaseContainer)`
  gap: 4rem;
  margin-bottom: 2rem;

  ${H3}, ${Body1} {
    color: ${({ theme }) => theme.colors.yellow100};
  }

  ${Body1} {
    font-weight: 400;
    line-height: 1.4;
  }

  ${({ theme }) => theme.bp.md} {
    gap: 6rem;
  }
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 8rem;
  }
`

const PersonContent = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`

const PersonImage = styled.div`
  width: 18rem;
  height: 18rem;
`

const Name = styled(Body1)`
  color: ${({ theme }) => theme.colors.green800} !important;
  text-align: center;
  font-weight: 600 !important;
`

const Title = styled(Body1)`
  color: ${({ theme }) => theme.colors.green800} !important;
  text-align: center;
`
