import styled from 'styled-components'
import { LaunchBanner } from '../citizenship/LaunchBanner'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { MobileFloatingMenu } from '../profile/MobileFloatingMenu'
import { ProfileNavbar } from '../profile/ProfileNavbar'
import { MainContent, NavbarContainer } from './common.styles'
import { HTMLAttributes } from 'react'
import { AppHead, AppHeadProps } from '../shared/head'

export type LayoutVariant = 'default' | 'full'

interface LayoutProps {
  children: React.ReactNode
  displayLaunchBanner?: boolean
  hideNavbar?: boolean
  actionBar?: React.ReactNode
  className?: string
  variant?: LayoutVariant
  headProps?: AppHeadProps
}

export const SingleColumnLayout = ({
  children,
  displayLaunchBanner,
  actionBar,
  hideNavbar,
  className,
  variant,
  headProps,
}: LayoutProps) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  return (
    <>
      <AppHead {...headProps} />
      <OuterContainer className={className}>
        {displayLaunchBanner && <LaunchBanner />}
        <Container variant={variant}>
          <MainContent variant={variant}>{children}</MainContent>
          {!hideNavbar && (
            <>
              {isMobile ? (
                <MobileFloatingMenu />
              ) : (
                <NavbarContainer variant={variant}>
                  <ProfileNavbar />
                </NavbarContainer>
              )}
            </>
          )}
        </Container>
        <ActionBarContainer>{actionBar}</ActionBarContainer>
      </OuterContainer>
    </>
  )
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-bottom: 10rem;
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
