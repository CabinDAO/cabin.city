import Link from 'next/link'
import styled from 'styled-components'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { LandingSectionTitle } from '@/components/landing/shared'
import { Body1, H4 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'

export const ValuesSection = () => {
  return (
    <>
      <LandingSectionTitle>What we believe</LandingSectionTitle>
      <Subtitle>
        Our community shares three Obvious Truths. Most people agree with these
        beliefs—but we don’t just talk about our ideals, we live them.
      </Subtitle>

      <Content>
        <Value>
          <ValueTitle>Live Near Friends </ValueTitle>
          <ValueBody>
            We are our best selves when we live near people we admire. We make a
            habit of turning our neighbors into friends and our friends into
            neighbors.
          </ValueBody>
        </Value>
        <Value>
          <ValueTitle>It Takes A Village</ValueTitle>
          <ValueBody>
            It takes a village to raise kids—and it takes kids to raise a
            village. Whether you have kids or not, we believe that
            intergenerational neighborhoods make us all better people.
          </ValueBody>
        </Value>
        <Value>
          <ValueTitle>Touch Grass</ValueTitle>
          <ValueBody>
            We spend time online, but we believe that unplugging from technology
            and being present with people and nature is good for our well being.
            Together, we grow our local communities towards a resilient,
            regenerative, abundant future.
          </ValueBody>
        </Value>
      </Content>

      <Link href={EXTERNAL_LINKS.VISION} target="_blank" rel="noreferer">
        <Button variant={'tertiary'}>More about our Network City vision</Button>
      </Link>
    </>
  )
}

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
