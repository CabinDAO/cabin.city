import { ContentCard } from '../../core/ContentCard'
import styled from 'styled-components'
import { H2, Overline } from '../../core/Typography'
import { ProgressBar } from '../../core/ProgressBar'
import { ColorName } from '@/styles/theme'
import Icon from '../../core/Icon'
import { useRouter } from 'next/router'

interface ProfileProgressCardProps {
  progress: number
  profileId: string
}

export const ProfileProgressCardSection = ({
  progress,
  profileId,
}: ProfileProgressCardProps) => {
  const router = useRouter()

  const handleCTAClick = () => {
    if (complete) {
      // Dismiss
    } else {
      router.push(`/profile/${profileId}/setup`)
    }
  }

  const complete = progress === 100

  return (
    <ContentCard fillType="hard" notchSize={1.6} shape="notch">
      <InnerContainer>
        <ProfileCompletionData>
          <ProfileProgressData>
            <H2 $color="yellow100">Profile progress</H2>
            <H2 $color="yellow100">{progress}% Complete</H2>
          </ProfileProgressData>
          <LinkContainer color="yellow100" onClick={handleCTAClick}>
            <Overline>{complete ? 'Dismiss' : 'Setup profile'}</Overline>
            <Icon
              name={complete ? 'close' : 'chevron-right'}
              size={1.4}
              color="yellow100"
            />
          </LinkContainer>
        </ProfileCompletionData>
        <ProgressBar progress={progress} />
      </InnerContainer>
    </ContentCard>
  )
}

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
  gap: 2.4rem;
  background-color: ${({ theme }) => theme.colors.green800};
  width: 100%;
`

const ProfileCompletionData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`

const ProfileProgressData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

interface LinkContainerProps {
  color: ColorName
}

const LinkContainer = styled.div<LinkContainerProps>`
  display: flex;
  flex-direction: row;
  gap: 0.85rem;
  cursor: pointer;

  > * {
    color: ${({ theme, color }) => theme.colors[color]};
  }

  ${Overline} {
    white-space: nowrap;
  }
`
