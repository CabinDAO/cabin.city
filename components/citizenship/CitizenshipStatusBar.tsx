import { CabinGradientCard } from '@/components/core/CabinGradientCard'
import { ContentCard } from '@/components/core/ContentCard'
import styled from 'styled-components'
import { ProgressBar } from '@/components/core/ProgressBar'
import { CitizenStatusStep } from './CitizenStatusStep'
import { CitizenshipStatus } from '@/utils/types/profile'
import { CitizenshipCTA } from './CitizenshipCTA'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

interface CitizenshipStatusBarProps {
  status: CitizenshipStatus | undefined | null
  approvedDueToCabinBalance: boolean
  onMint(): void
  onSignal(): void
  profileId: string
}

export const CitizenshipStatusBar = ({
  status,
  onMint,
  onSignal,
  approvedDueToCabinBalance,
  profileId,
}: CitizenshipStatusBarProps) => {
  const { deviceSize } = useDeviceSize()

  const canMint =
    approvedDueToCabinBalance ||
    (status &&
      [CitizenshipStatus.Verified, CitizenshipStatus.Vouched].includes(status))

  const determineProgress = () => {
    if (approvedDueToCabinBalance) {
      return deviceSize === 'mobile' ? 75 : 68
    }

    switch (status) {
      case CitizenshipStatus.Verified:
        return 100
      case CitizenshipStatus.Vouched:
        return deviceSize === 'mobile' ? 75 : 68
      case CitizenshipStatus.VouchRequested:
        return deviceSize === 'mobile' ? 40 : 37
      default:
        return deviceSize === 'mobile' ? 8 : 3
    }
  }
  return (
    <ContentCard shape="notch">
      <CabinGradientCard variant="right">
        <InnerContainer>
          <CitizenStatusProgress>
            <StepsContainer>
              <CitizenStatusStep
                step={1}
                description="Signal Interest"
                icon="hand-wave"
              />
              <CitizenStatusStep
                step={2}
                description="Earn a Vouch"
                icon="thumb-up"
                enabled={!!status}
              />
              <CitizenStatusStep
                step={3}
                description="Mint Citizenship"
                icon="citizen"
                enabled={!!canMint}
              />
            </StepsContainer>
            <StyledProgressBar
              progress={determineProgress()}
              vertical={deviceSize === 'mobile'}
            />
          </CitizenStatusProgress>
          <CitizenshipCTA
            profileId={profileId}
            status={status}
            onClick={canMint ? onMint : onSignal}
            canMint={!!canMint}
          />
        </InnerContainer>
      </CabinGradientCard>
    </ContentCard>
  )
}

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  gap: 3.1rem;
  width: 100%;
`

const CitizenStatusProgress = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 1.6rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;

  ${({ theme }) => theme.bp.md} {
    flex-direction: column;
  }
`

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 85%;
  }
`

const StyledProgressBar = styled(ProgressBar)`
  background-color: ${({ theme }) => theme.colors.yellow100};
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  border-radius: 10rem;
`
