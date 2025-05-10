import React from 'react'
import { expandRoute } from '@/utils/routing'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import analytics from '@/lib/googleAnalytics/analytics'
import styled from 'styled-components'
import { H3, Subline2, hhStyles } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { AppLink } from '@/components/core/AppLink'
import { H1, fonts } from '@/components/core/Typography'
import { TextContent } from '@/components/landing/TextSection'

export const Footer = () => {
  return (
    <BgAndOuterWrap>
      <InnerWrap>
        <Content>
          <Links>
            <Section>
              <Header>Product</Header>
              <AppLink
                onClick={() => analytics.acceleratorApplyClickEvent('footer')}
                href={expandRoute('nap')}
              >
                <Name>Accelerator</Name>
              </AppLink>
              <AppLink
                onClick={() => analytics.viewCityDirectoryEvent()}
                href={expandRoute('cityDirectory')}
              >
                <Name>City Directory</Name>
              </AppLink>
              <AppLink href={expandRoute('census')}>
                <Name>Census</Name>
              </AppLink>
              <AppLink href={expandRoute('vote')}>
                <Name>Proposals</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.PRIVACY_AND_TERMS}>
                <Name>Privacy & Terms</Name>
              </AppLink>
            </Section>

            <Section>
              <Header>Resources</Header>
              <AppLink external href={EXTERNAL_LINKS.VISION}>
                <Name>Vision</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.BLOG}>
                <Name>Blog</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.PODCAST}>
                <Name>Podcast</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.STORE}>
                <Name>Store</Name>
              </AppLink>
              <AppLink href={expandRoute('security')}>
                <Name>Security</Name>
              </AppLink>
            </Section>

            <Section>
              <Header>Social</Header>
              <AppLink external href={EXTERNAL_LINKS.TWITTER}>
                <Name>Twitter</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.INSTAGRAM}>
                <Name>Instagram</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.FARCASTER}>
                <Name>Farcaster</Name>
              </AppLink>
              <AppLink
                external
                href={`mailto:${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}`}
              >
                <Name>Contact Us</Name>
              </AppLink>
            </Section>
          </Links>

          <Section>
            <FooterLogo>
              <Icon name="logo-cabin" size={3.8} color="green400" />
              <IconText>Cabin</IconText>
            </FooterLogo>
          </Section>
        </Content>
      </InnerWrap>
    </BgAndOuterWrap>
  )
}

const BgAndOuterWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.green800};
  width: 100%;
  gap: 2.4rem;
  padding-left: calc(100vw - 100%);

  ${H1}, ${TextContent} {
    font-family: ${fonts.poppins};
    text-align: center;
    color: ${({ theme }) => theme.colors.yellow100};
  }

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
  }
`

export const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  padding: 4rem;

  ${({ theme }) => theme.bp.md} {
    align-self: center;
    width: 50rem;
    padding-left: 0;
    padding-right: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`

export const Content = styled.div`
  display: flex;
  width: 100%;
  gap: 4rem;
  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

export const Links = styled.div`
  display: flex;
  gap: 4rem;
  flex-direction: column;

  ${({ theme }) => theme.bp.md} {
    gap: 6.4rem;
    flex-direction: row;
  }
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export const Header = styled(H3)`
  color: ${({ theme }) => theme.colors.yellow100};
  text-transform: uppercase;
`

export const Name = styled(Subline2)`
  color: ${({ theme }) => theme.colors.yellow100};
  opacity: 0.8;
`

export const FooterLogo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

export const IconText = styled.div`
  ${hhStyles}
  font-size: 2.4rem;
  line-height: 1.2;
  display: flex;
  align-items: end;
  color: ${({ theme }) => theme.colors.green400};
`
