import styled from 'styled-components'
import { LaunchBanner } from '../citizenship/LaunchBanner'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { MobileFloatingMenu } from '../profile/MobileFloatingMenu'
import { ProfileNavbar } from '../profile/ProfileNavbar'
import { MainContent, NavbarContainer } from './common.styles'

interface LayoutProps {
  children: React.ReactNode
  displayLaunchBanner?: boolean
  hideNavbar?: boolean
  actionBar?: React.ReactNode
}

export const SingleColumnLayout = ({
  children,
  displayLaunchBanner,
  actionBar,
  hideNavbar,
}: LayoutProps) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  return (
    <OuterContainer>
      {displayLaunchBanner && <LaunchBanner />}
      <Container>
        <MainContent>{children}</MainContent>
        {!hideNavbar && (
          <>
            {isMobile ? (
              <MobileFloatingMenu />
            ) : (
              <NavbarContainer>
                <ProfileNavbar />
              </NavbarContainer>
            )}
          </>
        )}
      </Container>
      <ActionBarContainer>{actionBar}</ActionBarContainer>
    </OuterContainer>
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
`

const ActionBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;

  padding: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row-reverse;
    align-items: flex-start;
    padding: 2.4rem;
    gap: 4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    gap: 2.4rem;
    padding: 4rem;
    flex-direction: column;
  }
`
