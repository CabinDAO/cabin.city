import React, { ReactNode } from 'react'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { ApplyButton, SectionTitle } from '@/components/accelerator/shared'
import Icon from '@/components/core/Icon'
import {
  Body1,
  fonts,
  H3,
  ListItem,
  UnorderedList,
} from '@/components/core/Typography'
import { HorizontalDivider } from '@/components/core/Divider'
import { BaseContainer } from '@/components/core/BaseContainer'
import { Countdown, deadlineToString } from '@/components/accelerator/Countdown'

const priceOptions = [
  {
    name: 'Full Scholarship',
    price: 0,
    details: (
      <>
        <Body1>We offer full scholarships to</Body1>
        <UnorderedList>
          <ListItem>individuals earning under $30k annually</ListItem>
          <ListItem>students and recent graduates</ListItem>
        </UnorderedList>
        <Body1>No one will be turned away for lack of funds.</Body1>
        <Body1>
          Includes a commitment to provide weekly feedback to help us improve
          the program.
        </Body1>
      </>
    ),
  },
  {
    name: 'Accessible Rate',
    price: 350,
    details: (
      <>
        <Body1>This tier is for</Body1>
        <UnorderedList>
          <ListItem>individuals earning $30k-$100k annually</ListItem>
          <ListItem>early-career professionals</ListItem>
          <ListItem>part-time workers</ListItem>
        </UnorderedList>
        <Body1>
          Includes a commitment to provide weekly feedback to help us improve
          the program.
        </Body1>
      </>
    ),
  },
  {
    name: 'Standard Rate',
    price: 650,
    details: (
      <>
        <Body1>This tier is for</Body1>
        <UnorderedList>
          <ListItem>individuals earning $100k+ annually</ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    name: 'Sponsored Rate',
    price: 1000,
    details: (
      <>
        <Body1>This tier is for</Body1>
        <UnorderedList>
          <ListItem>
            folks utilizing Professional Development funding from their place of
            work
          </ListItem>
          <ListItem>
            organizations generously sponsoring seats in the program
          </ListItem>
        </UnorderedList>
      </>
    ),
  },
]

export const PriceSection = () => {
  return (
    <Container maxWidth={110}>
      <SectionTitle>Ready to transform your neighborhood?</SectionTitle>
      <Box>
        <Prices>
          {priceOptions.map(({ name, price, details }) => (
            <PriceOption
              key={name}
              name={name}
              price={price}
              details={details}
            />
          ))}
        </Prices>
        <Bottom>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}
          >
            <Body1 style={{ fontWeight: 700, fontSize: '2rem' }}>
              Application deadline: {deadlineToString()}
            </Body1>
            <Countdown />
          </div>
          <ApplyButton source={'accelerator-price'} jiggle />
        </Bottom>
      </Box>
      <RefundBox>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.6rem',
            alignItems: 'center',
          }}
        >
          <CheckCircle>
            <Icon name={'check-star'} size={2.4} color={'green900'} />
          </CheckCircle>
          <Body1>
            If you’re not 100% satisfied within the first 14 days, you can
            request a full refund.
          </Body1>
        </div>
        <Body1>
          Have additional questions?{' '}
          <Link
            href={`mailto:${EXTERNAL_LINKS.ACCELERATOR_EMAIL}`}
            style={{ textDecoration: 'underline', whiteSpace: 'nowrap' }}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            Email us
          </Link>
          .
        </Body1>
      </RefundBox>
    </Container>
  )
}

const Container = styled(BaseContainer)`
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
`

const Prices = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 2.5rem;
  padding: 3.5rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const RefundBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 6rem;
  padding: 1rem;
  opacity: 80%;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.bp.lg} {
    justify-content: space-between;
  }
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

const PriceOption = ({
  name,
  price,
  details,
}: {
  name: string
  price: number
  details: ReactNode
}) => {
  return (
    <StyledPriceOption>
      <H3>{name}</H3>
      <Price>${price}</Price>
      <HorizontalDivider />
      {details}
    </StyledPriceOption>
  )
}

const StyledPriceOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-bottom: solid 1px ${({ theme }) => theme.colors.green900};
  padding: 3.5rem;

  ${({ theme }) => theme.bp.lg} {
    width: 25%;
    &:not(:last-child) {
      border-right: solid 1px ${({ theme }) => theme.colors.green900};
    }
  }
`
