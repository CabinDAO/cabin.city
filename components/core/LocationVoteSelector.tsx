import { ReactNode, useCallback } from 'react'
import styled from 'styled-components'
import { Subline2 } from './Typography'
import IconButton from './IconButton'

interface LocationVoteSelectorProps {
  label: ReactNode
  count: number
  onCountChange: (count: number) => void
  error?: boolean
}
export const LocationVoteSelector = (props: LocationVoteSelectorProps) => {
  const { label, count, onCountChange, error } = props

  const handleIncrement = useCallback(() => {
    onCountChange(count + 1)
  }, [count, onCountChange])

  const handleDecrement = useCallback(() => {
    if (count > 0) {
      onCountChange(count - 1)
    }
  }, [count, onCountChange])

  return (
    <>
      <LabelContainer error={error}>{label}</LabelContainer>
      <SelectorContainer error={error}>
        <SelectorButton
          onClick={handleDecrement}
          icon="minus"
          size={1.4}
          color="green900"
        />
        <CountContainer>
          <Subline2>{count}</Subline2>
        </CountContainer>
        <SelectorButton onClick={handleIncrement} icon="plus" size={1.4} />
      </SelectorContainer>
    </>
  )
}

const LabelContainer = styled(Subline2)<{ error?: boolean }>`
  padding: 1.6rem 1.2rem;
  background-color: ${({ theme, error }) =>
    error ? theme.colors.red200 : theme.colors.yellow200};
  flex: 1;
`

const SelectorContainer = styled.div<{ error?: boolean }>`
  display: flex;
  height: 4.8rem;
  border: ${({ theme, error }) =>
    error
      ? `2px solid ${theme.colors.red600}`
      : `1px solid ${theme.colors.green900}`};

  > :not(:last-child) {
    border-right: ${({ theme, error }) =>
      error
        ? `2px solid ${theme.colors.red600}`
        : `1px solid ${theme.colors.green900}`};
  }
`

const CountContainer = styled.div`
  padding: 1.6rem;
  background-color: white;
  font-variant-numeric: tabular-nums;
  flex: 1;
  text-align: center;
`

const SelectorButton = styled(IconButton)`
  background-color: white;
  width: 4.8rem;
`
