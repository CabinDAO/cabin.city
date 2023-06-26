import { CollapsibleData } from '@/utils/landing'
import styled from 'styled-components'
import { HHero, Subline1 } from '../core/Typography'
import { CollapsibleItem } from './CollapsibleItem'
import { useState } from 'react'

interface CollapsibleListProps {
  data: CollapsibleData
}
export const CollapsibleList = ({ data }: CollapsibleListProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleOpen = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <Container addBottomPadding={openIndex === null}>
      <Header>
        <Subline1>{data.subtitle}</Subline1>
        <StyledHHero>{data.title}</StyledHHero>
      </Header>
      <ItemsContainer>
        {data.items.map((item, index) => (
          <CollapsibleItem
            open={openIndex === index}
            toggleOpen={handleOpen}
            key={index}
            title={item.title}
            description={item.description}
            index={index}
          />
        ))}
      </ItemsContainer>
    </Container>
  )
}

const Container = styled.div<{ addBottomPadding?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8rem 0 0 0;
  background-color: ${({ theme }) => theme.colors.yellow100};
  gap: 4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 30rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 41.9rem;
    gap: 8rem;
  }

  ${({ addBottomPadding }) => addBottomPadding && `padding-bottom: 6rem;`}
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.green900}1A;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 4rem;
`

const StyledHHero = styled(HHero)`
  line-height: 1.2;
  font-size: 2.4rem;
  margin: 0;
  max-width: 70%;

  ${({ theme }) => theme.bp.md} {
    max-width: 100%;
  }

  ${({ theme }) => theme.bp.lg} {
    font-size: 3.2rem;
  }
`
