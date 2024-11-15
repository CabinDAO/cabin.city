import { formatValue } from '@/utils/display-utils'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { ContentCard } from './ContentCard'
import { Overline } from './Typography'

export const List = ({
  total,
  children,
  sortComponent,
  unitWords = { singular: 'Result' },
}: {
  total: number | null | undefined
  children: ReactNode
  sortComponent?: ReactNode
  unitWords?: { singular: string; plural?: string }
}) => {
  const formattedTotal = formatValue(total ?? 0)
  const pluralized =
    total === 1
      ? unitWords.singular
      : unitWords.plural ?? `${unitWords.singular}s`

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
