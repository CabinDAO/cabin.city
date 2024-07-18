import { useState } from 'react'
import styled from 'styled-components'
import { notch } from '@/components/core/notch'
import { Avatar } from './Avatar'
import { MenuItemLink } from './navbar/MenuItemLink'
import { ProfileNavMenu } from './navbar/ProfileNavMenu'
import { useProfile } from '@/components/auth/useProfile'

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
  padding: 2.7rem 1.6rem;
  justify-content: center;
  align-items: center;
  gap: 2.7rem;
`

export const Navbar = () => {
  const { user } = useProfile()

  const externId = user?.externId

  const [profileMenuVisible, setProfileMenuVisible] = useState(false)

  return (
    <>
      <Container>
        <SingleMenuItem>
          <MenuItemLink menuItem={'home'} profileId={externId} />
        </SingleMenuItem>
        <Divider />
        <NeighborhoodsItemGroup>
          <MenuItemLink menuItem={'neighborhoods'} profileId={externId} />
          <MenuItemLink menuItem={'members'} profileId={externId} />
          <MenuItemLink menuItem={'activity'} profileId={externId} />
        </NeighborhoodsItemGroup>
        <Divider />
        <SingleMenuItem>
          {externId && (
            <Avatar
              src={user?.avatarUrl}
              size={3.2}
              onClick={() => setProfileMenuVisible(!profileMenuVisible)}
            />
          )}
          <MenuItemLink
            authenticated
            menuItem={'signIn'}
            profileId={externId}
          />
        </SingleMenuItem>
      </Container>
      <ProfileNavMenu visible={profileMenuVisible} />
    </>
  )
}
