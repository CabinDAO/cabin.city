import styled from 'styled-components'
import { AppLink } from '@/components/core/AppLink'
import { H4, Subline2 } from '@/components/core/Typography'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const LaunchBanner = () => {
  return (
    <Banner>
      <H4>Citizenship minting opens on May 23rd</H4>
      <AppLink external href={EXTERNAL_LINKS.TWITTER} iconSize={1}>
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
