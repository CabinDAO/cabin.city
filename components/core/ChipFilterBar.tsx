import styled from 'styled-components'
import { MiniChip } from './MiniChip'

interface ChipFilterBarProps {
  children: React.ReactNode
  className?: string
}
export const ChipFilterBar = (props: ChipFilterBarProps) => {
  const { children, className } = props
  return <Container className={className}>{children}</Container>
}

export const ChipFilter = styled(MiniChip)`
  border-radius: 0.4rem;
  white-space: nowrap;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 0.4rem;
  padding: 1.6rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  border-bottom: none;
  background-color: ${({ theme }) => theme.colors.yellow200};
  overflow-x: scroll;

  ${({ theme }) => theme.bp.md} {
    overflow-x: hidden;
  }}
`
