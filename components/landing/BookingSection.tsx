import styled from 'styled-components'
import { Body1, HHero } from '../core/Typography'
import { NeighborhoodsTop6List } from './NeighborhoodsTop6List'
import { LandingContentNoPadding, SectionContent } from './styles'

export const BookingSection = () => {
  return (
    <BookingSectionContainer>
      <SectionContent>
        <BookingHeader>
          <BookingHero>Explore the network</BookingHero>
          <OpaqueBody1>
            Discover coliving opportunities or level up your skills with
            work/stay residencies
          </OpaqueBody1>
        </BookingHeader>
        <NeighborhoodsTop6List />
      </SectionContent>
    </BookingSectionContainer>
  )
}

const BookingSectionContainer = styled(LandingContentNoPadding)`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding: 8rem 2.4rem;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    padding-left: 12rem;
    padding-right: 4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: auto;
    padding: 8rem 0;
  }
`

const BookingHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const OpaqueBody1 = styled(Body1)`
  opacity: 0.75;
`

const BookingHero = styled(HHero)`
  font-size: 2.4rem;
  max-width: 60%;
  line-height: 1.2;

  ${({ theme }) => theme.bp.md} {
    font-size: 2.4rem;
    line-height: auto;
  }

  ${({ theme }) => theme.bp.lg} {
    font-size: 3.2rem;
    line-height: auto;
  }
`
