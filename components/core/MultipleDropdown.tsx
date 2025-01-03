import styled from 'styled-components'
import useDropdownLogic, {
  SelectOption,
} from '@/components/hooks/useDropdownLogic'
import { ChevronButton } from './ChevronButton'
import ClickAway from './ClickAway'
import Icon from './Icon'
import { InputBase } from './InputBase'
import ListElement from './ListElement'
import { Menu, MenuPopup, MenuSection } from './Menu'
import { Subline2 } from './Typography'

export const MultipleDropdown = ({
  id,
  label,
  required,
  info,
  placeholder,
  selectedOptions = [],
  error,
  disabled,
  onSelect,
  options,
  variant = 'primary',
  message,
  menuMaxHeight,
  className,
}: {
  id?: string
  label?: string
  required?: boolean
  info?: string
  placeholder?: string
  selectedOptions?: SelectOption[]
  error?: boolean
  disabled?: boolean
  onSelect: (_opt: SelectOption) => void
  options: SelectOption[]
  multiple?: boolean
  variant?: 'primary' | 'secondary'
  message?: string
  menuMaxHeight?: string
  className?: string
}) => {
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
  } = useDropdownLogic(selectedOptions, options, onSelect)
  const values = selectedOptions.map((opt) => opt.value)
  const labels = selectedOptions.map((opt) => opt.label)
  return (
    <ClickAway className={className} onClickAway={handleSoftClose}>
      <Container
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        <InputBase
          id={id}
          label={label}
          required={required}
          info={info}
          filled={variant === 'primary' && selectedOptions.length > 0}
          focused={active} // if active keep parent focus status
          error={error}
          disabled={disabled}
          endAdornment={
            <ChevronButton role="button" open={open}>
              <Icon name="chevron-down" size={1.4} />
            </ChevronButton>
          }
          onClick={toggleOpen}
          errorMessage={message}
        >
          <StyledSelect ref={selectionRef} role="button" tabIndex={0}>
            {selectedOptions.length > 0 ? (
              <Subline2>{labels.join(', ')}</Subline2>
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
                    showLeadingIcon
                    onClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => {
                      e.stopPropagation()
                      handleOptionSelect(opt)
                    }}
                    active={values.includes(opt.value)}
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

MultipleDropdown.displayName = 'MultipleDropdown'

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

const OpaqueSubline2 = styled(Subline2)`
  opacity: 0.42;
`
