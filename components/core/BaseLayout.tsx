import React, { HTMLAttributes } from 'react'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import styled, { css } from 'styled-components'
import { LaunchBanner } from '@/components/citizenship/LaunchBanner'
import { NavbarMobile } from '@/components/core/NavbarMobile'
import { Navbar } from '@/components/core/Navbar'
import { Footer, FOOTER_HEIGHT } from '@/components/navigation/Footer'

type LayoutVariant = 'default' | 'full'

export const BaseLayout = ({
  children,
  displayLaunchBanner,
  className,
  variant = 'default',
}: {
  children: React.ReactNode
  displayLaunchBanner?: boolean
  className?: string
  variant?: LayoutVariant
}) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  return (
    <OuterContainer className={className}>
      {displayLaunchBanner && <LaunchBanner />}
      <ScrollPadFix variant={variant}>
        <Container variant={variant}>
          {isMobile ? (
            <NavbarMobile />
          ) : (
            <NavbarContainer variant={variant}>
              <Navbar />
            </NavbarContainer>
          )}
          <MainContent variant={variant}>{children}</MainContent>
        </Container>
      </ScrollPadFix>
      <Footer />
    </OuterContainer>
  )
}

interface withVariant extends HTMLAttributes<HTMLDivElement> {
  variant: LayoutVariant
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

const ScrollPadFix = styled.div<withVariant>`
  width: 100%;
  ${({ variant }) =>
    variant !== 'full' &&
    css`
      padding-left: calc(100vw - 100%);
    `};
`

const Container = styled.div<withVariant>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;

  ${({ variant }) =>
    variant !== 'full' &&
    css`
      padding: 1.6rem 1.6rem 10rem;
    `};

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 4rem;
    ${({ variant }) =>
      variant !== 'full' &&
      css`
        padding: 2.4rem 2.4rem 15rem;
      `};
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: column;
    gap: 2.4rem;
    ${({ variant }) =>
      variant !== 'full' &&
      css`
        padding: 4rem 4rem 20rem;
      `};
  }
`

export const MainContent = styled.main<withVariant>`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: ${({ variant }) => (variant === 'full' ? '0' : '2.4rem')};
  height: 100%;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: ${({ variant }) => (variant === 'full' ? '100%' : '84rem')};
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
    variant === 'full' &&
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
