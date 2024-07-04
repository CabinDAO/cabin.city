import {
  ChangeEvent,
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  Ref,
  forwardRef,
  useRef,
} from 'react'
import styled from 'styled-components'
import { InputBase } from './InputBase'
import { subline2Styles } from './Typography'

const StyledInput = styled.input<{ disabled: boolean }>`
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

  ${(props) => {
    if (props.disabled) {
      return `
        cursor: not-allowed;
        opacity: 0.75;
        user-select: none;
        `
    }
  }}
`

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  required?: boolean
  info?: string
  placeholder?: string
  error?: boolean
  outlined?: boolean
  disabled?: boolean
  className?: string
  errorMessage?: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  helperText?: string
  bottomHelpText?: string
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      id,
      label,
      required,
      info,
      placeholder,
      value,
      error,
      outlined,
      disabled,
      errorMessage,
      endAdornment,
      helperText,
      bottomHelpText,
      className,
      onChange,
      startAdornment,
      ...props
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLInputElement>()
    // const inputRef = forwardedRef || fallbackRef

    const handleOnParentClick = () => {
      localRef?.current?.focus()
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
        outlined={outlined}
        errorMessage={errorMessage}
        helperText={helperText}
        bottomHelpText={bottomHelpText}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        onClick={handleOnParentClick}
        className={className}
      >
        <StyledInput
          id={id}
          ref={assignRefs(forwardedRef, localRef)}
          type="text"
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          disabled={!!disabled}
          {...props}
        />
      </InputBase>
    )
  }
)

InputText.displayName = 'InputText'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const assignRefs = <T extends unknown>(...refs: Ref<T | null>[]) => {
  return (node: T | null) => {
    refs.forEach((r) => {
      if (typeof r === 'function') {
        r(node)
      } else if (r) {
        ;(r as MutableRefObject<T | null>).current = node
      }
    })
  }
}
