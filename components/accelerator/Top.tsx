import React from 'react'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { Body1, fonts, H2, HHero } from '@/components/core/Typography'
import { TopLogoSection } from '@/components/landing/TopLogoSection'
import { Countdown } from '@/components/core/Countdown'
import { Button } from '@/components/core/Button'

export const Top = () => {
  return (
    <OpaqueDiv>
      <TopLogoSection />
      <Content>
        <HeaderText>
          Build the neighborhood where you’d want to grow up
        </HeaderText>
        <SubheaderText>The Cabin Neighborhood Accelerator</SubheaderText>
        <Body1 style={{ color: 'white' }}>
          Our next program begins on September 23
        </Body1>
        <Countdown target={new Date('2024-09-23')} />
        <Buttons>
          <Link
            key="1"
            href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM}
          >
            <Button>Apply</Button>
          </Link>
        </Buttons>
      </Content>
    </OpaqueDiv>
  )
}

const OpaqueDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  gap: 2.4rem;
  padding: 4rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  gap: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 67rem;
  }
`

const HeaderText = styled(HHero)`
  width: 28.8rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.7),
    3px 3px 6px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    font-size: 4rem;
    line-height: 1.25;
  }
`

const SubheaderText = styled(H2)`
  width: 28.8rem;
  text-align: center;
  font-family: ${fonts.poppins};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.7),
    3px 3px 6px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    //font-size: 4rem;
    line-height: 1.5;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    align-items: center;
    text-align: center;
    gap: 1.6rem;
  }
`
