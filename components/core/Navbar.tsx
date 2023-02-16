import Link from 'next/link'
import styled from 'styled-components'
import { Avatar } from './Avatar'
import { MenuItemLink } from './navbar/MenuItemLink'
import { Notch } from './Notch'

const StyledNotch = styled(Notch)`
  width: 1.2rem;
  height: 1rem;
  margin-bottom: -1rem;
`

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

export const Navbar = () => {
  // TODO: resolve my profile ID
  const profileId = 123
  return (
    <Container>
      <StyledNotch />
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
        <Link href={`/profile/${profileId}`}>
          <Avatar size={3.2} />
        </Link>
      </SingleMenuItem>
    </Container>
  )
}
