import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { ChevronButton } from './ChevronButton'
import ClickAway from './ClickAway'
import Icon from './Icon'
import { Menu, MenuPopup, MenuSection } from './Menu'
import { NoWrap } from './NoWrap'
import { H5, Overline } from './Typography'

export interface SortProps<T> {
  fields: SortField<T>[]
  selectedOption: T
  onSelectOption: (option: SortOption<T>) => void
}

export interface SortField<T> {
  key: string
  label: string
  options: SortOption<T>[]
}

export interface SortOption<T> {
  key: T
  label: string
}

export const Sort = <T extends string | number>(props: SortProps<T>) => {
  const { fields, selectedOption, onSelectOption } = props
  const [open, setOpen] = useState(false)
  const [expandedField, setExpandedField] = useState<SortField<T> | null>(null)

  useEffect(() => {
    if (selectedOption) {
      const selectedField = fields.find((field) =>
        field.options.some((option) => option.key === selectedOption)
      )
      if (selectedField) {
        setExpandedField(selectedField)
      }
    }
  }, [selectedOption, fields])

  const handleSoftClose = () => {
    setOpen(false)
  }

  const handleToggleField = (field: SortField<T>) => {
    if (field === expandedField) {
      setExpandedField(null)
    } else {
      setExpandedField(field)
    }
  }

  const handleSelectOption = (option: SortOption<T>) => {
    onSelectOption(option)
    setOpen(false)
  }

  return (
    <ClickAway onClickAway={handleSoftClose}>
      <Container>
        <Button
          variant="link"
          onClick={() => setOpen(!open)}
          endAdornment={
            <ChevronButton role="button" open={open}>
              <Icon name="chevron-down" size={1.4} />
            </ChevronButton>
          }
        >
          <Overline>Sort</Overline>
        </Button>
        <SortMenuPop open={open}>
          <Menu backgroundColor="yellow100">
            <SortMenuSection>
              {fields.map((field) => (
                <SortSection
                  key={field.key}
                  selectedOption={selectedOption}
                  field={field}
                  isOpen={field === expandedField}
                  onSelectOption={handleSelectOption}
                  onToggleField={handleToggleField}
                />
              ))}
            </SortMenuSection>
          </Menu>
        </SortMenuPop>
      </Container>
    </ClickAway>
  )
}

const Container = styled.div`
  position: relative;
`

const SortMenuSection = styled(MenuSection)`
  padding: 1.6rem 2.4rem;
  gap: 1.6rem;
`

interface SortSectionProps<T> {
  selectedOption: T
  field: SortField<T>
  isOpen: boolean
  onToggleField: (field: SortField<T>) => void
  onSelectOption: (option: SortOption<T>) => void
}

const SortSection = <T extends string | number>(props: SortSectionProps<T>) => {
  const { selectedOption, field, isOpen, onToggleField, onSelectOption } = props

  return (
    <div>
      <SortFieldButton onClick={() => onToggleField(field)}>
        <H5>
          <NoWrap>{field.label}</NoWrap>
        </H5>
        <ChevronButton role="button" open={isOpen}>
          <Icon name="chevron-down" size={1.4} />
        </ChevronButton>
      </SortFieldButton>
      {isOpen && (
        <RadioButtonGroup>
          {field.options.map((option) => (
            <RadioButtonLabel key={option.key}>
              <RadioButton
                checked={option.key === selectedOption}
                name={field.key}
                type="radio"
                value={option.key}
                onChange={() => onSelectOption(option)}
              />
              <H5>{option.label}</H5>
            </RadioButtonLabel>
          ))}
        </RadioButtonGroup>
      )}
    </div>
  )
}

const SortFieldButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 26rem;
  cursor: pointer;
`

const RadioButtonGroup = styled.div`
  margin-top: 2rem;
  padding-bottom: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-bottom: ${(props) => props.theme.border.light};
`

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  font-size: 1.6rem;
`

const RadioButton = styled.input`
  width: 2.4rem;
  height: 2.4rem;
  accent-color: ${(props) => props.theme.colors.green900};
`

const SortMenuPop = styled(MenuPopup)`
  left: -21rem;
  top: calc(100% + 0.4rem);

  ${({ theme }) => theme.bp.lg} {
    left: 0rem;
    top: calc(100% + 0.4rem);
  }
`
