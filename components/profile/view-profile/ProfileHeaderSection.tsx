import Icon from '@/components/core/Icon'
import { shortenedAddress } from '@/utils/display-utils'
import styled from 'styled-components'
import { Avatar } from '../../core/Avatar'
import { ContentCard } from '../../core/ContentCard'
import { CopyToClipboard } from '../../core/CopyToClipboard'
import { H1, Subline2 } from '../../core/Typography'
import useEns from '@/components/hooks/useEns'
import { ProfileHeaderButton } from './ProfileHeaderButton'

import { citizenshipInfoFromStatus } from '@/utils/citizenship'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { Tooltip } from '@/components/core/Tooltip'
import { ProfileFragment } from '@/utils/types/profile'

interface ProfileHeaderProps {
  profile: ProfileFragment
  refetchProfile: VoidFunction
}

export const ProfileHeaderSection = ({
  profile,
  refetchProfile,
}: ProfileHeaderProps) => {
  const { ens } = useEns(profile.wallet?.address)
  const { deviceSize } = useDeviceSize()

  const citizenship = citizenshipInfoFromStatus(profile?.citizenshipStatus)

  return (
    <ContentCard shadow>
      <Container>
        <ProfileSummary>
          <Avatar
            size={deviceSize === 'desktop' ? 8.8 : 6.4}
            src={profile.avatar?.url}
          />
          <ProfileInfoContainer>
            <CitizenContainer>
              <H1>{profile.name}</H1>
              {citizenship && (
                <Tooltip tooltip={citizenship.text} animate position="top">
                  <Icon name={citizenship.iconName} size={1.4} />
                </Tooltip>
              )}
            </CitizenContainer>

            {profile.wallet && (
              <BalanceAddressContainer>
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
        <ProfileHeaderButton
          profile={profile}
          refetchProfile={refetchProfile}
        />
      </Container>
    </ContentCard>
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

const CitizenContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
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
  }

  ${({ theme }) => theme.bp.lg} {
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
