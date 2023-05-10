import styled from 'styled-components'
import { Subline1 } from './Typography'
import { ColorName } from '@/styles/theme'
import { ReactNode } from 'react'

interface TagProps {
  label: string
  onClick?: () => void
  className?: string
  color?: ColorName | undefined
  startAdornment?: ReactNode
  children?: ReactNode | undefined
}

export const Tag = ({
  label,
  onClick,
  className,
  color,
  startAdornment,
  children,
}: TagProps) => {
  return (
    <Container onClick={onClick} className={className}>
      {startAdornment}
      <Subline1 $color={color ?? 'yellow100'}>{label}</Subline1>
      {children}
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.green900};
  padding: 0.7rem 1.2rem;
  border-radius: 8px 0px;
  width: max-content;
  display: flex;
  flex-flow: row;
  gap: 0.8rem;
  align-items: center;
`
