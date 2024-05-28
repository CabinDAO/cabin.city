import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { IconName } from '@/components/core/Icon'
import lodash from 'lodash'

export interface SelectOption {
  label: string
  value: string | number | boolean
  icon?: IconName
  disabled?: boolean
  imageSrc?: string
}

const useDropdownLogic = (
  value: SelectOption[] | SelectOption | undefined,
  defaultOptions: SelectOption[],
  onSelect: (_opt: SelectOption) => void,
  onSearch?: (value: string) => void,
  onDelete?: VoidFunction
) => {
  const [options, _setOptions] = useState<SelectOption[]>(defaultOptions)
  const [active, _setActive] = useState(false)
  const [open, _setOpen] = useState(false)
  const [focusOption, _setFocusOption] = useState<number>(-1)
  const [showFocusOption, _setShowFocusOption] = useState(false)
  const [searchInput, setSearchInput] = useState<string | undefined | null>(
    null
  )
  const [filteredOptions, _setFilteredOptions] =
    useState<SelectOption[]>(options)

  const selectionRef = useRef() as MutableRefObject<
    HTMLDivElement | HTMLInputElement
  >
  const openStateRef = useRef(open)
  const activeStateRef = useRef(active)
  const focusOptionStateRef = useRef(focusOption)
  const showFocusOptionStateRef = useRef(showFocusOption)
  const optionsStateRef = useRef(filteredOptions)
  const filteredOptionsStateRef = useRef(filteredOptions)

  const setOptions = (state: SelectOption[]) => {
    optionsStateRef.current = state
    _setOptions(state)
  }

  const setFilteredOptions = (state: SelectOption[]) => {
    filteredOptionsStateRef.current = state
    _setFilteredOptions(state)
  }

  const setActive = (state: boolean) => {
    activeStateRef.current = state
    _setActive(state)
  }

  const setOpen = (state: boolean) => {
    openStateRef.current = state
    _setOpen(state)
    if (state) {
      selectionRef.current?.focus()
    }
  }

  const setFocusOption = (state: number) => {
    focusOptionStateRef.current = state
    _setFocusOption(state)
  }

  const setShowFocusOption = (state: boolean) => {
    showFocusOptionStateRef.current = state
    _setShowFocusOption(state)
  }

  const handleOpen = (op: boolean) => {
    // if theres value, set focus option to the value index, otherwise set to 0
    const val = Array.isArray(value) ? value[0] : value
    if (val) {
      const currentOptIdx = filteredOptions.findIndex(
        (opt) => opt.value === val.value
      )
      setFocusOption(currentOptIdx)
    } else {
      setFocusOption(0)
    }

    if (!op) {
      setShowFocusOption(false)
      setOpen(false)
    } else {
      setOpen(true)
      selectionRef.current?.focus()
    }
  }

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value)

    if (value === '') {
      setFilteredOptions(options)
    } else if (value.length > 0) {
      if (onSearch) {
        lodash.debounce(onSearch, 500)(value)
        handleOpen(true)
      } else {
        const coincidentOptions = options.filter((opt) =>
          opt.label.toLowerCase().includes(value.toLowerCase())
        )
        if (coincidentOptions.length > 0) {
          handleOpen(true)
          setFocusOption(0)
        }
        setFilteredOptions(coincidentOptions)
      }
    }
  }

  const handleOptionSelect = (opt: SelectOption) => {
    handleOpen(false)
    setSearchInput(null)
    onSelect(opt)
  }

  const handleSoftClose = () => {
    if (open) {
      handleOpen(false)
    } else {
      selectionRef.current?.blur()
    }
  }

  // Keyboard control for input select
  const handleKeyPressed = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case 'ArrowUp':
        evt.preventDefault()
        if (focusOptionStateRef.current > 0) {
          setShowFocusOption(true)
          setFocusOption(focusOptionStateRef.current - 1)
        } else {
          handleOpen(false)
        }
        break
      case 'ArrowDown':
        evt.preventDefault()
        if (!openStateRef.current) {
          handleOpen(true)
          setShowFocusOption(true)
        } else {
          if (!showFocusOptionStateRef.current) {
            setShowFocusOption(true)
          } else if (
            focusOptionStateRef.current <
            filteredOptionsStateRef.current.length - 1
          ) {
            setFocusOption(focusOptionStateRef.current + 1)
          }
        }
        break
      case 'Enter':
        evt.preventDefault()
        if (openStateRef.current) {
          if (filteredOptionsStateRef.current[focusOptionStateRef.current]) {
            handleOptionSelect(
              filteredOptionsStateRef.current[focusOptionStateRef.current]
            )
          }
        } else {
          handleOpen(true)
          setShowFocusOption(true)
        }
        break
      case 'Escape':
        evt.preventDefault()
        handleSoftClose()
        break
      case 'Backspace':
        onDelete && onDelete()
        break
      default:
        break
    }
  }

  // Update internal options when parent options change
  useEffect(() => {
    setOptions(defaultOptions)
    setFilteredOptions(defaultOptions)
  }, [defaultOptions])

  // When dropdown is active then start listening on keyboard
  useEffect(() => {
    if (active) {
      window.addEventListener('keydown', handleKeyPressed)
    } else {
      window.removeEventListener('keydown', handleKeyPressed)
    }

    // on unmount remove any remaining listener
    return () => {
      window.removeEventListener('keydown', handleKeyPressed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const toggleOpen = () => {
    handleOpen(!open)
  }

  return {
    toggleOpen,
    handleSoftClose,
    setActive,
    setOpen,
    handleOpen,
    setFocusOption,
    setShowFocusOption,
    active,
    open,
    selectionRef,
    handleOptionSelect,
    handleSearchInputChange,
    focusOption,
    showFocusOption,
    setOptions,
    searchInput,
    displayOptions: filteredOptions.length > 0 ? filteredOptions : options,
  }
}

export default useDropdownLogic
