import styled from 'styled-components'

interface ChevronButtonProps {
  open?: boolean
}

export const ChevronButton = styled.div<ChevronButtonProps>`
  cursor: pointer;
  transition: all 0.3s linear;
  transform: rotate(${(props) => (props.open ? 180 : 0)}deg);
`
