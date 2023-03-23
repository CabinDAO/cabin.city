import Icon, { IconName } from '../../core/Icon'
import styled from 'styled-components'
import { CabinGradientCard } from '../../core/CabinGradientCard'
import { Body2, H2, Overline } from '../../core/Typography'
import { Button } from '../../core/Button'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

interface ProfileEmptyStateProps {
  icon: IconName
  title: string
  description: string
  href: string
}

export const ProfileEmptyStateSection = ({
  icon,
  title,
  description,
  href,
}: ProfileEmptyStateProps) => {
  const { deviceSize } = useDeviceSize()

  return (
    <CabinGradientCard>
      <InnerContainer>
        <Circle>
          <Icon
            name={icon}
            color="yellow600"
            size={deviceSize === 'desktop' ? 3.7 : 1.8}
          />
        </Circle>
        <DescriptionContainer>
          <H2>{title}</H2>
          <Body2>{description}</Body2>
          <a href={href} target="_blank" rel="noreferrer">
            <Button
              variant="link"
              endAdornment={<Icon name="up-right-arrow" size={0.9} />}
            >
              <Overline>Learn More</Overline>
            </Button>
          </a>
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
  border: 1px solid ${({ theme }) => theme.colors.green900};
`

const Circle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    width: 9.6rem;
    height: 9.6rem;
  }
`

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 0.4rem;
`
