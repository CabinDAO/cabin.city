import { ColorName } from '@/styles/theme'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import Icon, { IconName } from './Icon'

interface IconLinkProps extends HTMLAttributes<HTMLButtonElement> {
  icon: IconName
  href: string
  size?: number
  color?: ColorName
  disabled?: boolean
}

const IconLink = ({ icon, href, ...props }: IconLinkProps) => {
  return (
    <Link href={href}>
      <Icon name={icon} {...props} />
    </Link>
  )
}

export default IconLink
