import styled from 'styled-components'
import Link from 'next/link'
import { useConfirmLoggedIn } from '../auth/useConfirmLoggedIn'
import { useUser } from '../auth/useUser'
import { useRouter } from 'next/router'

interface AuthenticatedLinkProps {
  href?: string
  children: React.ReactNode
  className?: string
}

export const AuthenticatedLink = ({
  href,
  children,
  className,
}: AuthenticatedLinkProps) => {
  const { confirmLoggedIn } = useConfirmLoggedIn()
  const { user, refetchUser } = useUser()
  const router = useRouter()
  const path = href ?? router.asPath

  const handleClick = () => {
    confirmLoggedIn(() => {
      router.push(path)
      refetchUser()
    })
  }

  if (user) {
    return (
      <Link className={className} href={path}>
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

const Wrapper = styled.div`
  cursor: pointer;
`
