import styled from 'styled-components'
import { HTMLAttributes } from 'react'

export type LandingSectionVariant = 'default' | 'light' | 'dark'

/**
 * @deprecated Use a normal div instead
 */
export const LandingContentNoPadding = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: auto;

  ${({ theme }) => theme.bp.md} {
    width: 61.2rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 84rem;
  }
`

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
  }
`

type LandingSectionContentWidth = 'wide' | 'narrow'
interface LandingSectionContentProps extends HTMLAttributes<HTMLDivElement> {
  width?: LandingSectionContentWidth
}

export const LandingSectionContent = styled.div<LandingSectionContentProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: center;
  padding: 5rem 4rem 5rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    padding-top: 10rem;
  }

  ${({ theme }) => theme.bp.md} {
    padding-left: 12rem;
    padding-right: 4rem;
  }
`
