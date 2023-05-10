import styled from 'styled-components'
import { H3 } from './Typography'

interface TabBarProps {
  children: React.ReactNode
}
export const TabBar = (props: TabBarProps) => {
  const { children } = props
  return <Container>{children}</Container>
}

interface TabProps {
  isSelected: boolean
  onClick?: () => void
}

export const Tab = styled(H3)<TabProps>`
  cursor: pointer;
  padding: 1.6rem 0;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.65)};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `2px solid ${theme.colors.green900}` : 'none'};
`

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 4rem;
  padding: 0 2rem;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  background-color: ${({ theme }) => theme.colors.yellow200};
`
