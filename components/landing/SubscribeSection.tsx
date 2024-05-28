import styled from 'styled-components'
import { Body1, H4 } from '@/components/core/Typography'
import { SubscribeForm } from './SubscribeForm'

export const SubscribeSection = () => {
  return (
    <SubscribeSectionContainer>
      <SubscribeInstructions>
        <H4>Subscribe to our newsletter</H4>
        <Body1>Stay up-to-date on Cabin's latest events</Body1>
      </SubscribeInstructions>
      <FormContainer>
        <SubscribeForm />
      </FormContainer>
    </SubscribeSectionContainer>
  )
}

const SubscribeSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    gap: 0;
    padding: 4rem 0rem;
    width: 80rem;
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
