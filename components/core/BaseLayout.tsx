import React, { HTMLAttributes } from 'react'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import styled, { css } from 'styled-components'
import { LaunchBanner } from '@/components/citizenship/LaunchBanner'
import { NavbarMobile } from '@/components/core/NavbarMobile'
import { Navbar } from '@/components/core/Navbar'
import { Footer } from '@/components/navigation/Footer'

type LayoutVariant = 'default' | 'landing'

export const BaseLayout = ({
  children,
  displayLaunchBanner,
  className,
  variant = 'default',
  hideNavAndFooter = false,
}: {
  children: React.ReactNode
  displayLaunchBanner?: boolean
  className?: string
  variant?: LayoutVariant
  hideNavAndFooter?: boolean
}) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  return (
    <OuterContainer className={className}>
      {displayLaunchBanner && <LaunchBanner />}
      <PushFooterToBottom variant={variant}>
        <ScrollPadFix variant={variant}>
          <NavAndContent variant={variant}>
            {!hideNavAndFooter &&
              (isMobile ? (
                <NavbarMobile />
              ) : (
                <NavbarContainer variant={variant}>
                  <Navbar />
                </NavbarContainer>
              ))}
            <MainContent variant={variant}>{children}</MainContent>
          </NavAndContent>
        </ScrollPadFix>
        {!hideNavAndFooter && <Footer />}
      </PushFooterToBottom>
    </OuterContainer>
  )
}

interface withVariant extends HTMLAttributes<HTMLDivElement> {
  variant: LayoutVariant
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

const PushFooterToBottom = styled.div<withVariant>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  gap: ${({ variant }) => (variant === 'landing' ? '0' : '10rem')};

  ${({ theme }) => theme.bp.md} {
    gap: ${({ variant }) => (variant === 'landing' ? '0' : '16rem')};
  }
`

const ScrollPadFix = styled.div<withVariant>`
  width: 100%;
  ${({ variant }) =>
    variant !== 'landing' &&
    css`
      padding-left: calc(100vw - 100%);
    `};
`

const NavAndContent = styled.div<withVariant>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;

  ${({ variant }) =>
    variant !== 'landing' &&
    css`
      padding: 1.6rem;
    `};

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 4rem;
    ${({ variant }) =>
      variant !== 'landing' &&
      css`
        padding: 2.4rem;
      `};
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: column;
    gap: 2.4rem;
    ${({ variant }) =>
      variant !== 'landing' &&
      css`
        padding: 4rem;
      `};
  }
`

export const MainContent = styled.main<withVariant>`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: ${({ variant }) => (variant === 'landing' ? '0' : '2.4rem')};
  height: 100%;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: ${({ variant }) => (variant === 'landing' ? '100%' : '84rem')};
    align-self: flex-start;
  }

  ${({ theme }) => theme.bp.lg} {
    align-self: center;
  }
`

const NavbarContainer = styled.div<withVariant>`
  display: flex;
  z-index: 5;

  ${({ variant }) =>
    variant === 'landing' &&
    css`
      position: fixed;
      top: 4rem;
      left: 2.4rem;
    `}

  ${({ theme }) => theme.bp.lg} {
    position: fixed;
    top: 4rem;
    left: 2.4rem;
  }
`
