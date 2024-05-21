import Icon from '@/components/core/Icon'
import { Subline1 } from '@/components/core/Typography'
import styled from 'styled-components'

export function ActiveBadge({
  steward,
}: {
  steward: { externId: string } | null
}) {
  return (
    <Container>
      <Icon
        name="logo-cabin"
        color={steward ? 'green400' : 'yellow100'}
        size={1.6}
      />
      {steward ? (
        <Subline1 $color={'green400'}>Active</Subline1>
      ) : (
        <Subline1 $color={'yellow100'}>Inactive</Subline1>
      )}
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.green900};
  padding: 0.7rem 1.2rem;
  width: max-content;
  display: flex;
  flex-flow: row;
  gap: 0.8rem;
  align-items: center;
  //border: solid 1px ${({ theme }) => theme.colors.green900};
  border-radius: 0.8rem 0 0 0;
`
