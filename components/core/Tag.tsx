import styled from 'styled-components'
import { Subline1 } from './Typography'

interface TagProps {
  label: string
  onClick?: () => void
}

export const Tag = ({ label, onClick }: TagProps) => {
  return (
    <Container onClick={onClick}>
      <Subline1 $color="yellow100">{label}</Subline1>
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.green900};
  padding: 0.7rem 1.2rem;
  border-radius: 8px 0px;
  width: max-content;
`
