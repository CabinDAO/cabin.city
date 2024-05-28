import styled from 'styled-components'
import { Body2, H2 } from './Typography'
import Icon, { IconName } from './Icon'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

interface EmptyStateDescriptionProps {
  title: string
  description: string
  icon: IconName
}

export const EmptyStateDescription = ({
  title,
  description,
  icon,
}: EmptyStateDescriptionProps) => {
  const { deviceSize } = useDeviceSize()

  return (
    <ContentContainer>
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
      </DescriptionContainer>
    </ContentContainer>
  )
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 0.4rem;
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
