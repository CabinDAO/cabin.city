import styled from 'styled-components'
import { Body1, H4 } from '@/components/core/Typography'
import { SubscribeForm } from './SubscribeForm'
import { BaseContainer } from '@/components/core/BaseContainer'
import { LandingSectionTitle } from '@/components/landing/shared'

export const SubscribeSection = () => {
  return (
    <Container maxWidth={'full'}>
      <LandingSectionTitle>Cabin Around the World</LandingSectionTitle>

      {/* <SubscribeInstructions>
        <H4>Subscribe to our newsletter</H4>
        <Body1>Stay up-to-date</Body1>
      </SubscribeInstructions>
      <SubscribeForm /> */}
    </Container>
  )
}

const Container = styled(BaseContainer)`
  justify-content: center;
  flex-direction: row;
`

const SubscribeInstructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex-shrink: 0;
`
