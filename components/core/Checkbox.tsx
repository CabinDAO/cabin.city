import React from 'react'
import styled from 'styled-components'
import { Subline1 } from '@/components/core/Typography'
import Icon from './Icon'

interface CheckboxProps {
  selected: boolean
  label?: string
  disabled?: boolean
  onClick?: VoidFunction
}

export const Checkbox = (props: CheckboxProps) => {
  const iconColor = props.selected ? 'white' : 'green900'

  return (
    <>
      <Container {...props}>
        {props.selected && <Icon color={iconColor} name="check" size={1.5} />}
      </Container>
      {props.label && (
        <Subline1 onClick={props.onClick}>{props.label} </Subline1>
      )}
    </>
  )
}

const Container = styled.div<CheckboxProps>`
  display: flex;
  flex-shrink: 0;
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
