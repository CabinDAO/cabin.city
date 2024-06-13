import styled from 'styled-components'
import { Caption, Subline1 } from './Typography'

const InputDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const InputHelperText = styled(Caption)`
  opacity: 0.75;
`

export const InputLabel = ({
  label,
  helperText,
  required = false,
}: {
  label?: string
  helperText?: string
  required?: boolean
}) => (
  <InputDescriptionContainer>
    {label && <Subline1>{`${label} ${required ? '*' : ''}`}</Subline1>}
    {helperText && <InputHelperText>{helperText}</InputHelperText>}
  </InputDescriptionContainer>
)
