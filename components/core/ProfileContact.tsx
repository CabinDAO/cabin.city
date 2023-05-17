import Link from 'next/link'
import { ProfileFragment } from '@/generated/graphql'
import { roleInfoFromType } from '@/utils/roles'
import { format, parseISO } from 'date-fns'
import styled, { css } from 'styled-components'
import { Avatar } from './Avatar'
import { ProfileIcons } from './ProfileIcons'
import { Caption, H4 } from './Typography'
import { Button } from '@/components/core/Button'
import { NoWrap } from './NoWrap'

interface ProfileContactProps {
  profile: ProfileFragment
  caretakerEmail?: string | null | undefined
}

export const ProfileContact = ({
  profile,
  caretakerEmail,
}: ProfileContactProps) => {
  const roleInfos = profile.roles.map((profileRole) =>
    roleInfoFromType(profileRole.role)
  )

  const wrapToNextLine = profile.name.length > 15 && roleInfos.length > 4

  return (
    <ProfileContactContainer>
      <AvatarContainer>
        <Avatar src={profile.avatar?.url} size={8.8} />
      </AvatarContainer>

      <InfoContainer>
        <NameContainer wrapToNextLine={wrapToNextLine}>
          <NoWrap>
            <H4>{profile.name}</H4>
          </NoWrap>
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
        <Link href={`mailto:${caretakerEmail ?? profile.email}`}>
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

interface NameContainerProps {
  wrapToNextLine?: boolean
}

const NameContainer = styled.div<NameContainerProps>`
  display: flex;
  gap: 0.4rem;
  flex-direction: row;
  align-items: center;

  ${({ wrapToNextLine }) =>
    wrapToNextLine &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `}
`
