import { formatValue } from '@/utils/display-utils'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { ContentCard } from './ContentCard'
import { Overline } from './Typography'

interface ListProps {
  total: number | null | undefined
  children: ReactNode
  sortComponent?: ReactNode
}

export const List = (props: ListProps) => {
  const { total, children, sortComponent } = props

  const formattedTotal = formatValue(total ?? 0)
  const pluralized = total === 1 ? 'Result' : 'Results'

  return (
    <ContentCard>
      <Container>
        <HeaderContainer>
          <Overline>{`${formattedTotal} ${pluralized}`}</Overline>
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
  padding: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    padding: 1.6rem 2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 1.6rem 4rem;
  }
`

const HeaderContainer = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green900};

  ${({ theme }) => theme.bp.md} {
    padding: 1.6rem 2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 1.6rem 4rem;
  }
`
