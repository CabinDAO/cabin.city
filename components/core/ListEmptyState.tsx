import styled from 'styled-components'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import Icon, { IconName } from './Icon'
import { Body2, H2 } from './Typography'

interface ListEmptyStateProps {
  iconName: IconName
}

export const ListEmptyState = (props: ListEmptyStateProps) => {
  const { deviceSize } = useDeviceSize()

  const iconSize = deviceSize === 'desktop' ? 4 : 3

  return (
    <Container>
      <Circle>
        <Icon name={props.iconName} color="yellow600" size={iconSize} />
      </Circle>
      <Legend>
        <H2>No results found</H2>
        <Body2>
          It seems we can’t find any results based on your criteria.
        </Body2>
      </Legend>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4.8rem;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`

const Circle = styled.div`
  width: 7rem;
  height: 7rem;
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

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: center;
`
