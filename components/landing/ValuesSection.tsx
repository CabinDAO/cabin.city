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
        <Value>
          <ValueTitle>Live Near Friends </ValueTitle>
          <ValueBody>
            We are our best selves when we live with people we admire. Thanks to
            the internet, we can connect with like-minded individuals online and
            come together in-person to deepen relationships.
          </ValueBody>
        </Value>
        <Value>
          <ValueTitle>Create Together</ValueTitle>
          <ValueBody>
            Co-creation builds trust among collaborators through transparency
            and empowerment. We practice a culture of cooperation, reciprocity,
            and do-ocracy.
          </ValueBody>
        </Value>
        <Value>
          <ValueTitle>Touch Grass</ValueTitle>
          <ValueBody>
            We spend time online, but we believe that unplugging from technology
            and being present with people and nature is good for our well being.
            Together, we grow regenerative local communities towards a
            resilient, sustainable, abundant future.
          </ValueBody>
        </Value>
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
  font-size: 2rem;
  width: 100%;
  margin-bottom: 2rem;

  ${({ theme }) => theme.bp.md} {
    width: 45rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 70rem;
  }
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
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
  background-color: white;
  border: solid 1px #000;
  box-shadow: 4px 4px 0px 0px #000;
  padding: 2rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    padding: 6rem;
  }
`

const ValueTitle = styled(H4)`
  font-size: 3.2rem;
  line-height: 120%; /* 3.84rem */
  font-weight: 600;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
  }
`

const ValueBody = styled(Body1)`
  opacity: 0.75;
  line-height: 1.5;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
  }
`
