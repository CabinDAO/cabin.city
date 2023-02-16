import styled from 'styled-components'
import { IconName } from '../core/Icon'
import { Navbar } from '../core/Navbar'
import { TitleCard } from '../core/TitleCard'
import { MainContent, NavbarContainer } from './common.styles'

interface LayoutProps {
  children: React.ReactNode
  title: string
  iconName?: IconName
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4.8rem;
  padding: 4rem;
`

const ColumnsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 65% auto;
  grid-gap: 3.5rem;
  height: auto;
`

export const TwoColumnLayout = ({ children, title, iconName }: LayoutProps) => {
  return (
    <Container>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <MainContent>
        <TitleCard title={title} icon={iconName ?? 'logo-cabin'} />
        <ColumnsContainer>{children}</ColumnsContainer>
      </MainContent>
    </Container>
  )
}
