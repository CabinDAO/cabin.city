import styled from 'styled-components'
import { Button, ButtonProps } from '@/components/core/Button'
import { InputText, InputTextProps } from '@/components/core/InputText'

interface InputButtonProps extends Omit<InputTextProps, 'label'> {
  buttonProps?: Omit<ButtonProps, 'children'>
}

export const InputButton = ({
  buttonProps,
  children,
  className,
  ...inputTextProps
}: InputButtonProps) => (
  <InputButtonContainer className={className}>
    <StyledInputText outlined={false} {...inputTextProps} />
    <StyledButton variant="tertiary" {...buttonProps}>
      {children}
    </StyledButton>
  </InputButtonContainer>
)

export const InputButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.yellow900};
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 31.2rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 40rem;
  }
`

export const StyledInputText = styled(InputText)`
  border-right: solid 0.1rem ${({ theme }) => theme.colors.yellow900};
  height: 100%;
`

export const StyledButton = styled(Button)`
  height: 100%;
  border: none;

  &:hover {
    border: none;
  }
`
