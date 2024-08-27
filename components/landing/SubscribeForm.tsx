import styled from 'styled-components'
import React, { FormEvent, useState } from 'react'
import { InputText } from '@/components/core/InputText'
import analytics from '@/lib/googleAnalytics/analytics'
import { Button } from '@/components/core/Button'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { useError } from '@/components/hooks/useError'
import { Body1 } from '@/components/core/Typography'
import { useBackend } from '@/components/hooks/useBackend'
import {
  SubscribeParams,
  SubscribeResponse,
} from '@/pages/api/v2/newsletter/subscribe'

export const SubscribeForm = () => {
  const { showError } = useError()
  const { post } = useBackend()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    analytics.subscribeToNewsletterEvent(email)

    const res = await post<SubscribeResponse>('NEWSLETTER_SUBSCRIBE', {
      email: email,
    } satisfies SubscribeParams)

    if (res && res.success) {
      setIsSubscribed(true)
    } else {
      showError(res.message)
    }
    setIsLoading(false)
  }

  return isSubscribed ? (
    <Body1 $color={'green700'}>Thanks for subscribing!</Body1>
  ) : (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <InputText
          required
          value={email}
          placeholder={'Email'}
          onChange={handleEmailChange}
        />
        <StyledButton disabled={isLoading} variant="secondary">
          {isLoading ? (
            <>
              <LoadingSpinner />
              &nbsp; {/* this keeps the button height from collapsing */}
            </>
          ) : (
            'Subscribe'
          )}
        </StyledButton>
      </InputGroup>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    align-items: flex-end;
  }
`

const StyledButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: min-content;
  }
`
