import styled from 'styled-components'
import { MainContent } from './common.styles'

interface LayoutProps {
  children: React.ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 4.8rem;
  padding: 0 1.6rem;
`

export const OnboardingLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <MainContent>{children}</MainContent>
    </Container>
  )
}
