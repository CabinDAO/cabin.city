import styled from 'styled-components'
import { Caption, formLabelStyles } from './Typography'

const InputDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const InputLabelContainer = styled.div`
  ${formLabelStyles}
`

const InputHelperText = styled(Caption)`
  opacity: 0.75;
`

interface InputLabelProps {
  label?: string
  helperText?: string
  required: boolean
}
export const InputLabel = ({
  required,
  label,
  helperText,
}: InputLabelProps) => (
  <InputDescriptionContainer>
    {label && (
      <InputLabelContainer>{`${label} ${
        required ? '*' : ''
      }`}</InputLabelContainer>
    )}
    {helperText && <InputHelperText>{helperText}</InputHelperText>}
  </InputDescriptionContainer>
)
