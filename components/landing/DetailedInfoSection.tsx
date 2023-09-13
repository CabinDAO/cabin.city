import styled from 'styled-components'
import { CollapsibleInfoSection } from './CollapsibleInfoSection'
import { collapsibleData } from '@/utils/landing'

export const DetailedInfoSection = () => {
  const [leftData, rightData] = collapsibleData

  return (
    <Container>
      <CollapsibleInfoSection variant="left" data={leftData} />
      <CollapsibleInfoSection variant="right" data={rightData} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 0rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    gap: 8rem;
    padding: 8rem 2rem 8rem 4rem;
    width: auto;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 8rem 0;
    width: 100%;
  }
`
