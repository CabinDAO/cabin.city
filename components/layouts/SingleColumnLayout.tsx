import styled from 'styled-components'
import { useClientMediaRender } from '../hooks/useClientMediaRender'
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
  gap: 4.8rem;
  padding: 4rem;
`

export const SingleColumnLayout = ({ children }: LayoutProps) => {
  const { isMobile } = useClientMediaRender()

  return (
    <>
      <Container>
        <MainContent>{children}</MainContent>
      </Container>
      {isMobile ? (
        <MobileFloatingMenu />
      ) : (
        <NavbarContainer>
          <ProfileNavbar />
        </NavbarContainer>
      )}
    </>
  )
}
