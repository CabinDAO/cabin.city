import styled from 'styled-components'
import Icon, { IconName } from './Icon'
import { Subline2 } from './Typography'
import { Checkbox } from './Checkbox'
import { Avatar } from '@/components/profile/Avatar'

interface ContainerProps {
  active?: boolean
  focused?: boolean
  disabled?: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 1.2rem 1.6rem;
  cursor: pointer;
  outline: none;
  transition: all 200ms ease;
  width: 100%;
  height: 100%;
  background: transparent;
  color: ${(props) => props.theme.colors.yellow900};
  --icon-color: ${(props) => props.theme.colors.yellow900};
  :hover {
    background: ${(props) =>
      props.theme.colors.yellow100}BF; // 75% opacity suffix
    color: ${(props) => props.theme.colors.yellow900};
    --icon-color: ${(props) => props.theme.colors.yellow900};
  }
  :focus {
    background: ${(props) =>
      props.theme.colors.yellow100}BF; // 75% opacity suffix
    color: ${(props) => props.theme.colors.yellow900};
    --icon-color: ${(props) => props.theme.colors.yellow900};
  }
  ${(props) =>
    props.focused &&
    `
    background: ${props.theme.colors.yellow100}BF;
    color: ${props.theme.colors.yellow900};
    --icon-color: ${props.theme.colors.yellow900};
  `}
  :active {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.yellow900};
    --icon-color: ${(props) => props.theme.colors.yellow900};
  }
  ${(props) =>
    props.active &&
    `
      background: ${props.theme.colors.white};
      color: ${props.theme.colors.yellow900};
      --icon-color: ${props.theme.colors.yellow900};
      :focus {
        background: ${props.theme.colors.white};
        color: ${props.theme.colors.yellow900};
        --icon-color: ${props.theme.colors.yellow900};
      }
      ${
        props.focused &&
        `
        background: ${props.theme.colors.white};
        color: ${props.theme.colors.yellow900};
        --icon-color: ${props.theme.colors.yellow900};
      `
      }
      :hover {
        background: ${props.theme.colors.white};
        color: ${props.theme.colors.yellow900};
        --icon-color: ${props.theme.colors.yellow900};
      }
      :active {
        background: ${props.theme.colors.white};
        color: ${props.theme.colors.yellow900};
        --icon-color: ${props.theme.colors.yellow900};
      }
    `}
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.5;
    `}
`

const ElementSet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
`

interface ListElementProps {
  label: string
  imageSrc?: string
  leadingIcon?: IconName | null
  showLeadingIcon?: boolean
  trailingIcon?: IconName
  showTrailingIcon?: boolean
  active?: boolean
  disabled?: boolean
  focused?: boolean
  tabIndex?: number
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const ListElement = ({
  leadingIcon,
  label,
  active,
  disabled,
  focused,
  tabIndex,
  onClick,
  showLeadingIcon,
  imageSrc,
}: ListElementProps) => {
  return (
    <Container
      role="button"
      active={active}
      focused={focused}
      disabled={disabled}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <ElementSet>
        {showLeadingIcon && (
          <LeadingContent
            leadingIcon={leadingIcon}
            imageSrc={imageSrc}
            active={active}
            disabled={disabled}
          />
        )}
        <Subline2>{label}</Subline2>
      </ElementSet>
    </Container>
  )
}

interface LeadingContentProps {
  leadingIcon?: IconName | null
  imageSrc?: string
  active?: boolean
  disabled?: boolean
}

const LeadingContent = ({
  leadingIcon,
  imageSrc,
  active,
  disabled,
}: LeadingContentProps) => {
  if (leadingIcon) {
    return <Icon name={leadingIcon} size={1.6} />
  } else if (imageSrc) {
    return <Avatar size={3.2} src={imageSrc} />
  } else {
    return <Checkbox selected={!!active} disabled={disabled} />
  }
}

export default ListElement
