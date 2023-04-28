import Link from 'next/link'
import { ProfileFragment } from '@/generated/graphql'
import { roleInfoFromType } from '@/utils/roles'
import { format, parseISO } from 'date-fns'
import styled from 'styled-components'
import { Avatar } from './Avatar'
import { ProfileIcons } from './ProfileIcons'
import { Caption, H4 } from './Typography'
import { Button } from '@/components/core/Button'

interface ProfileContactProps {
  profile: ProfileFragment
}

export const ProfileContact = ({ profile }: ProfileContactProps) => {
  const roleInfos = profile.roles.map((profileRole) =>
    roleInfoFromType(profileRole.role)
  )

  return (
    <ProfileContactContainer>
      <AvatarContainer>
        <Avatar src={profile.avatar?.url} size={8.8} />
      </AvatarContainer>

      <InfoContainer>
        <NameContainer>
          <H4>{profile.name}</H4>
          <ProfileIcons
            size={1.6}
            citizenshipStatus={profile.citizenshipStatus}
            roleInfos={roleInfos}
          />
        </NameContainer>
        <Caption>
          {(profile.cabinTokenBalanceInt ?? 0).toLocaleString('en-US')}{' '}
          ₡ABIN&nbsp;·&nbsp;Joined {format(parseISO(profile.createdAt), 'yyyy')}
        </Caption>
      </InfoContainer>

      <ContactContainer>
        <Link href={`mailto:${profile.email}`}>
          <ContactButton variant="tertiary">Contact</ContactButton>
        </Link>
      </ContactContainer>
    </ProfileContactContainer>
  )
}

const ContactButton = styled(Button)`
  width: 100%;
`

const ProfileContactContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 0.8rem;
`

const ContactContainer = styled.div`
  margin-top: 0.8rem;
`

const AvatarContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const NameContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`
