import styled from 'styled-components'
import { H6 } from './Typography'

interface FilterCountProps {
  count: number
}

export const FilterCount = ({ count }: FilterCountProps) => {
  return (
    <FilterCountContainer>
      <FilterCountText $color="yellow100">{count}</FilterCountText>
    </FilterCountContainer>
  )
}

const FilterCountContainer = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.green800};
  align-items: center;
  justify-content: center;
`

const FilterCountText = styled(H6)`
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.2rem;
`
