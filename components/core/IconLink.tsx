import { ColorName } from '@/styles/theme'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import Icon, { IconName } from './Icon'
import { AuthenticatedLink } from './AuthenticatedLink'

interface IconLinkProps extends HTMLAttributes<HTMLButtonElement> {
  icon: IconName
  href: string
  size?: number
  color?: ColorName
  disabled?: boolean
  authenticated?: boolean
}

const IconLink = ({ icon, href, authenticated, ...props }: IconLinkProps) => {
  if (authenticated) {
    return (
      <AuthenticatedLink>
        <Icon name={icon} {...props} />
      </AuthenticatedLink>
    )
  }

  return (
    <Link href={href}>
      <Icon name={icon} {...props} />
    </Link>
  )
}

export default IconLink
