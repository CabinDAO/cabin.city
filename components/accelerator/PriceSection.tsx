import React from 'react'
import Link from 'next/link'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { AcceleratorSectionTitle } from '@/components/accelerator/AcceleratorPageView'
import Icon from '@/components/core/Icon'
import { Body1, fonts } from '@/components/core/Typography'
import { HorizontalDivider } from '@/components/core/Divider'
import { Countdown } from '@/components/accelerator/Countdown'
import { Button } from '@/components/core/Button'

const items = [
  'Build a thriving, connected community in your neighborhood',
  'Create lasting, meaningful relationships with your neighbors',
  'Live within walking distance of friends + family and make hanging out effortless',
  'Solve local problems and build things with a group of engaged friends & neighbors',
  'Foster a shared sense of ownership and pride in your area',
]

export const PriceSection = () => {
  const { deviceSize } = useDeviceSize()
  return (
    <Container>
      <AcceleratorSectionTitle>
        Ready to transform your neighborhood?
      </AcceleratorSectionTitle>
      <Box>
        <Items>
          {items.map((item, index) => (
            <Item key={index}>
              <Checkmark>
                <Icon name={'check'} size={3} color={'green400'} />
              </Checkmark>
              <Body1>{item}</Body1>
            </Item>
          ))}
        </Items>
        <HorizontalDivider />
        <BoxBottom>
          <Left>
            <Price>$400</Price>
            <Body1>
              Scholarships are very available. If money is preventing you from
              applying, please{' '}
              <Link
                href={`mailto:${EXTERNAL_LINKS.ACCELERATOR_EMAIL}`}
                style={{ textDecoration: 'underline' }}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                email us
              </Link>
              .
            </Body1>
          </Left>
          <Right>
            <Countdown />
            <Link
              href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM}
              target="_blank"
              rel="noopener"
            >
              <Button variant={'primary'} isFullWidth={deviceSize === 'mobile'}>
                Apply
              </Button>
            </Link>
          </Right>
        </BoxBottom>
      </Box>
      <RefundBox>
        <CheckCircle>
          <Icon name={'check-star'} size={2.4} color={'green400'} />
        </CheckCircle>
        <Body1>
          If you’re not 100% satisfied within the first 14 days, you can request
          a full refund.
        </Body1>
      </RefundBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 45rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.5rem;
  background-color: white;
  border: solid 1px #000;
  box-shadow: 4px 4px 0px 0px #000;
  padding: 3.5rem;
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 2.8rem;

  ${({ theme }) => theme.bp.lg} {
    flex-flow: row wrap;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.4rem;

  ${({ theme }) => theme.bp.lg} {
    width: 45%;
  }
`

const BoxBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.5rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.lg} {
    width: 50%;
    flex-shrink: 0;
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    width: 40%;
    flex-shrink: 0;
    align-items: flex-end;
    justify-content: center;
  }
`

const RefundBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  padding: 1rem;
  opacity: 80%;
  align-items: center;
  justify-content: center;
`

const Checkmark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
`

const CheckCircle = styled.div`
  background-color: ${({ theme }) => theme.colors.green900};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  flex-shrink: 0;
`

const Price = styled.span`
  font-family: ${fonts.inter};
  font-size: 3.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.green900};
`
