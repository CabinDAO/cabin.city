import React from 'react'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import styled from 'styled-components'
import { Body1, H3 } from '@/components/core/Typography'
import { BaseContainer } from '@/components/core/BaseContainer'
import { SectionTitle } from '@/components/accelerator/shared'

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
                  src={
                    typeof person.image === 'string'
                      ? person.image
                      : person.image.src
                  }
                  alt={person.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    // borderRadius: '10%',
                    objectFit: 'cover',
                    aspectRatio: '1 / 1',
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
  image: StaticImageData | string
  url: string
}

const team: Person[] = [
  {
    name: 'Savannah',
    title: 'Steward',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/4edd1213-fab8-425f-0d54-0d6e07052600/public',
    url: 'https://x.com/savkruger',
  },
  {
    name: 'Kaela',
    title: 'Contributor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/8e5d4ff6-52e8-49d4-f944-35ccf4a4b900/public',
    url: 'https://x.com/findkaela',
  },
  {
    name: 'Shani',
    title: 'Contributor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/7ac4f182-9aac-4e17-0e36-450a0dc55200/public',
    url: 'https://cabin.city/n/west-beacy-bunch',
  },
  {
    name: 'Forest',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/01f5a055-2f13-472d-c38f-71c44c6cac00/public',
    url: 'https://cabin.city/location/lc_cSi4Kqj6vS9gyihtYduH',
  },
  {
    name: 'David',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/8a3909b6-d76a-4827-0fcc-b7aad01fda00/public',
    url: 'https://cabin.city/location/lc_xSWNKaojNUTfybNXAYDJ',
  },
  {
    name: 'Zu',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/fc73d0a5-b3ae-4a3a-062f-dbdcc9db7300/public',
    url: 'https://supernuclear.substack.com/p/case-study-merlins-place',
  },
  {
    name: 'Graham',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/1443e6dc-2971-4567-926d-7753ad8adf00/public',
    url: 'https://warpcast.com/mcbain',
  },
  {
    name: 'Liam',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/1a266c0d-ca0a-48ba-da6b-1ee1987c9700/public',
    url: 'https://liamrosen.com',
  },
  {
    name: 'Stephanie',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/61b72936-5b0e-42df-ddb5-d0117193fb00/public',
    url: 'https://www.linkedin.com/in/stephanie-klebba-17325916/',
  },
  {
    name: 'Priya',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/947c3b26-784e-43db-4eaa-f241ac398c00/public',
    url: 'https://x.com/prigoose',
  },
  {
    name: 'Bethany',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/2243d97d-ccaf-4e00-2314-cf3db22aa800/public',
    url: 'https://www.bethanycrystal.com',
  },
  {
    name: 'Trish',
    title: 'Mentor',
    image:
      'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/932b9713-c107-4ad8-d972-ad7aeaeff400/public',
    url: 'https://x.com/trishyloulou',
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
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 8rem;
  justify-content: center;
  align-items: center;
  gap: 4rem;
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
