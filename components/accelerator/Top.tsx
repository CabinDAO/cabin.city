import React from 'react'
import styled from 'styled-components'
import { fonts, HHero } from '@/components/core/Typography'
import { TopLogoSection } from '@/components/landing/TopLogoSection'
import { ApplyButton } from '@/components/accelerator/shared'
import { DEADLINE, deadlineToString } from '@/components/accelerator/Countdown'

export const Top = () => {
  return (
    <OpaqueDiv>
      <TopLogoSection />
      <Content>
        <HeaderText>
          Turn your neighborhood into a thriving community
        </HeaderText>
        <Subheader>
          <SubheaderText>
            <p>Join the Cabin Neighborhood Accelerator</p>
            {new Date() < DEADLINE && (
              <p>Application Deadline: {deadlineToString()}</p>
            )}
          </SubheaderText>
          <ApplyButton
            source={'accelerator-top'}
            style={{ padding: '2rem 2.4rem', fontSize: '1.7rem' }}
          />
        </Subheader>
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
  padding: 0 5rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
    margin-bottom: 8rem;
    padding: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 73rem;
    margin-bottom: 12rem;
  }
`

const HeaderText = styled(HHero)`
  text-align: center;
  font-size: 4.5rem;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.7),
    3px 3px 6px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    font-size: 5.5rem;
    line-height: 1.25;
  }
`

const Subheader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 4rem;
  }
`

const SubheaderText = styled.div`
  font-family: ${fonts.poppins};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.7),
    3px 3px 6px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  p {
    text-align: center;
  }

  ${({ theme }) => theme.bp.md} {
    p {
      text-align: left;
    }
  }
`
