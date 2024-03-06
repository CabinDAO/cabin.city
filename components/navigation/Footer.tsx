import React from 'react'
import styled from 'styled-components'
import Icon from '@/components/core/Icon'
import { H3, Subline2, hhStyles } from '@/components/core/Typography'
import { AppLink } from '@/components/core/AppLink'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import events from '@/lib/googleAnalytics/events'
import { H1, fonts } from '@/components/core/Typography'
import { TextContent } from '@/components/landing/TextSection'
import { useProfile } from '@/components/auth/useProfile'
import { CitizenshipStatus } from '@/utils/types/profile'

export const FOOTER_HEIGHT = '265' // TODO: fix this huge hack

export const Footer = () => {
  const { user } = useProfile()
  return (
    <Container>
      <LandingContent>
        <FooterContainer>
          <TextSections>
            <Section>
              <Header>Product</Header>
              <AppLink
                onClick={() => events.viewCityDirectoryEvent()}
                location="/city-directory"
                iconSize={0}
              >
                <Name>City Directory</Name>
              </AppLink>
              <AppLink
                external
                location={EXTERNAL_LINKS.CARETAKER_TYPEFORM}
                iconSize={0}
              >
                <Name>List Your Property</Name>
              </AppLink>
              <AppLink
                external
                location={EXTERNAL_LINKS.CITIZENSHIP}
                iconSize={0}
              >
                <Name>Citizenship</Name>
              </AppLink>
              {user && user.citizenshipStatus == CitizenshipStatus.Verified && (
                <AppLink external location="/invite" iconSize={0}>
                  <Name>Invite Friends</Name>
                </AppLink>
              )}
              <AppLink
                external
                location={EXTERNAL_LINKS.PRIVACY_AND_TERMS}
                iconSize={0}
              >
                <Name>Privacy & Terms</Name>
              </AppLink>
              <AppLink location="/security" iconSize={0}>
                <Name>Security</Name>
              </AppLink>
            </Section>

            <Section>
              <Header>Resources</Header>
              <AppLink external location={EXTERNAL_LINKS.VISION} iconSize={0}>
                <Name>Vision</Name>
              </AppLink>
              <AppLink external location={EXTERNAL_LINKS.BLOG} iconSize={0}>
                <Name>Blog</Name>
              </AppLink>
              <AppLink external location={EXTERNAL_LINKS.PODCAST} iconSize={0}>
                <Name>Podcast</Name>
              </AppLink>
              <AppLink external location={EXTERNAL_LINKS.STORE} iconSize={0}>
                <Name>Store</Name>
              </AppLink>
              <AppLink
                external
                location={`mailto:${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}`}
                iconSize={0}
              >
                <Name>Contact Us</Name>
              </AppLink>
            </Section>

            <Section>
              <Header>Social</Header>
              <AppLink external location={EXTERNAL_LINKS.DISCORD} iconSize={0}>
                <Name>Discord</Name>
              </AppLink>
              <AppLink external location={EXTERNAL_LINKS.FORUM} iconSize={0}>
                <Name>Forum</Name>
              </AppLink>
              <AppLink external location={EXTERNAL_LINKS.TWITTER} iconSize={0}>
                <Name>Twitter</Name>
              </AppLink>
              <AppLink
                external
                location={EXTERNAL_LINKS.INSTAGRAM}
                iconSize={0}
              >
                <Name>Instagram</Name>
              </AppLink>
            </Section>
          </TextSections>

          <Section>
            <FooterLogo>
              <Icon name="logo-cabin" size={3.8} color="green400" />
              <IconText>Cabin</IconText>
            </FooterLogo>
          </Section>
        </FooterContainer>
      </LandingContent>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.green800};
  width: 100%;
  gap: 2.4rem;

  ${H1}, ${TextContent} {
    font-family: ${fonts.poppins};
    text-align: center;
    color: ${({ theme }) => theme.colors.yellow100};
  }

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
  }
`

export const LandingContent = styled.div`
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

export const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 4rem;
  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

export const TextSections = styled.div`
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
