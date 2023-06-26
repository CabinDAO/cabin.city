import styled from 'styled-components'
import { HHero } from '../core/Typography'

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

export const StyledHHero = styled(HHero)`
  width: 28.8rem;
  text-align: center;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    font-size: 4rem;
    line-height: 1.25;
  }

  ${({ theme }) => theme.bp.lg} {
    padding-top: 2rem;
    font-size: 4rem;
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
