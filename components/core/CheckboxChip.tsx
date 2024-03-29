import styled from 'styled-components'
import { Checkbox } from './Checkbox'
import Icon, { IconName } from './Icon'
import { H5 } from './Typography'

interface CheckboxChipProps {
  selected: boolean
  label: string
  onSelect?: VoidFunction
  disabled?: boolean
  icon: IconName
}

export const CheckboxChip = ({
  selected,
  label,
  onSelect,
  icon,
  disabled = false,
}: CheckboxChipProps) => {
  return (
    <Container onClick={onSelect} selected={selected}>
      <CheckboxContainer>
        <Checkbox disabled={disabled} selected={selected} />
        <H5 $color="yellow900">{label}</H5>
      </CheckboxContainer>
      <IconContainer>
        <Icon name={icon} size={1.7} />
      </IconContainer>
    </Container>
  )
}

interface ContainerProps {
  selected: boolean
}

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 1.6rem;
  border-width: 1px 2px 2px 1px;
  border-style: solid;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.yellow900 : theme.colors.yellow500};
  border-radius: 16px 0px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.yellow300 : theme.colors.yellow200};
  align-items: center;
  justify-content: space-between;

  width: 100%;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    ${({ selected }) =>
      !selected && `background-color: rgba(254, 215, 162, 0.24);`}
  }

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    flex-direction: column;
    gap: 1.9rem;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    align-self: flex-start;
    gap: 0.8rem;
  }
`

const IconContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-self: center;
  gap: 1.6rem;

  --icon-color: ${({ theme }) => theme.colors.yellow600};

  ${({ theme }) => theme.bp.md} {
    align-self: flex-end;
    --icon-color: ${({ theme }) => theme.colors.yellow600};
  }
`
