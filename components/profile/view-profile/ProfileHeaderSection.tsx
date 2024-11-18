import { useState, useEffect } from 'react'
import Link from 'next/link'
import useEns from '@/components/hooks/useEns'
import { useModal } from '@/components/hooks/useModal'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { useBackend } from '@/components/hooks/useBackend'
import {
  MeFragment,
  ProfileFragment,
  ProfileSetupStateParams,
} from '@/utils/types/profile'
import { balanceToVotes, shortenedAddress } from '@/utils/display-utils'
import { canEditProfile } from '@/lib/permissions'
import { expandRoute } from '@/utils/routing'
import analytics from '@/lib/googleAnalytics/analytics'
import styled from 'styled-components'
import { H1, Overline, Subline2 } from '@/components/core/Typography'
import { Avatar } from '@/components/profile/Avatar'
import { ContentCard } from '@/components/core/ContentCard'
import { CopyToClipboard } from '@/components/core/CopyToClipboard'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import { ContactModal } from '@/components/contact/ContactModal'

export const ProfileHeaderSection = ({
  user,
  profile,
}: {
  user: MeFragment | null
  profile: ProfileFragment
}) => {
  const { ens } = useEns(profile.wallet?.address)
  const { deviceSize } = useDeviceSize()

  const showContactButton = user && user.externId != profile.externId
  const isOwnProfile = user && user.externId === profile.externId

  return (
    <StyledContentCard shadow>
      <Container>
        <ProfileSummary>
          <Avatar
            size={deviceSize === 'desktop' ? 8.8 : 6.4}
            srcCfId={profile.avatarCfId}
          />
          <ProfileInfoContainer>
            <H1>{profile.name}</H1>

            {profile.wallet && (
              <BalanceAddressContainer>
                <Subline2>
                  <Link
                    href={expandRoute('vote')}
                    style={{ textDecoration: 'underline' }}
                  >
                    {`${balanceToVotes(profile.cabinTokenBalanceInt)} votes`}
                  </Link>
                </Subline2>
                <Subline2>·</Subline2>
                <Subline2>{`${
                  profile.cabinTokenBalanceInt ?? 0
                } ₡ABIN`}</Subline2>
                <Subline2>·</Subline2>
                <CopyToClipboard text={ens ?? profile.wallet.address ?? ''}>
                  <Subline2>
                    {ens ?? shortenedAddress(profile.wallet.address)}
                  </Subline2>
                </CopyToClipboard>
              </BalanceAddressContainer>
            )}
          </ProfileInfoContainer>
        </ProfileSummary>
        {showContactButton && (
          <ProfileContactButton
            user={user}
            profile={profile}
            flashOnMount={
              user && !isOwnProfile && !user.isProfileSetupDismissed
            }
          />
        )}
      </Container>

      {canEditProfile(user, profile) && (
        <EditBar>
          <Link
            href={expandRoute(['profile_id_edit', { id: profile.externId }])}
          >
            <Button variant={'link'}>
              <Icon name="pencil" size={1.2} />
              <Overline>Edit Profile</Overline>
            </Button>
          </Link>
        </EditBar>
      )}
    </StyledContentCard>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 1.6rem 2.4rem 2.2rem;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    justify-content: space-between;
  }

  ${({ theme }) => theme.bp.lg} {
    gap: 0;
    align-items: center;
    padding-bottom: 1.6rem;
  }
`

const BalanceAddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`

const ProfileSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;

  ${({ theme }) => theme.bp.md} {
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }
`

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.6rem;
`

const EditBar = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  width: 100%;
  border-top: solid 1px ${({ theme }) => theme.colors.green900};
`

const StyledContentCard = styled(ContentCard)`
  flex-direction: column;
`

const ProfileContactButton = ({
  user,
  profile,
  flashOnMount,
}: {
  user: MeFragment
  profile: ProfileFragment
  flashOnMount?: boolean
}) => {
  const { showModal } = useModal()
  const { post } = useBackend()

  const [isFlashing, setIsFlashing] = useState(false)
  const flashBg = () => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 500) // Adjust timeout to match CSS transition
  }

  useEffect(() => {
    if (flashOnMount) {
      flashBg()
    }
  }, [flashOnMount])

  const onClick = async () => {
    showModal(() => <ContactModal sender={user} recipient={profile} />)

    analytics.onboardingActionEvent(user.externId, 'contact_clicked')

    analytics.openMessageModalButtonClick(
      user.externId,
      profile.externId,
      'profile-header'
    )

    await post('api_profile_setupState', {
      state: 'dismissed',
    } satisfies ProfileSetupStateParams)
  }

  return (
    <StyledButton variant="tertiary" flashing={isFlashing} onClick={onClick}>
      <Icon name="envelope" size={2} />
      Contact
    </StyledButton>
  )
}

const StyledButton = styled(Button)<{ flashing?: boolean }>`
  transition: background 0.5s ease-in-out;
  background: ${({ theme, flashing }) =>
    flashing ? theme.colors.yellow400 : 'initial'} !important;

  ${({ theme }) => theme.bp.md} {
    margin-top: 0.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    margin-top: 0;
  }
`
