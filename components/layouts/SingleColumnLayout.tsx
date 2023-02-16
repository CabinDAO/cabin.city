import styled from 'styled-components'
import { Navbar } from '../core/Navbar'
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
  return (
    <Container>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <MainContent>{children}</MainContent>
    </Container>
  )
}
