import Link from 'next/link'
import { ProfileBasicFragment } from '@/utils/types/profile'
import { roleInfoFromType } from '@/utils/roles'
import { format, parseISO } from 'date-fns'
import styled, { css } from 'styled-components'
import { Avatar } from './Avatar'
import { ProfileIcons } from './ProfileIcons'
import { Body1, Caption, H4 } from './Typography'
import { Button } from '@/components/core/Button'
import { NoWrap } from './NoWrap'

interface ProfileContactProps {
  profile: ProfileBasicFragment
  onContact?: VoidFunction
}

export const ProfileContact = ({ profile, onContact }: ProfileContactProps) => {
  const roleInfos = profile.roles.map((profileRole) =>
    roleInfoFromType(profileRole.type)
  )

  const wrapToNextLine = profile.name.length > 15 && roleInfos.length > 4

  return (
    <Container>
      <Top flexDir={'row'}>
        <Link href={`/profile/${profile.externId}`}>
          <Avatar src={profile.avatar?.url} size={7.2} />
        </Link>
        <Info>
          <Name wrapToNextLine={wrapToNextLine}>
            <Link href={`/profile/${profile.externId}`}>
              <NoWrap>
                <H4>{profile.name}</H4>
              </NoWrap>
            </Link>
            <ProfileIcons
              size={1.6}
              citizenshipStatus={profile.citizenshipStatus}
              roleInfos={roleInfos}
            />
          </Name>
          <Caption>
            {(profile.cabinTokenBalanceInt ?? 0).toLocaleString('en-US')}{' '}
            ₡ABIN&nbsp;·&nbsp;Joined{' '}
            {format(parseISO(profile.createdAt), 'yyyy')}
          </Caption>
        </Info>
      </Top>

      <Body1>{profile.bio}</Body1>

      <ContactContainer>
        <Link
          href={`mailto:${profile.email}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <ContactButton onClick={onContact} variant="tertiary">
            Contact
          </ContactButton>
        </Link>
      </ContactContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 1.6rem;

  ${Body1} {
    opacity: 0.75;
  }
`

const Top = styled.div<{
  flexDir: 'column' | 'row'
}>`
  display: flex;
  flex-direction: ${({ flexDir }) => flexDir};
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`

const Name = styled.div<{
  wrapToNextLine?: boolean
}>`
  display: flex;
  gap: 0.4rem;
  flex-direction: row;
  align-items: center;

  ${H4} {
    margin-bottom: 0;
  }

  ${({ wrapToNextLine }) =>
    wrapToNextLine &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `}
`

const ContactContainer = styled.div`
  margin-top: 0.8rem;
`
const ContactButton = styled(Button)`
  width: 100%;
`
