import React from 'react'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { Body1, fonts, H2, HHero } from '@/components/core/Typography'
import { TopLogoSection } from '@/components/landing/TopLogoSection'
import { Button } from '@/components/core/Button'

export const Top = () => {
  return (
    <OpaqueDiv>
      <TopLogoSection />
      <Content>
        <HeaderText>
          Turn your neighborhood into a thriving community
        </HeaderText>
        <SubheaderText>Join the Cabin Neighborhood Accelerator</SubheaderText>
        <SubheaderText>Application Deadline: September 8, 2024</SubheaderText>
        {/*<Body1 style={{ color: 'white' }}>*/}
        {/*  Application Deadline: September 8, 2024*/}
        {/*</Body1>*/}
        {/*<Countdown target={new Date('2024-09-23')} />*/}
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
  background-color: rgba(0, 0, 0, 0.3);
  gap: 2.4rem;
  padding: 4rem;
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  gap: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
    margin-bottom: 8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 67rem;
    margin-bottom: 12rem;
  }
`

const HeaderText = styled(HHero)`
  width: 40rem;
  text-align: center;
  font-size: 4.4rem;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.7),
    3px 3px 6px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    font-size: 5rem;
    line-height: 1.25;
  }
`

const SubheaderText = styled(H2)`
  width: 30rem;
  text-align: center;
  font-family: ${fonts.poppins};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.7),
    3px 3px 6px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);
  font-size: 2.5rem;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    font-size: 3rem;
    line-height: 1.4;
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
