import { formatValue } from '@/utils/display-utils'
import styled from 'styled-components'
import { ContentCard } from './ContentCard'
import { Overline } from './Typography'

interface ProfileListProps {
  total: number
  children: React.ReactNode
}

export const ProfileList = (props: ProfileListProps) => {
  const { total, children } = props

  const formattedTotal = formatValue(total)

  return (
    <ContentCard>
      <HeaderContainer>
        <Overline>{`${formattedTotal} Results`}</Overline>
      </HeaderContainer>
      <Container>{children}</Container>
    </ContentCard>
  )
}

const Container = styled.div`
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
