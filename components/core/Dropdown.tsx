import styled from 'styled-components'
import useDropdownLogic, { SelectOption } from '../hooks/useDropdownLogic'
import { ChevronButton } from './ChevronButton'
import ClickAway from './ClickAway'
import Icon from './Icon'
import { InputBase } from './InputBase'
import ListElement from './ListElement'
import { Menu, MenuPopup, MenuSection } from './Menu'
import { Subline2 } from './Typography'

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
  message,
  menuMaxHeight,
  className,
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
  } = useDropdownLogic(selectedOption, options, onSelect)
  return (
    <ClickAway className={className} onClickAway={handleSoftClose}>
      <Container onFocus={() => setActive(true)}>
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
          onClick={toggleOpen}
          message={message}
        >
          <StyledSelect ref={selectionRef} role="button" tabIndex={0}>
            {selectedOption ? (
              <Subline2>{selectedOption.label}</Subline2>
            ) : (
              <OpaqueSubline2 $color="green900">{placeholder}</OpaqueSubline2>
            )}
          </StyledSelect>
        </InputBase>
        <MenuPopup open={open && !disabled} fullWidth>
          <Menu maxHeight={menuMaxHeight}>
            <MenuSection>
              {options.map((opt, idx) => {
                return (
                  <ListElement
                    key={idx}
                    label={opt.label}
                    leadingIcon={opt.icon}
                    showLeadingIcon
                    onClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => {
                      e.stopPropagation()
                      handleOptionSelect(opt)
                    }}
                    active={selectedOption?.value === opt.value || true}
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

Dropdown.displayName = 'Dropdown'
