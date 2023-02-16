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
  justify-content: flex-start;
  align-items: center;
  gap: 4.8rem;
  padding: 4rem;
`

export const OnboardingLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <MainContent>{children}</MainContent>
    </Container>
  )
}
