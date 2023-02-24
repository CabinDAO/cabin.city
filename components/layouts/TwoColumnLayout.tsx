import styled from 'styled-components'
import { IconName } from '../core/Icon'
import { TitleCard } from '../core/TitleCard'
import { ProfileNavbar } from '../profile/ProfileNavbar'
import { FixedWidthMainContent, NavbarContainer } from './common.styles'

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

interface LayoutProps {
  children: React.ReactNode
  title: string
  iconName?: IconName
}

export const TwoColumnLayout = ({ children, title, iconName }: LayoutProps) => {
  return (
    <Container>
      <NavbarContainer>
        <ProfileNavbar />
      </NavbarContainer>
      <FixedWidthMainContent>
        <TitleCard title={title} icon={iconName ?? 'logo-cabin'} />
        <ColumnsContainer>{children}</ColumnsContainer>
      </FixedWidthMainContent>
    </Container>
  )
}
