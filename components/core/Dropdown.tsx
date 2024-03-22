import React, { useEffect, useState } from 'react'
import useDropdownLogic, { SelectOption } from '../hooks/useDropdownLogic'
import styled from 'styled-components'
import { ChevronButton } from './ChevronButton'
import ClickAway from './ClickAway'
import Icon from './Icon'
import { InputBase } from './InputBase'
import ListElement from './ListElement'
import { Menu, MenuPopup, MenuSection } from './Menu'
import { Subline2 } from './Typography'
import { InputText } from './InputText'
import { Avatar } from './Avatar'

const Container = styled.div`
  position: relative;
`

const StyledSelect = styled.div`
  width: 100%;
  height: 100%;
  outline: none;
  height: 1.6rem;
  display: block;
`

interface DropdownProps {
  id?: string
  label?: string
  required?: boolean
  info?: string
  placeholder?: string
  selectedOption?: SelectOption
  error?: boolean
  disabled?: boolean
  onSelect: (_opt: SelectOption) => void
  onRemove?: (_opt: SelectOption) => void
  options: SelectOption[]
  multiple?: boolean
  variant?: 'primary' | 'secondary'
  message?: string
  menuMaxHeight?: number
  className?: string
  enableSearch?: boolean
  onSearch?: (value: string) => void
}

export const Dropdown = ({
  id = 'input',
  label,
  required,
  info,
  placeholder,
  selectedOption,
  error,
  disabled,
  onSelect,
  options,
  variant = 'primary',
  menuMaxHeight,
  enableSearch,
  className,
  onSearch,
}: DropdownProps) => {
  const {
    selectionRef,
    active,
    open,
    focusOption,
    showFocusOption,
    toggleOpen,
    handleSoftClose,
    setActive,
    handleOptionSelect,
    handleSearchInputChange,
    searchInput,
    displayOptions,
  } = useDropdownLogic(selectedOption, options, onSelect, onSearch)

  const [
    displaySelectedOptionStartAdornment,
    setDisplaySelectedOptionStartAdornment,
  ] = useState(false)

  useEffect(() => {
    setDisplaySelectedOptionStartAdornment(!!selectedOption?.imageSrc)
  }, [selectedOption])

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplaySelectedOptionStartAdornment(false)
    handleSearchInputChange(e.target.value)
  }

  return (
    <ClickAway className={className} onClickAway={handleSoftClose}>
      <Container
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onClick={toggleOpen}
      >
        {enableSearch ? (
          <InputText
            value={searchInput ?? (selectedOption?.label || '')}
            placeholder={placeholder}
            onChange={handleOnSearch}
            label={label}
            onClick={toggleOpen}
            startAdornment={
              displaySelectedOptionStartAdornment && (
                <Avatar src={selectedOption?.imageSrc} size={3.2} />
              )
            }
            endAdornment={<SearchIcon name="search" size={1.4} />}
          />
        ) : (
          <InputBase
            id={id}
            label={label}
            required={required}
            info={info}
            filled={variant === 'primary' && !!selectedOption}
            focused={active} // if active keep parent focus status
            error={error}
            disabled={disabled}
            endAdornment={
              <ChevronButton role="button" open={open}>
                <Icon name="chevron-down" size={1.4} />
              </ChevronButton>
            }
          >
            <StyledSelect ref={selectionRef} role="button" tabIndex={0}>
              {selectedOption ? (
                <Subline2>{selectedOption.label}</Subline2>
              ) : (
                <OpaqueSubline2 $color="green900">{placeholder}</OpaqueSubline2>
              )}
            </StyledSelect>
          </InputBase>
        )}
        <MenuPopup
          open={open && !disabled && displayOptions.length > 0}
          fullWidth
        >
          <Menu maxHeight={menuMaxHeight}>
            <MenuSection>
              {displayOptions.map((opt, idx) => {
                return (
                  <ListElement
                    key={idx}
                    label={opt.label}
                    leadingIcon={opt.icon}
                    imageSrc={opt.imageSrc}
                    showLeadingIcon={!!opt.icon || !!opt.imageSrc}
                    onClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => {
                      e.stopPropagation()
                      handleOptionSelect(opt)
                    }}
                    active={
                      selectedOption?.value === opt.value && focusOption !== idx
                    }
                    focused={showFocusOption && focusOption === idx}
                    disabled={opt.disabled}
                  />
                )
              })}
            </MenuSection>
          </Menu>
        </MenuPopup>
      </Container>
    </ClickAway>
  )
}

const OpaqueSubline2 = styled(Subline2)`
  opacity: 0.42;
`

const SearchIcon = styled(Icon)`
  cursor: pointer;
`

Dropdown.displayName = 'Dropdown'
