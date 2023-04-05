import { ContentCard } from './ContentCard'
import styled from 'styled-components'
import { Caption, H3 } from './Typography'
import { formatValue } from '@/utils/display-utils'

const StyledContainer = styled(ContentCard)`
  height: min-content;
  display: flex;
`

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 1.6rem;
  align-items: flex-start;
  justify-content: center;
`

const Title = styled.div`
  display: flex;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.4rem;
  width: 100%;
`

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;
`

interface DataContainerProps {
  title: string
  items: {
    name: string
    value: number
  }[]
}

export const DataContainer = ({ title, items }: DataContainerProps) => {
  return (
    <StyledContainer shadow shape="notch" notchSize={1}>
      <InnerContainer>
        <Title>
          <H3>{title}</H3>
        </Title>
        <ItemsContainer>
          {items.map((item) => (
            <ItemRow key={item.name}>
              <Caption>{item.name}</Caption>
              <Caption emphasized>{formatValue(item.value)}</Caption>
            </ItemRow>
          ))}
        </ItemsContainer>
      </InnerContainer>
    </StyledContainer>
  )
}
