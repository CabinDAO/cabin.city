import styled from 'styled-components'
import Icon from '@/components/core/Icon'
import { H3, Subline2, hhStyles } from '@/components/core/Typography'
import { AppLink } from '@/components/core/AppLink'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { AuthenticatedLink } from '../core/AuthenticatedLink'
import events from '@/lib/googleAnalytics/events'

interface FooterProps {
  className?: string
  children?: React.ReactNode
}

export const Footer = ({ children, className }: FooterProps) => (
  <FooterContainer className={className}>
    <FooterNavigation>
      <FooterNavigationList>
        <FooterNavigationHeader>Product</FooterNavigationHeader>
        <AppLink
          onClick={() => events.viewCityDirectoryEvent()}
          location="/city-directory"
          iconSize={0}
        >
          <FooterItem>City Directory</FooterItem>
        </AppLink>
        <AppLink
          onClick={() => events.viewExperiencesEvent()}
          location="/experiences"
          iconSize={0}
        >
          <FooterItem>Experiences</FooterItem>
        </AppLink>
        <AppLink external location={EXTERNAL_LINKS.CITIZENSHIP} iconSize={0}>
          <FooterItem>Citizenship</FooterItem>
        </AppLink>
        <AuthenticatedLink logSignInEvent href="/dashboard">
          <FooterItem>Sign In</FooterItem>
        </AuthenticatedLink>
        <AppLink
          external
          location={EXTERNAL_LINKS.PRIVACY_AND_TERMS}
          iconSize={0}
        >
          <FooterItem>Privacy & Terms</FooterItem>
        </AppLink>
      </FooterNavigationList>

      <FooterNavigationList>
        <FooterNavigationHeader>Resources</FooterNavigationHeader>
        <AppLink external location={EXTERNAL_LINKS.VISION} iconSize={0}>
          <FooterItem>Vision</FooterItem>
        </AppLink>
        <AppLink external location={EXTERNAL_LINKS.BLOG} iconSize={0}>
          <FooterItem>Blog</FooterItem>
        </AppLink>
        <AppLink external location={EXTERNAL_LINKS.PODCAST} iconSize={0}>
          <FooterItem>Podcast</FooterItem>
        </AppLink>
        <AppLink external location={EXTERNAL_LINKS.WIKI} iconSize={0}>
          <FooterItem>Support Wiki</FooterItem>
        </AppLink>
      </FooterNavigationList>

      <FooterNavigationList>
        <FooterNavigationHeader>Social</FooterNavigationHeader>
        <AppLink external location={EXTERNAL_LINKS.CABIN_DISCORD} iconSize={0}>
          <FooterItem>Discord</FooterItem>
        </AppLink>
        <AppLink external location={EXTERNAL_LINKS.CABIN_TWITTER} iconSize={0}>
          <FooterItem>Twitter</FooterItem>
        </AppLink>
        <AppLink
          external
          location={EXTERNAL_LINKS.CABIN_INSTAGRAM}
          iconSize={0}
        >
          <FooterItem>Instagram</FooterItem>
        </AppLink>
      </FooterNavigationList>
    </FooterNavigation>

    <FooterNavigationList>
      <FooterLogo>
        <Icon name="logo-cabin" size={3.8} color="green400" />
        <IconText>Cabin</IconText>
      </FooterLogo>
    </FooterNavigationList>

    {children}
  </FooterContainer>
)

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

export const FooterNavigation = styled.div`
  display: flex;
  gap: 4rem;
  flex-direction: column;

  ${({ theme }) => theme.bp.md} {
    gap: 6.4rem;
    flex-direction: row;
  }
`

export const FooterNavigationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export const FooterNavigationHeader = styled(H3)`
  color: ${({ theme }) => theme.colors.yellow100};
  text-transform: uppercase;
`

export const FooterItem = styled(Subline2)`
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
