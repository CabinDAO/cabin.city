import styled from 'styled-components'
import { AppLink } from '../core/AppLink'
import { H4, Subline2 } from '../core/Typography'

export const LaunchBanner = () => {
  return (
    <Banner>
      <H4>Ability to mint launching mid May</H4>
      <AppLink external location="https://twitter.com/creatorcabins">
        <Subline2>Follow us on Twitter for updates</Subline2>
      </AppLink>
    </Banner>
  )
}

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 1.2rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  background: ${({ theme }) => theme.colors.yellow300};

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    padding: 2.1rem 0;
    gap: 0.8rem;
  }
`
