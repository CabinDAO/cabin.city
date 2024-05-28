import React, { HTMLAttributes } from 'react'
import { useDeviceSize } from '../hooks/useDeviceSize'
import styled from 'styled-components'
import { LaunchBanner } from '../citizenship/LaunchBanner'
import { MobileNavbar } from '../profile/MobileNavbar'
import { Navbar } from '@/components/core/Navbar'
import { MainContent, NavbarContainer } from './common.styles'
import { Footer, FOOTER_HEIGHT } from '@/components/navigation/Footer'

export type LayoutVariant = 'default' | 'full'

export const SingleColumnLayout = ({
  children,
  displayLaunchBanner,
  hideNavbar,
  className,
  variant,
}: {
  children: React.ReactNode
  displayLaunchBanner?: boolean
  hideNavbar?: boolean
  className?: string
  variant?: LayoutVariant
}) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  return (
    <>
      <OuterContainer className={className}>
        {displayLaunchBanner && <LaunchBanner />}
        <Container variant={variant}>
          <MainContent variant={variant}>{children}</MainContent>
          {!hideNavbar && (
            <>
              {isMobile ? (
                <MobileNavbar />
              ) : (
                <NavbarContainer variant={variant}>
                  <Navbar />
                </NavbarContainer>
              )}
            </>
          )}
        </Container>
      </OuterContainer>
      <Footer />
    </>
  )
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${`calc(100vh - ${FOOTER_HEIGHT}px)`};
  min-width: 100%;
  justify-content: flex-start;
  align-items: center;
  position: relative;
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
