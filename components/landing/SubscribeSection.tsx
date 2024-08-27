import styled from 'styled-components'
import { Body1, H4 } from '@/components/core/Typography'
import { SubscribeForm } from './SubscribeForm'
import { BaseContainer } from '@/components/core/BaseContainer'

export const SubscribeSection = () => {
  return (
    <Container maxWidth={'default'}>
      <SubscribeInstructions>
        <H4>Subscribe to our newsletter</H4>
        <Body1>Stay up-to-date</Body1>
      </SubscribeInstructions>
      <SubscribeForm />
    </Container>
  )
}

const Container = styled(BaseContainer)`
  justify-content: space-between;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const SubscribeInstructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex-shrink: 0;
`
