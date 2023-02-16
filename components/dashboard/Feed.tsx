import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import { H2 } from '../core/Typography'

const InnerContainer = styled.div`
  overflow: scroll;
  margin: 2.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`

export const Feed = () => {
  return (
    <ContentCard shape="notch">
      <InnerContainer>
        <H2>Feed is coming</H2>
      </InnerContainer>
    </ContentCard>
  )
}
