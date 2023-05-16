import Link from 'next/link'
import styled, { css } from 'styled-components'
import { AuthenticatedLink } from './AuthenticatedLink'

type ListItemProps = React.ComponentProps<typeof Link> & {
  authenticated?: boolean
  className?: string
}

export const ListItem = (props: ListItemProps) => {
  if (props.authenticated) {
    return (
      <AuthenticatedContainerLink
        className={props.className}
        href={props.href as string}
      >
        {props.children}
      </AuthenticatedContainerLink>
    )
  }

  return (
    <ContainerLink className={props.className} href={props.href}>
      {props.children}
    </ContainerLink>
  )
}

const linkStyles = css`
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    padding-top: 1.6rem;
  }

  &:not(:last-child) {
    border-bottom: ${(props) => props.theme.border.light};
    padding-bottom: 1.8rem;
  }
`

const ContainerLink = styled(Link)`
  ${linkStyles}
`

const AuthenticatedContainerLink = styled(AuthenticatedLink)`
  ${linkStyles}
`
