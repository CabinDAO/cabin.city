import { Caption } from '../core/Typography'
import styled from 'styled-components'
import { MessageProps } from './LoginModal'

export const Message = (props: MessageProps) => {
  const { children, error } = props
  return (
    <MessageContainer {...props}>
      <Caption emphasized $color={error ? 'red700' : 'green900'}>
        {children}
      </Caption>
    </MessageContainer>
  )
}
const MessageContainer = styled.div<MessageProps>`
  background-color: ${({ theme, error }) =>
    error ? theme.colors.red200 : 'rgba(29, 43, 42, 0.05)'};
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.6rem;

  ${({ theme }) => theme.bp.md} {
    padding: 0.8rem 3.5rem;
  }
`
