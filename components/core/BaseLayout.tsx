import React from 'react'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { useProfile } from '@/components/auth/useProfile'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { LaunchBanner } from '@/components/citizenship/LaunchBanner'
import { NavbarMobile } from '@/components/nav/NavbarMobile'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/nav/Footer'
import { BaseContainer } from '@/components/core/BaseContainer'

export const BaseLayout = ({
  children,
  displayLaunchBanner,
  className,
  hideNavAndFooter = false,
  landingPage = false,
}: {
  children: React.ReactNode
  displayLaunchBanner?: boolean
  className?: string
  hideNavAndFooter?: boolean
  landingPage?: boolean
}) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  const noFooterGap = landingPage
  const noTopPadding = landingPage

  // hide mobile nav on landing pages if logged out so there's room for the login button
  // TODO: not great UX, improve this
  const { user } = useProfile()
  const hideMobileNav = landingPage && !user

  const hideNav = hideNavAndFooter || (isMobile && hideMobileNav)

  const content = landingPage ? (
    children
  ) : (
    <BaseContainer maxWidth={'default'} noNav={hideNav}>
      {children}
    </BaseContainer>
  )

  return (
    <OuterContainer className={className}>
      {displayLaunchBanner && <LaunchBanner />}
      <PushFooterToBottom noFooterGap={noFooterGap}>
        <NavAndContent>
          {!hideNav && (isMobile ? <NavbarMobile /> : <Navbar />)}
          <MainContent noTopPadding={noTopPadding}>{content}</MainContent>
        </NavAndContent>
        {!hideNavAndFooter && <Footer />}
      </PushFooterToBottom>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

const PushFooterToBottom = styled.div<{ noFooterGap: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: space-between;
  gap: ${({ noFooterGap }) => (noFooterGap ? '0' : '10rem')};

  ${({ theme }) => theme.bp.md} {
    gap: ${({ noFooterGap }) => (noFooterGap ? '0' : '16rem')};
  }
`

// need this extra div so PushFooterToBottom can have a gap between the content and footer
const NavAndContent = styled.div`
  width: 100%;
  height: 100%;
`

const MainContent = styled.main<{ noTopPadding?: boolean }>`
  height: 100%;
  width: 100%;
  //overflow-x: hidden; // so wide fixed-width elements dont make this too wide. WEIRDLY CLIPS VERTICALLY TOO???
  ${({ noTopPadding }) => !noTopPadding && padding.top('md')};
`

// const NavbarSpacer = styled.div`
//   height: 70vh; // just so it looks nice in dev tools
//   width: ${NAV_WIDTH_REM}rem;
//   flex-shrink: 0;
// `
