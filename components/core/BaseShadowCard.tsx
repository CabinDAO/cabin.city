import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.yellow900};
  box-shadow: 0.8rem 0.8rem 0rem ${({ theme }) => theme.colors.yellow900};
`

interface BaseShadowCardProps {
  children: React.ReactNode
}

export const BaseShadowCard = ({ children }: BaseShadowCardProps) => {
  return <Container>{children}</Container>
}
