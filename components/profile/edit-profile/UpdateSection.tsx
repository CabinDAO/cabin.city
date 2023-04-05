import { H3 } from '@/components/core/Typography'
import styled from 'styled-components'

interface UpdateSectionProps {
  title: string
  children: React.ReactNode
}

export const UpdateSection = ({ title, children }: UpdateSectionProps) => {
  return (
    <Container>
      <H3>{title}</H3>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;
`
