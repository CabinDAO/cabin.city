import {
  ChangeEvent,
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  useRef,
} from 'react'
import styled from 'styled-components'
import { InputBase } from './InputBase'
import { subline2Styles } from './Typography'

const StyledInput = styled.input`
  ${subline2Styles}
  display: block;
  width: 100%;
  outline: none;
  border: 0;
  background-color: transparent;
  -moz-appearance: textfield;

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

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  required?: boolean
  info?: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  message?: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  helperText?: string
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void
}

export const InputText = ({
  id = 'input',
  label,
  required,
  info,
  placeholder,
  value,
  error,
  disabled,
  message,
  endAdornment,
  helperText,
  onChange,
  ...props
}: InputTextProps) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleOnParentClick = () => {
    inputRef?.current.focus()
  }

  return (
    <InputBase
      id={id}
      label={label}
      required={required}
      info={info}
      filled={!!value}
      error={error}
      disabled={disabled}
      message={message}
      helperText={helperText}
      endAdornment={endAdornment}
      onClick={handleOnParentClick}
    >
      <StyledInput
        id={id}
        ref={inputRef}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        {...props}
      />
    </InputBase>
  )
}

InputText.displayName = 'InputText'
