import { ColorName } from '@/styles/theme'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import Icon, { IconName } from './Icon'
import { AuthenticatedLink } from './AuthenticatedLink'
import { MenuItemsUnauthenticatedMap } from '@/utils/nav/types'

interface IconLinkProps extends HTMLAttributes<HTMLButtonElement> {
  icon: IconName
  href: string
  size?: number
  color?: ColorName
  disabled?: boolean
  authenticated?: boolean
  onIconClick?: () => void
}

const IconLink = ({
  icon,
  href,
  authenticated,
  onIconClick,
  ...props
}: IconLinkProps) => {
  if (authenticated) {
    return (
      <AuthenticatedLink
        logSignInEvent={href === MenuItemsUnauthenticatedMap.signIn?.path}
      >
        <Icon name={icon} onClick={onIconClick} {...props} />
      </AuthenticatedLink>
    )
  }

  return (
    <Link onClick={onIconClick} href={href}>
      <Icon name={icon} {...props} />
    </Link>
  )
}

export default IconLink
