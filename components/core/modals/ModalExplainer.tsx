import { H3 } from '@/components/core/Typography'
import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  padding: 4rem;
`

interface ModalExplainerProps {
  title: string
  explanation: ReactNode
}

export const ModalExplainer = ({ title, explanation }: ModalExplainerProps) => {
  return (
    <Container>
      <H3>{title}</H3>
      {explanation}
    </Container>
  )
}
