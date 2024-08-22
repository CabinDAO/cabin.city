import Link from 'next/link'
import { useProfile } from '@/components/auth/useProfile'
import { MenuItemName, MenuItems } from '@/utils/nav/types'
import analytics from '@/lib/googleAnalytics/analytics'
import styled from 'styled-components'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import Icon from '@/components/core/Icon'
import { Tooltip } from '@/components/core/Tooltip'
import { Avatar } from '@/components/core/Avatar'
import { MeFragment } from '@/utils/types/profile'

export const Navbar = () => {
  const { user } = useProfile()

  return (
    <Container>
      <Group>
        <MenuItem name={'home'} user={user} />
      </Group>
      <Divider />
      <Group>
        <MenuItem name={'neighborhoods'} user={user} />
        <MenuItem name={'census'} user={user} />
      </Group>
      <Divider />
      <Group>
        <MenuItem name={'profile'} user={user} />
        <MenuItem name={'signOut'} user={user} />
        <MenuItem name={'signIn'} user={user} />
        {user?.isAdmin && <MenuItem name={'admin'} user={user} />}
      </Group>
    </Container>
  )
}

const MenuItem = ({
  name,
  user,
}: {
  name: MenuItemName
  user: MeFragment | null
}) => {
  const item = MenuItems[name]

  const visible =
    item.visibility === 'always' ||
    (user && item.visibility === 'authOnly') ||
    (!user && item.visibility === 'unauthOnly')

  if (!visible) return null

  return (
    <Tooltip tooltip={item.displayText ?? ''} position="right" animate>
      {name === 'signIn' ? (
        <AuthenticatedLink logSignInEvent>
          <Icon
            name={item.icon}
            onClick={() => {
              analytics.navBarEvent('signIn')
              analytics.signInEvent()
            }}
            size={item.iconSize ?? 2.5}
            color={'green400'}
          />
        </AuthenticatedLink>
      ) : (
        <Link onClick={() => analytics.navBarEvent(name)} href={item.path}>
          {user && name == 'profile' ? (
            <Avatar src={user.avatarUrl} size={3.2} />
          ) : (
            <Icon
              name={item.icon}
              size={item.iconSize ?? 2.5}
              color={'green400'}
            />
          )}
        </Link>
      )}
    </Tooltip>
  )
}

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

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  margin: 1.8rem 1.6rem;
`

const Divider = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.green900};
`
