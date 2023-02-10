import styled from 'styled-components'

interface ContainerProps {
  shadow?: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 100%;
  min-height: 10rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.yellow900};
  border-corner-shape: scoop;
  ${({ shadow, theme }) =>
    shadow &&
    `
    box-shadow: 0.8rem 0.8rem 0rem ${theme.colors.yellow900};
    `}
`

const Corner = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 1.6rem;
  height: 1.6rem;
  border-top: 0.1rem solid ${({ theme }) => theme.colors.yellow200};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.yellow900};
  border-right: 0.1rem solid ${({ theme }) => theme.colors.yellow900};
`

interface BaseCardProps {
  children: React.ReactNode
  shadow?: boolean
}

export const BaseCard = ({ children, shadow }: BaseCardProps) => {
  return (
    <Container shadow={shadow}>
      <Corner />
      {children}
    </Container>
  )
}
