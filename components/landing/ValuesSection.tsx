import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Body1, H2, H4, fonts } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import value1 from './value1.jpg'
import value2 from './value2.jpg'
import value3 from './value3.jpg'

export const ValuesSection = () => {
  return (
    <>
      <Title>What we believe</Title>
      <Subtitle>
        Our community shares three obvious truths. Most people agree with these
        beliefs—but we don’t just talk about our ideals, we live them.
      </Subtitle>
      <Content>
        <Value style={{ gridArea: 'a' }}>
          <ValueTitle>Live Near Friends </ValueTitle>
          <ValueBody>
            We are our best selves when we live with people we admire. Thanks to
            the internet, we can connect with like-minded individuals online and
            come together in-person to deepen relationships.
          </ValueBody>
        </Value>

        <Image
          src={value1}
          alt={'Value One'}
          style={{
            gridArea: 'b',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />

        <Value style={{ gridArea: 'c' }}>
          <ValueTitle>Create Together</ValueTitle>
          <ValueBody>
            Co-creation builds trust among collaborators through transparency
            and empowerment. We practice a culture of cooperation, reciprocity,
            and do-ocracy.
          </ValueBody>
        </Value>

        <Image
          src={value2}
          alt={'Value Two'}
          // fill={true}
          style={{
            gridArea: 'd',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />

        <Value style={{ gridArea: 'e' }}>
          <ValueTitle>Touch Grass</ValueTitle>
          <ValueBody>
            We spend time online, but we believe that unplugging from technology
            and being present with people and nature is good for our well being.
            Together, we grow regenerative local communities towards a
            resilient, sustainable, abundant future.
          </ValueBody>
        </Value>

        <Image
          src={value3}
          alt={'Value Three'}
          // fill={true}
          style={{
            gridArea: 'f',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </Content>

      <Link href={EXTERNAL_LINKS.PRINCIPLES} target="_blank" rel="noreferer">
        <Button variant={'tertiary'}>View our guiding principles</Button>
      </Link>
    </>
  )
}

const Title = styled(H2)`
  font-family: ${fonts.inter};
  font-size: 3.2rem;
`

const Subtitle = styled(Body1)`
  text-align: center;
  font-size: 2.2rem;
  max-width: 75rem;
  margin-bottom: 2rem;
`

const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template: repeat(3, auto 1fr) / 100%;
  grid-template-areas:
    'a'
    'b'
    'c'
    'd'
    'e'
    'f';
  row-gap: 2.4rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
    row-gap: 6.4rem;
    column-gap: 2.4rem;
    grid-template: repeat(3, 1fr) / 50% 50%;
    grid-template-areas:
      'a b'
      'd c'
      'e f';
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`

const Value = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.sm_max} {
    &:not(:first-of-type) {
      margin-top: 6.4rem;
    }
  }

  ${({ theme }) => theme.bp.lg} {
    &:nth-of-type(2n) {
      padding-left: 4rem;
    }
    &:nth-of-type(2n-1) {
      padding-right: 4rem;
    }
  }
`

const ValueTitle = styled(H4)`
  font-size: 3.2rem;
  line-height: 120%; /* 3.84rem */
  font-weight: 600;
`

const ValueBody = styled(Body1)`
  opacity: 0.75;
`
