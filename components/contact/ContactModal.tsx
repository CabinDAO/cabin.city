import { useState } from 'react'
import { useError } from '@/components/hooks/useError'
import { useModal } from '@/components/hooks/useModal'
import { useBackend } from '@/components/hooks/useBackend'
import { MessageNewParamsType, MessageNewResponse } from '@/utils/types/message'
import { MeFragment, ProfileBasicFragment } from '@/utils/types/profile'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { Button } from '@/components/core/Button'
import { InputTextArea } from '@/components/core/InputTextArea'
import { Body1 } from '@/components/core/Typography'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { sendMessageButtonClickEvent } from '@/lib/googleAnalytics/analytics'
import Icon from '@/components/core/Icon'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'

export const ContactModal = ({
  sender,
  recipient,
}: {
  sender: MeFragment | null
  recipient: ProfileBasicFragment
}) => {
  const { post } = useBackend()
  const { hideModal } = useModal()
  const { showError } = useError()

  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  if (!sender) {
    return (
      <Container>
        <ModalTitle text={`Message ${recipient.name}`} />
        <InputWrap>
          <Body1>You must be logged in to send messages</Body1>
          <AuthenticatedLink
            href={expandRoute(['profile_id', { id: recipient.externId }])}
          >
            <Button variant={'primary'}>Log in or Sign up</Button>
          </AuthenticatedLink>
        </InputWrap>
      </Container>
    )
  }

  const handleSend = async () => {
    if (!text) {
      showError('Write something first')
      return
    }

    setLoading(true)

    sendMessageButtonClickEvent(sender.externId, recipient.externId)

    const res = await post<MessageNewResponse>(`api_message_new`, {
      recipientExternId: recipient.externId,
      text,
    } satisfies MessageNewParamsType)

    setLoading(false)

    if (!res || 'error' in res) {
      showError(res.error || 'Something went wrong')
      return
    }

    setSent(true)
    setTimeout(() => {
      hideModal()
    }, 1000)
  }

  return (
    <Container>
      <ModalTitle text={`Message ${recipient.name}`} />
      <InputWrap>
        {sent ? (
          <Success>
            <Icon name="check-circle-green" size={6} />
            <Body1>Message sent</Body1>
          </Success>
        ) : (
          <>
            <StyledInputTextArea
              autoFocus
              autoResize
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Actions>
              <Button variant="primary" onClick={handleSend}>
                {loading ? (
                  <>
                    <LoadingSpinner />
                    &nbsp; {/* this keeps the button height from collapsing */}
                  </>
                ) : (
                  'Send'
                )}
              </Button>
            </Actions>
          </>
        )}
      </InputWrap>
    </Container>
  )
}

const Container = styled(ModalContainer)`
  height: min-content;

  ${({ theme }) => theme.bp.md} {
    width: 70vw;
    max-width: 75rem;
  }
`

const StyledInputTextArea = styled(InputTextArea)`
  max-height: 45vh; // ModalContainer max-height is 70vh so lets keep this from auto-resizing to be too big
`

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 2rem;
`

const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

const Success = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
