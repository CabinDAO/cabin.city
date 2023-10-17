import styled from 'styled-components'
import React, { FormEvent, useState } from 'react'
import { InputText } from '@/components/core/InputText'
import events from '@/lib/googleAnalytics/events'
import { Button } from '@/components/core/Button'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { useError } from '@/components/hooks/useError'
import { Body1 } from '@/components/core/Typography'

export const SubscribeForm = () => {
  const { showError } = useError()

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    events.subscribeToNewsletterEvent(email)

    const res: any = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })

    if (!res.ok) {
      showError('An unexpected error occurred.')
      setIsLoading(false)
      return
    }

    const resBody = await res.json()

    if (resBody && resBody.success) {
      setIsSubscribed(true)
    } else {
      setIsLoading(false)
      showError(resBody.message)
    }
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
        <StyledButton disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : 'Subscribe'}
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

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }
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
  ${({ theme }) => theme.bp.sm_max} {
    width: 100%;
  }
`
