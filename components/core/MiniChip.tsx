import styled from 'styled-components'
import { Subline1 } from './Typography'

interface MiniChipProps {
  selected: boolean
  label: string
  onClick?: () => void
  className?: string
}

export const MiniChip = ({
  selected,
  label,
  onClick,
  className,
}: MiniChipProps) => {
  return (
    <Container className={className} selected={selected} onClick={onClick}>
      <Subline1 $color="yellow900">{label}</Subline1>
    </Container>
  )
}

interface ContainerProps {
  selected: boolean
}

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  padding: 1.1rem 1.6rem;
  border-width: 1px 2px 2px 1px;
  border-style: solid;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.yellow900 : theme.colors.yellow500};
  border-radius: 16px 0px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.yellow300 : theme.colors.yellow200};
  text-align: center;
  width: max-content;

  &:hover {
    border-width: 2px 1px 1px 2px;
  }
`
