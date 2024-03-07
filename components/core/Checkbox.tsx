import styled from 'styled-components'
import Icon from './Icon'

interface CheckboxProps {
  selected: boolean
  disabled?: boolean
  onClick?: VoidFunction
}

export const Checkbox = (props: CheckboxProps) => {
  const iconColor = props.selected ? 'white' : 'green900'

  return (
    <Container {...props}>
      {props.selected && <Icon color={iconColor} name="check" size={1.5} />}
    </Container>
  )
}

const Container = styled.div<CheckboxProps>`
  display: flex;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.green800 : theme.colors.white};
  border: solid 1px ${(props) => props.theme.colors.green900};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`
