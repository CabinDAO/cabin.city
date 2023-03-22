import styled from 'styled-components'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { MobileFloatingMenu } from '../profile/MobileFloatingMenu'
import { ProfileNavbar } from '../profile/ProfileNavbar'
import { MainContent, NavbarContainer } from './common.styles'

interface LayoutProps {
  children: React.ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
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

export const SingleColumnLayout = ({ children }: LayoutProps) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  return (
    <Container>
      <MainContent>{children}</MainContent>
      {isMobile ? (
        <MobileFloatingMenu />
      ) : (
        <NavbarContainer>
          <ProfileNavbar />
        </NavbarContainer>
      )}
    </Container>
  )
}
