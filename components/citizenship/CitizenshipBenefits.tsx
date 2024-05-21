import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme, { padding } from '@/styles/theme'
import Icon, { IconName } from '@/components/core/Icon'
import { Body1, H2, H3 } from '@/components/core/Typography'
import { HorizontalDivider } from '@/components/core/Divider'

export default function CitizenshipBenefits({
  suggestHide,
}: {
  suggestHide: boolean
}) {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    setIsHidden(suggestHide)
  }, [suggestHide, setIsHidden])

  return (
    <Container>
      <HeaderWrap>
        <Header onClick={() => setIsHidden(!isHidden)}>Citizen Benefits</Header>
      </HeaderWrap>
      <Rows hidden={isHidden}>
        <Row>
          <RowHeader>
            <Icon name={'check'} size={1.6} />
            Connect with Citizens around the world
          </RowHeader>
          <Items>
            <Item icon={'network-globe'}>
              20+ properties and 300+ people in dozens of countries
            </Item>
            <Item icon={'moon-stars'}>
              7 free nights at the Citizen's Clubhouse at Neighborhood Zero
            </Item>
            <Item icon={'business-handshake'}>
              Join us for our seasonal gatherings
            </Item>
          </Items>
        </Row>
        <HorizontalDivider />
        <Row>
          <RowHeader>
            <Icon name={'check'} size={1.6} />
            Participate in our community
          </RowHeader>
          <Items>
            <Item icon={'coin'}>25 ₡ABIN + 10 ₡ per referral</Item>
            <Item icon={'chat-bubble'}>
              Vouch for others to become Citizens
            </Item>
            <Item icon={'takeout'}>
              $450 reimbursement for hosting Supper Clubs
            </Item>
            <Item icon={'flag'}>
              Become the founder of a Cabin neighborhood
            </Item>
          </Items>
        </Row>
        <HorizontalDivider />
        <Row>
          <RowHeader>
            <Icon name={'check'} size={1.6} />
            Get Citizen benefits
          </RowHeader>
          <Items>
            <Item icon={'passport'}>
              Physical passport and numbered Citizen NFT
            </Item>
            <Item icon={'shirt'}>Welcome package and merch drops</Item>
            <Item icon={'ticket'}>Tickets to conferences and events</Item>
            <Item icon={'discount'}>Partnership discounts and perks</Item>
          </Items>
        </Row>
      </Rows>
    </Container>
  )
}

function Item({
  icon,
  children,
}: {
  icon: IconName
  children: React.ReactNode
}) {
  return (
    <StyledItem>
      <Icon
        name={icon}
        size={3}
        color={'green500'}
        style={{
          backgroundColor: theme.colors.green800,
          borderRadius: '50%',
          padding: '0.6rem',
        }}
      />
      <Body1>{children}</Body1>
    </StyledItem>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4rem;
  ${padding('md', 'sm')};
`

const HeaderWrap = styled.div`
  border-bottom: solid 1px rgba(24, 42, 43, 0.25);
`

const Header = styled(H2)`
  display: inline-block;
  border: solid 1px rgba(24, 42, 43, 0.25);
  border-bottom: 0; // wrap fills in this one
  padding: 1rem;
  margin-bottom: -1px;
  cursor: pointer;
`

const Rows = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  flex-direction: column;
  width: 100%;
  gap: 3.6rem;
  transition: all 1s ease-in-out;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 3rem;
  justify-content: space-between;
  align-items: flex-start;
`

const RowHeader = styled(H3)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 1rem;
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.6rem;
  flex: 1;
`
