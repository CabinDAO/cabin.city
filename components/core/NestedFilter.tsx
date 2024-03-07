import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { ChevronButton } from './ChevronButton'
import ClickAway from './ClickAway'
import Icon from './Icon'
import { Menu, MenuPopup, MenuSection } from './Menu'
import { H5 } from './Typography'
import { FilterCount } from './FilterCount'

interface FilterProps<T1 extends string | number, T2> {
  label: ReactNode
  options: NestableFilterOption<T1, T2>[]
  selections: SelectedOptionValues<T1, T2>
  onApply: (selections: SelectedOptionValues<T1, T2>) => void
}

export interface NestableFilterOption<T1, T2> extends FilterOption<T1> {
  options?: FilterOption<T2>[]
}

export interface FilterOption<T> {
  label: ReactNode
  value: T
}

export type SelectedOptionValues<T1 extends string | number, T2> = {
  [key in T1]: T2[]
}

export const NestedFilter = <
  T1 extends string | number,
  T2 extends string | number
>(
  props: FilterProps<T1, T2>
) => {
  const { label, options, selections, onApply } = props
  const [selectedOptionValues, setSelectedOptionValues] = useState<
    SelectedOptionValues<T1, T2>
  >({} as SelectedOptionValues<T1, T2>)
  const [open, setOpen] = useState(false)
  const [currentOption, setCurrentOption] = useState<NestableFilterOption<
    T1,
    T2
  > | null>(null)

  useEffect(() => {
    // Allows the parent to control selectedOptionValues
    // Also resets the selectedOptionValues when the filter is closed without applying
    if (open) {
      setSelectedOptionValues(selections)
    }
  }, [selections, open])

  const handleSelect = (
    option: NestableFilterOption<T1, T2>,
    selection: FilterOption<T2>
  ) => {
    const selectedOptionValuesForKey = selectedOptionValues[option.value] ?? []

    let newValues: T2[]
    if (selectedOptionValuesForKey.includes(selection.value)) {
      newValues = selectedOptionValuesForKey.filter(
        (selectedValue) => selectedValue !== selection.value
      )
    } else {
      newValues = [...selectedOptionValuesForKey, selection.value]
    }

    const newSelections = {
      ...selectedOptionValues,
      [option.value]: newValues,
    }

    setSelectedOptionValues(newSelections)
  }

  const handleSoftClose = () => {
    setOpen(false)
  }

  const handleApply = () => {
    onApply(selectedOptionValues)
    setOpen(false)
  }

  const selectionCount = Object.values(selections).reduce(
    (acc, curr) => (acc as number) + (curr as T2[]).length,
    0
  ) as number

  return (
    <ClickAway onClickAway={handleSoftClose}>
      <Container>
        <Button
          variant="tertiary"
          isActive={open || selectionCount > 0}
          onClick={() => setOpen(!open)}
          endAdornment={
            <ChevronButton role="button" open={selectionCount === 0 && open}>
              {selectionCount > 0 ? (
                <FilterCount count={selectionCount} />
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
              {currentOption ? (
                <OptionsList
                  option={currentOption}
                  selections={selectedOptionValues}
                  onSelect={handleSelect}
                  onBack={() => setCurrentOption(null)}
                  onApply={handleApply}
                />
              ) : (
                <NestedOptionsList
                  options={options}
                  selections={selectedOptionValues}
                  onSelect={(o) => setCurrentOption(o)}
                  onApply={handleApply}
                />
              )}
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

interface NestedOptionsListProps<T1 extends string | number, T2> {
  options: NestableFilterOption<T1, T2>[]
  selections: SelectedOptionValues<T1, T2>
  onSelect: (option: NestableFilterOption<T1, T2>) => void
  onApply: VoidFunction
}
const NestedOptionsList = <T1 extends string | number, T2>(
  props: NestedOptionsListProps<T1, T2>
) => {
  const { options, onSelect, onApply } = props
  return (
    <>
      <List>
        {options.map((option) => {
          const selectedCount = props.selections[option.value]?.length ?? 0
          return (
            <NestedListOption
              key={option.value as string | number}
              onClick={() => onSelect(option)}
            >
              <NestedListOptionLabel>
                <H5>{option.label}</H5>
                {selectedCount > 0 ? (
                  <FilterCount count={selectedCount} />
                ) : null}
              </NestedListOptionLabel>
              <Icon name="chevron-right" size={1.5} />
            </NestedListOption>
          )
        })}
      </List>
      <Button onClick={onApply}>Apply</Button>
    </>
  )
}

interface OptionsListProps<T1 extends string | number, T2> {
  option: NestableFilterOption<T1, T2>
  selections: SelectedOptionValues<T1, T2>
  onSelect: (
    option: NestableFilterOption<T1, T2>,
    selection: FilterOption<T2>
  ) => void
  onBack: VoidFunction
  onApply?: VoidFunction
}
const OptionsList = <T1 extends string | number, T2>(
  props: OptionsListProps<T1, T2>
) => {
  const { option, selections, onSelect, onBack, onApply } = props

  const selectedOptionValues = selections[option.value] ?? []

  return (
    <>
      <OptionsListHeader onClick={onBack}>
        <Icon name="back-arrow" size={2.4} />
        <H5>{option.label}</H5>
      </OptionsListHeader>
      <List>
        {option.options?.map((o) => {
          const isSelected = selectedOptionValues.includes(o.value)
          return (
            <ListOption
              key={o.value as string | number}
              onClick={() => onSelect(option, o)}
            >
              <Checkbox selected={isSelected} />
              <H5>{o.label}</H5>
            </ListOption>
          )
        })}
      </List>
      <Button
        onClick={() => {
          onBack()
          onApply?.()
        }}
      >
        Apply
      </Button>
    </>
  )
}

const OptionsListHeader = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  margin-bottom: 2rem;
  cursor: pointer;
`

interface ListOptionProps {
  children: React.ReactNode
  onClick?: VoidFunction
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

const NestedListOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`

const NestedListOptionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`
