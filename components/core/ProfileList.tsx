import { formatValue } from '@/utils/display-utils'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { ContentCard } from './ContentCard'
import { Overline } from './Typography'

interface ProfileListProps {
  total: number
  children: ReactNode
  sortComponent?: ReactNode
}

export const ProfileList = (props: ProfileListProps) => {
  const { total, children, sortComponent } = props

  const formattedTotal = formatValue(total)

  return (
    <ContentCard>
      <Container>
        <HeaderContainer>
          <Overline>{`${formattedTotal} Results`}</Overline>
          {sortComponent}
        </HeaderContainer>
        <InnerContainer>{children}</InnerContainer>
      </Container>
    </ContentCard>
  )
}

const Container = styled.div`
  width: 100%;
`

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 4rem;
`

const HeaderContainer = styled.div`
  padding: 1.6rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green900};
`
