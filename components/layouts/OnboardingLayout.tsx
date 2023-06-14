import styled from 'styled-components'
import { FixedWidthMainContent } from './common.styles'
import { AppHead, AppHeadProps } from '../shared/head'

interface LayoutProps {
  children: React.ReactNode
  headProps?: AppHeadProps
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  justify-content: flex-start;
  align-items: center;
  gap: 4.8rem;
  padding: 2.5rem 1.6rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.5rem 8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 0 1.6rem;
    justify-content: center;
  }
`

export const OnboardingLayout = ({ children, headProps }: LayoutProps) => {
  return (
    <>
      <AppHead {...headProps} />
      <Container>
        <FixedWidthMainContent>{children}</FixedWidthMainContent>
      </Container>
    </>
  )
}
