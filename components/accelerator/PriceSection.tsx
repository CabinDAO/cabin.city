import React from 'react'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { ApplyButton, SectionTitle } from '@/components/accelerator/shared'
import Icon from '@/components/core/Icon'
import { Body1, fonts } from '@/components/core/Typography'
import { HorizontalDivider } from '@/components/core/Divider'
import { WideContainer } from '@/components/core/WideContainer'
import { Countdown } from '@/components/accelerator/Countdown'

const items = [
  'Build a thriving, connected community in your neighborhood',
  'Create lasting, meaningful relationships with your neighbors',
  'Live within walking distance of friends + family and make hanging out effortless',
  'Solve local problems and build things with a group of engaged friends & neighbors',
  'Foster a shared sense of ownership and pride in your area',
]

export const PriceSection = () => {
  return (
    <Container maxWidth={'80rem'}>
      <SectionTitle>Ready to transform your neighborhood?</SectionTitle>
      <Box>
        <Items>
          {items.map((item, index) => (
            <Item key={index}>
              <Checkmark>
                <Icon name={'check'} size={3} color={'green700'} />
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
              Scholarships are available. If money is preventing you from
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
            <ApplyButton source={'accelerator-price'} />
          </Right>
        </BoxBottom>
      </Box>
      <RefundBox>
        <CheckCircle>
          <Icon name={'check-star'} size={2.4} color={'green900'} />
        </CheckCircle>
        <Body1>
          If you’re not 100% satisfied within the first 14 days, you can request
          a full refund.
        </Body1>
      </RefundBox>
    </Container>
  )
}

const Container = styled(WideContainer)`
  align-items: center;
  gap: 4rem;
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
  justify-content: space-between;
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
  justify-content: space-between;
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
  background-color: ${({ theme }) => theme.colors.yellow400};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;
`

const Price = styled.span`
  font-family: ${fonts.inter};
  font-size: 3.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.green900};
`
