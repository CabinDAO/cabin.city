import styled from 'styled-components'
import { LaunchBanner } from '../citizenship/LaunchBanner'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { MobileFloatingMenu } from '../profile/MobileFloatingMenu'
import { Navbar } from '../core/Navbar'
import { MainContent, NavbarContainer } from './common.styles'
import React, { HTMLAttributes } from 'react'
import { Footer, FOOTER_HEIGHT } from '@/components/navigation/Footer'

export type LayoutVariant = 'default' | 'full'

interface LayoutProps {
  children: React.ReactNode
  displayLaunchBanner?: boolean
  hideNavbar?: boolean
  actionBar?: React.ReactNode
  className?: string
  variant?: LayoutVariant
}

export const SingleColumnLayout = ({
  children,
  displayLaunchBanner,
  actionBar,
  hideNavbar,
  className,
  variant,
}: LayoutProps) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'
  const withFooter = !actionBar

  return (
    <>
      <OuterContainer className={className} withFooter={withFooter}>
        {displayLaunchBanner && <LaunchBanner />}
        <Container variant={variant}>
          <MainContent variant={variant}>{children}</MainContent>
          {!hideNavbar && (
            <>
              {isMobile ? (
                <MobileFloatingMenu />
              ) : (
                <NavbarContainer variant={variant}>
                  <Navbar />
                </NavbarContainer>
              )}
            </>
          )}
        </Container>
        <ActionBarContainer>{actionBar}</ActionBarContainer>
      </OuterContainer>
      {withFooter && <Footer />}
    </>
  )
}

const OuterContainer = styled.div<{
  withFooter?: boolean
}>`
  display: flex;
  flex-direction: column;
  min-height: ${({ withFooter }) =>
    withFooter ? `calc(100vh - ${FOOTER_HEIGHT}px)` : '100vh'};
  min-width: 100%;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

export const ActionBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LayoutVariant
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ variant }) => (variant === 'full' ? '0' : '1.6rem')};

  ${({ theme }) => theme.bp.md} {
    flex-direction: ${({ variant }) =>
      variant === 'full' ? 'column' : 'row-reverse'};
    align-items: flex-start;
    padding: ${({ variant }) => (variant === 'full' ? '0' : '2.4rem')};
    gap: 4rem;
    margin-bottom: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    gap: 2.4rem;
    padding: ${({ variant }) => (variant === 'full' ? '0' : '4rem')};
    flex-direction: column;
  }
`
