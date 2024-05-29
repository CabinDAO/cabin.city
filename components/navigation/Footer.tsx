import React from 'react'
import { useProfile } from '@/components/auth/useProfile'
import { CitizenshipStatus } from '@/utils/types/profile'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import analytics from '@/lib/googleAnalytics/analytics'
import styled from 'styled-components'
import { H3, Subline2, hhStyles } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { AppLink } from '@/components/core/AppLink'
import { H1, fonts } from '@/components/core/Typography'
import { TextContent } from '@/components/landing/TextSection'

export const FOOTER_HEIGHT = '265' // TODO: fix this huge hack

export const Footer = () => {
  const { user } = useProfile()
  return (
    <BgAndOuterWrap>
      <InnerWrap>
        <Content>
          <Links>
            <Section>
              <Header>Product</Header>
              <AppLink
                onClick={() => analytics.viewCityDirectoryEvent()}
                href="/city-directory"
                iconSize={0}
              >
                <Name>City Directory</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.CITIZENSHIP} iconSize={0}>
                <Name>Citizenship</Name>
              </AppLink>
              {user && user.citizenshipStatus == CitizenshipStatus.Verified && (
                <AppLink external href="/invite" iconSize={0}>
                  <Name>Invite Friends</Name>
                </AppLink>
              )}
              <AppLink
                external
                href={EXTERNAL_LINKS.PRIVACY_AND_TERMS}
                iconSize={0}
              >
                <Name>Privacy & Terms</Name>
              </AppLink>
              <AppLink href="/security" iconSize={0}>
                <Name>Security</Name>
              </AppLink>
            </Section>

            <Section>
              <Header>Resources</Header>
              <AppLink external href={EXTERNAL_LINKS.VISION} iconSize={0}>
                <Name>Vision</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.BLOG} iconSize={0}>
                <Name>Blog</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.PODCAST} iconSize={0}>
                <Name>Podcast</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.STORE} iconSize={0}>
                <Name>Store</Name>
              </AppLink>
              <AppLink
                external
                href={`mailto:${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}`}
                iconSize={0}
              >
                <Name>Contact Us</Name>
              </AppLink>
            </Section>

            <Section>
              <Header>Social</Header>
              <AppLink external href={EXTERNAL_LINKS.DISCORD} iconSize={0}>
                <Name>Discord</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.FORUM} iconSize={0}>
                <Name>Forum</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.TWITTER} iconSize={0}>
                <Name>Twitter</Name>
              </AppLink>
              <AppLink external href={EXTERNAL_LINKS.INSTAGRAM} iconSize={0}>
                <Name>Instagram</Name>
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
