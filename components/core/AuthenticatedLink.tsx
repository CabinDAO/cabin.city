import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { useProfile } from '../auth/useProfile'
import { useRouter } from 'next/router'
import { useExternalUser } from '../auth/useExternalUser'

interface AuthenticatedLinkProps {
  href?: string
  children: React.ReactNode
  className?: string
  logSignInEvent?: boolean
  onClick?: VoidFunction
}

export const AuthenticatedLink = ({
  href,
  children,
  className,
  logSignInEvent,
  onClick,
}: AuthenticatedLinkProps) => {
  const { confirmLoggedIn } = useConfirmLoggedIn(logSignInEvent)
  const { refetchProfile } = useProfile()
  const { externalUser } = useExternalUser()
  const router = useRouter()
  const path = href ?? router.asPath

  const handleClick = () => {
    confirmLoggedIn(() => {
      router.push(path)
      refetchProfile().then(() => {
        if (onClick) onClick()
      })
    })
  }

  if (externalUser) {
    return (
      <Link onClick={onClick} className={className} href={path}>
        {children}
      </Link>
    )
  } else {
    return (
      <Wrapper className={className} onClick={handleClick}>
        {children}
      </Wrapper>
    )
  }
}

const Wrapper = styled.span`
  cursor: pointer;
`
