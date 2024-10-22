import {
  ChangeEvent,
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  useRef,
} from 'react'
import styled from 'styled-components'
import { InputBase, HelperTextPosition } from './InputBase'
import { body1Styles, subline2Styles } from './Typography'

type InputTextSize = 'large' | 'medium'

interface StyledInputTextAreaProps {
  textSize?: InputTextSize
}

const StyledInputTextArea = styled.textarea<StyledInputTextAreaProps>`
  ${({ textSize }) => (textSize === 'medium' ? subline2Styles : body1Styles)}
  display: block;
  width: 100%;
  outline: none;
  border: 0;
  background-color: transparent;
  -moz-appearance: textfield;
  resize: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.yellow900};
    opacity: 0.42;
  }

  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

interface InputTextProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  id?: string
  label?: string
  required?: boolean
  info?: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  errorMessage?: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  helperText?: string
  onChange?: (_e: ChangeEvent<HTMLTextAreaElement>) => void
  textSize?: InputTextSize
  helperTextPosition?: HelperTextPosition
  rows?: number
}

export const InputTextArea = ({
  id,
  label,
  required,
  info,
  placeholder,
  value,
  error,
  disabled,
  errorMessage,
  endAdornment,
  helperText,
  textSize = 'medium',
  onChange,
  helperTextPosition = 'right',
  rows,
  ...props
}: InputTextProps) => {
  const inputRef = useRef() as MutableRefObject<HTMLTextAreaElement>

  const handleOnParentClick = () => {
    inputRef?.current.focus()
  }

  return (
    <InputBase
      helperTextPosition={helperTextPosition}
      id={id}
      label={label}
      required={required}
      info={info}
      filled={!!value}
      error={error}
      disabled={disabled}
      errorMessage={errorMessage}
      helperText={helperText}
      endAdornment={endAdornment}
      onClick={handleOnParentClick}
    >
      <StyledInputTextArea
        textSize={textSize}
        id={id}
        ref={inputRef}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        rows={rows}
        {...props}
      />
    </InputBase>
  )
}

InputTextArea.displayName = 'InputTextArea'
