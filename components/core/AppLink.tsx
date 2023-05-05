import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Icon, { IconName } from './Icon'

interface AppLinkProps {
  location: string
  external?: boolean
  children: ReactNode
  iconName?: IconName
  iconSize?: number
  className?: string
}

export const AppLink = ({
  location,
  children,
  external,
  className,
  iconName = 'chevron-right',
  iconSize = 1,
}: AppLinkProps) => {
  iconName = external ? 'up-right-arrow' : iconName

  if (external) {
    return (
      <StyledAnchor
        className={className}
        href={location}
        target="_blank"
        rel="noreferrer"
      >
        {children}
        {!!iconSize && <Icon name={iconName} size={iconSize} />}
      </StyledAnchor>
    )
  } else {
    return (
      <StyledLink className={className} href={location}>
        {children}
        {!!iconSize && <Icon name={iconName} size={iconSize} />}
      </StyledLink>
    )
  }
}

const linkStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.59rem;
  justify-content: flex-start;

  svg {
    transition: transform 0.15s linear;
  }

  &:hover {
    svg {
      transform: translateX(0.3rem);
    }
  }
`

const StyledAnchor = styled.a`
  ${linkStyles}
`

const StyledLink = styled(Link)`
  ${linkStyles}
  align-items: center;
`
