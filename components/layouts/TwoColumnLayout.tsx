import styled from 'styled-components'

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
`

const Main = styled.main`
  display: flex;
`

export const TwoColumnLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  )
}
