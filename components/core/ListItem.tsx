import Link from 'next/link'
import styled from 'styled-components'

type ListItemProps = React.ComponentProps<typeof Link>

export const ListItem = (props: ListItemProps) => {
  return <ContainerLink href={props.href}>{props.children}</ContainerLink>
}

const ContainerLink = styled(Link)`
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
