import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { ChevronButton } from './ChevronButton'
import ClickAway from './ClickAway'
import { FilterCount } from './FilterCount'
import Icon from './Icon'
import { Menu, MenuPopup, MenuSection } from './Menu'
import { H5 } from './Typography'

interface FilterProps<T> {
  label: ReactNode
  options: FilterOption<T>[]
  selections: T[]
  onApply: (selections: T[]) => void
}

export interface FilterOption<T> {
  label: ReactNode
  value: T
}

export const Filter = <T extends string | number>(props: FilterProps<T>) => {
  const { label, options, selections, onApply } = props
  const [selectedOptionValues, setSelectedOptionValues] = useState<T[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Allows the parent to control selectedOptionValues
    // Also resets the selectedOptionValues when the filter is closed without applying
    if (open) {
      setSelectedOptionValues(selections)
    }
  }, [selections, open])

  const handleSelect = (value: T) => {
    if (selectedOptionValues.includes(value)) {
      setSelectedOptionValues(
        selectedOptionValues.filter((selectedValue) => selectedValue !== value)
      )
    } else {
      setSelectedOptionValues([...selectedOptionValues, value])
    }
  }

  const handleApply = () => {
    onApply(selectedOptionValues)
    setOpen(false)
  }

  const handleSoftClose = () => {
    setOpen(false)
  }

  return (
    <ClickAway onClickAway={handleSoftClose}>
      <Container>
        <Button
          variant="tertiary"
          isActive={open || selections.length > 0}
          onClick={() => setOpen(!open)}
          endAdornment={
            <ChevronButton role="button" open={selections.length === 0 && open}>
              {selections.length > 0 ? (
                <FilterCount count={selections.length} />
              ) : (
                <Icon name="chevron-down" size={1.4} />
              )}
            </ChevronButton>
          }
        >
          {label}
        </Button>
        <StyledMenuPop open={open}>
          <Menu backgroundColor="yellow100">
            <FilterMenuSection>
              <List>
                {options.map((option) => (
                  <ListOption
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                  >
                    <Checkbox
                      selected={selectedOptionValues.includes(option.value)}
                    />
                    <H5>{option.label}</H5>
                  </ListOption>
                ))}
              </List>
              <Button onClick={handleApply}>Apply</Button>
            </FilterMenuSection>
          </Menu>
        </StyledMenuPop>
      </Container>
    </ClickAway>
  )
}

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding-top: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    gap: 0.8rem;
    margin-top: 0rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    padding-top: 2.4rem;
  }
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  button {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;

    button {
      width: auto;
    }
  }
`

const Container = styled.div`
  position: relative;
  width: 100%;
`

const List = styled.div`
  margin-bottom: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${({ theme }) => theme.bp.lg} {
    gap: 2rem;
  }
`

const FilterMenuSection = styled(MenuSection)`
  padding: 1.6rem 2.4rem;
  min-width: 25.6rem;
`

interface ListOptionProps {
  children: React.ReactNode
  onClick?: () => void
}

const ListOption = (props: ListOptionProps) => {
  const { children, onClick } = props
  return <ListOptionContainer onClick={onClick}>{children}</ListOptionContainer>
}

const ListOptionContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  white-space: nowrap;
`

const StyledMenuPop = styled(MenuPopup)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
  }
`
