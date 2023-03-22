import { CabinGradientCard } from '../core/CabinGradientCard'
import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import { ProgressBar } from '../core/ProgressBar'
import { CitizenStatusStep } from './CitizenStatusStep'
import { CitizenshipStatus } from '@/generated/graphql'
import { CitizenshipCTA } from './CitizenshipCTA'

interface CitizenshipStatusBarProps {
  status: CitizenshipStatus | undefined | null
  onMint(): void
  onSignal(): void
}

export const CitizenshipStatusBar = ({
  status,
  onMint,
  onSignal,
}: CitizenshipStatusBarProps) => {
  const determineProgress = () => {
    switch (status) {
      case CitizenshipStatus.Verified:
        return 100
      case CitizenshipStatus.Vouched:
        return 68
      case CitizenshipStatus.VouchRequested:
        return 28
      default:
        return 3
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
                description="Receive vouch"
                icon="thumb-up"
                enabled={!!status}
              />
              <CitizenStatusStep
                step={3}
                description="Mint Citizenship"
                icon="citizen"
                enabled={
                  !!status &&
                  [
                    CitizenshipStatus.Vouched,
                    CitizenshipStatus.Verified,
                  ].includes(status)
                }
              />
            </StepsContainer>
            <StyledProgressBar progress={determineProgress()} />
          </CitizenStatusProgress>
          <CitizenshipCTA
            status={status}
            onClick={status === CitizenshipStatus.Vouched ? onMint : onSignal}
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
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
`

const StyledProgressBar = styled(ProgressBar)`
  background-color: ${({ theme }) => theme.colors.yellow100};
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  border-radius: 10rem;
`
