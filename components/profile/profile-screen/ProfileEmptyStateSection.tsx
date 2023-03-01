import Icon, { IconName } from '../../core/Icon'
import styled from 'styled-components'
import { CabinGradientCard } from '../../core/CabinGradientCard'
import { Body2, H2, Overline } from '../../core/Typography'
import { Button } from '../../core/Button'

interface ProfileEmptyStateProps {
  icon: IconName
  title: string
  description: string
  onCTAClick: () => void
}

export const ProfileEmptyStateSection = ({
  icon,
  title,
  description,
  onCTAClick,
}: ProfileEmptyStateProps) => {
  return (
    <CabinGradientCard>
      <InnerContainer>
        <Circle>
          <Icon name={icon} color="yellow600" size={3.7} />
        </Circle>
        <DescriptionContainer>
          <H2>{title}</H2>
          <Body2>{description}</Body2>
          <Button
            variant="link"
            endAdornment={<Icon name="up-right-arrow" size={0.9} />}
            onClick={onCTAClick}
          >
            <Overline>Learn More</Overline>
          </Button>
        </DescriptionContainer>
      </InnerContainer>
    </CabinGradientCard>
  )
}

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  width: 100%;
`

const Circle = styled.div`
  width: 9.6rem;
  height: 9.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.6rem;
`

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 0.4rem;
`
