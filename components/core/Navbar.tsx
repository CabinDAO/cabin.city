import Link from 'next/link'
import styled from 'styled-components'
import { notch } from '../layouts/common.styles'
import { Avatar } from './Avatar'
import { MenuItemLink } from './navbar/MenuItemLink'

const SingleMenuItem = styled.div`
  padding: 1.6rem;
  justify-content: center;
  align-items: center;
`

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.green800};
  justify-content: center;
  align-items: center;
  max-width: 8rem;
  width: min-content;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  border-bottom-right-radius: 2.5rem;
  box-shadow: 0.8rem 0.8rem 0rem ${({ theme }) => theme.colors.yellow900};
  ${notch(1)}
`

const Divider = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.green900};
`

const NeighborhoodsItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.7rem 1.6rem;p
  justify-content: center;
  align-items: center;
  gap: 2.7rem;
`

interface NavbarProps {
  profileId: string
  avatarUrl?: string
}

export const Navbar = (props: NavbarProps) => {
  return (
    <Container>
      <SingleMenuItem>
        <MenuItemLink menuItem={'home'} />
      </SingleMenuItem>
      <Divider />
      <NeighborhoodsItemGroup>
        <MenuItemLink menuItem={'members'} />
        <MenuItemLink menuItem={'neighborhoods'} />
      </NeighborhoodsItemGroup>
      <Divider />
      <SingleMenuItem>
        <Link href={`/profile/${props.profileId}`}>
          <Avatar src={props.avatarUrl} size={3.2} />
        </Link>
      </SingleMenuItem>
    </Container>
  )
}
