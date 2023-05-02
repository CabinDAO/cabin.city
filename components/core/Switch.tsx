import { useState } from 'react'
import styled from 'styled-components'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Switch = ({ checked, onChange }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleClick = () => {
    setIsChecked(!isChecked)
    onChange(!isChecked)
  }

  return (
    <Container onClick={handleClick}>
      <SwitchBase checked={isChecked} />
      <Circle checked={isChecked}></Circle>
    </Container>
  )
}

interface ComponentProps {
  checked: boolean
}

const Container = styled.div`
  display: flex;
  width: 4rem;
  cursor: pointer;
  position: relative;
  align-items: center;
  height: 2.4rem;
`

const SwitchBase = styled.div<ComponentProps>`
  display: flex;
  width: 100%;
  height: 1.6rem;
  border-radius: 5rem;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.green400 : theme.colors.yellow200};
  transition: all 0.2s ease-in-out;
`

const Circle = styled.div<ComponentProps>`
  position: absolute;
  display: flex;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.green100 : theme.colors.white};
  top: 0;
  left: ${({ checked }) => (checked ? '1.6rem' : '0')};
  transition: all 0.2s ease-in-out;
`
