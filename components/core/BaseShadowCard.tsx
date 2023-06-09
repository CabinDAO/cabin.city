import styled from 'styled-components'

interface BaseShadowCardProps {
  children: React.ReactNode
  onClick?: () => void
}

export const BaseShadowCard = ({ children, onClick }: BaseShadowCardProps) => {
  return <Container onClick={onClick}>{children}</Container>
}

interface ContainerProps {
  onClick?: () => void
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.yellow900};
  box-shadow: 0.8rem 0.8rem 0rem ${({ theme }) => theme.colors.yellow900};
`
