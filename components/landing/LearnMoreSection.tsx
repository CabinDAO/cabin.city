import styled from 'styled-components'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { HorizontalList } from '@/components/landing/HorizontalList'
import { LandingSectionTitle } from '@/components/landing/shared'
import React from 'react'
import { BaseContainer } from '@/components/core/BaseContainer'

export const LearnMoreSection = () => {
  return (
    <Container maxWidth={'default'}>
      <LandingSectionTitle>Want to learn more?</LandingSectionTitle>

      <HorizontalList
        items={[
          {
            title: 'Check out the Forum',
            body: 'Learn about how we’re co-creating a Network City with our community.',
            icon: 'account-group',
            link: EXTERNAL_LINKS.FORUM,
          },
          {
            title: 'Join our online community',
            body: 'Discord is our Town Hall where our community gathers to make plans and memes.',
            icon: 'forum',
            link: EXTERNAL_LINKS.DISCORD,
          },
        ]}
      />
    </Container>
  )
}

const Container = styled(BaseContainer)`
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.bp.md} {
    gap: 4.8rem;
  }
`
