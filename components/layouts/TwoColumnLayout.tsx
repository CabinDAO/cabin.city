import styled from 'styled-components'
import { IconName } from '../core/Icon'
import { TitleCard } from '../core/TitleCard'
import { Navbar } from '../core/Navbar'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { MobileFloatingMenu } from '../profile/MobileFloatingMenu'
import { FixedWidthMainContent, NavbarContainer } from './common.styles'
import { H3 } from '@/components/core/Typography'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4.8rem;
  padding: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row-reverse;
    gap: 4.2rem;
    padding: 2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: column;
    gap: 4.8rem;
    padding: 4rem;
  }

  ${FixedWidthMainContent} {
    align-items: flex-start;
    > ${H3} {
      margin-top: 4rem;
    }
  }
`

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: auto;
  gap: 3.2rem;

  ${({ theme }) => theme.bp.lg} {
    display: grid;
    grid-template-columns: 65% auto;
    grid-gap: 3.5rem;
  }
`

interface LayoutProps {
  children: React.ReactNode
  title: string
  icon?: IconName
  iconHref?: string
  subheader?: string
}

export const TwoColumnLayout = ({
  children,
  title,
  icon,
  iconHref,
  subheader,
}: LayoutProps) => {
  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  return (
    <>
      <Container>
        <FixedWidthMainContent>
          <TitleCard
            title={title}
            icon={icon ?? 'logo-cabin'}
            iconHref={iconHref}
          />
          {subheader && <H3>{subheader}</H3>}
          <ColumnsContainer>{children}</ColumnsContainer>
        </FixedWidthMainContent>
        {isMobile ? (
          <MobileFloatingMenu />
        ) : (
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>
        )}
      </Container>
    </>
  )
}
