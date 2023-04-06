import { useState } from 'react'
import Icon, { IconName } from './Icon'
import IconButton from './IconButton'
import styled from 'styled-components'
import { Caption } from './Typography'
import { pxToRem } from '@/utils/display-utils'

type MenuOption = {
  label: string
  onClick: () => void
  icon?: IconName
}

interface MoreMenuProps {
  options: MenuOption[]
}

const MENU_WIDTH = 163
const MORE_MENU_ICON_SIZE = 16

export const MoreMenu = ({ options }: MoreMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = (option: MenuOption) => {
    option.onClick()
    setIsOpen(false)
  }

  return (
    <>
      <IconButton
        addHoverState
        icon="more-menu"
        size={MORE_MENU_ICON_SIZE / 10}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <MenuList>
          {options.map((option) => (
            <MenuOption
              key={option.label}
              onClick={() => handleOnClick(option)}
            >
              {option.icon && <Icon name={option.icon} size={1.2} />}
              <Caption emphasized>{option.label}</Caption>
            </MenuOption>
          ))}
        </MenuList>
      )}
    </>
  )
}

const MenuList = styled.div`
  position: absolute;
  z-index: 100;
  left: -${pxToRem(MENU_WIDTH - MORE_MENU_ICON_SIZE)}rem;
  top: calc(100% + 0.4rem);
  display: flex;
  flex-direction: column;
  width: ${pxToRem(MENU_WIDTH)}rem;
  border: 1px solid ${({ theme }) => theme.colors.green900};
`

const MenuOption = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.06rem;
  padding: 1.4rem 1.06rem;
  background-color: ${({ theme }) => theme.colors.white};
`
