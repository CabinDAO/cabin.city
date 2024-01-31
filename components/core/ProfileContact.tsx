import Link from 'next/link'
import { CitizenshipStatus, ProfileFragment } from '@/utils/types/profile'
import { roleInfoFromType } from '@/utils/roles'
import { format, parseISO } from 'date-fns'
import styled, { css } from 'styled-components'
import { Avatar } from './Avatar'
import { ProfileIcons } from './ProfileIcons'
import { Body1, Caption, H4 } from './Typography'
import { Button } from '@/components/core/Button'
import { NoWrap } from './NoWrap'
import { useProfile } from '@/components/auth/useProfile'
import Icon from '@/components/core/Icon'
import theme from '@/styles/theme'
import { CaretakerContactModal } from '@/components/core/CaretakerContactModal'
import { useModal } from '@/components/hooks/useModal'

interface ProfileContactProps {
  profile: ProfileFragment
  caretakerEmail?: string | null | undefined
  onContact?: () => void
}

export const ProfileContact = ({
  profile,
  caretakerEmail,
  onContact,
}: ProfileContactProps) => {
  const { showModal } = useModal()
  const { user } = useProfile()

  const isCitizen =
    user && user.citizenshipStatus === CitizenshipStatus.Verified

  const roleInfos = profile.roles.map((profileRole) =>
    roleInfoFromType(profileRole.type)
  )

  const wrapToNextLine = profile.name.length > 15 && roleInfos.length > 4

  return (
    <Container>
      <Top flexDir={'row'}>
        {isCitizen ? (
          <Link href={`/profile/${profile.externId}`}>
            <Avatar src={profile.avatar?.url} size={7.2} />
          </Link>
        ) : (
          <div
            style={{
              width: '7.2rem',
              height: '7.2rem',
              backgroundColor: theme.colors.yellow100,
              border: `1px solid ${theme.colors.green900}`,
              borderRadius: '50%',
              display: 'flex',
              flexShrink: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name={'silhouette'} size={4} />
          </div>
        )}

        <Info>
          <Name wrapToNextLine={wrapToNextLine}>
            {isCitizen ? (
              <>
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
              </>
            ) : (
              <>
                <NoWrap>
                  <H4>Caretaker</H4>
                </NoWrap>
                <Icon name={'check-star'} size={1.6} />
              </>
            )}
          </Name>
          <Caption>
            {isCitizen ? (
              <>
                {(profile.cabinTokenBalanceInt ?? 0).toLocaleString('en-US')}{' '}
                ₡ABIN&nbsp;·&nbsp;Joined{' '}
                {format(parseISO(profile.createdAt), 'yyyy')}
              </>
            ) : (
              <>
                Become a Citizen to connect with the property&apos;s caretaker.
              </>
            )}
          </Caption>
        </Info>
      </Top>

      <Body1>{isCitizen ? profile?.bio : ''}</Body1>

      <ContactContainer>
        {isCitizen ? (
          <Link href={`mailto:${caretakerEmail ?? profile.email}`}>
            <ContactButton onClick={onContact} variant="tertiary">
              Contact
            </ContactButton>
          </Link>
        ) : (
          <ContactButton
            onClick={() => {
              showModal(() => <CaretakerContactModal />)
            }}
            variant="tertiary"
          >
            Learn More
          </ContactButton>
        )}
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
