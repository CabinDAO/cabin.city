import styled from 'styled-components'
import { Body1, H4 } from '../core/Typography'
import { LandingContentNoPadding } from './styles'
import { SubscribeForm } from './SubscribeForm'

export const SubscribeSection = () => {
  return (
    <SubscribeSectionContainer>
      <SubscribeInstructions>
        <H4>Subscribe to our newsletter</H4>
        <Body1>Stay up-to-date on Cabin&apos;s latest events</Body1>
      </SubscribeInstructions>
      <FormContainer>
        <SubscribeForm />
      </FormContainer>
    </SubscribeSectionContainer>
  )
}

const SubscribeSectionContainer = styled(LandingContentNoPadding)`
  display: flex;
  padding: 8rem 4rem;
  justify-content: space-between;
  flex-direction: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    gap: 0;
    padding: 8rem 0rem;
  }
`

const FormContainer = styled.div`
  display: flex;
`

const SubscribeInstructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`
