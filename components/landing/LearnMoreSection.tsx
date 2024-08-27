import styled from 'styled-components'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import { HorizontalList } from '@/components/landing/HorizontalList'
import { LandingSectionTitle } from '@/components/landing/shared'
import React from 'react'
import { BaseContainer } from '@/components/core/BaseContainer'

export const LearnMoreSection = () => {
  return (
    <Container maxWidth={'default'}>
      <LandingSectionTitle>Want to learn more?</LandingSectionTitle>
      <Link
        href={`${EXTERNAL_LINKS.CALENDLY_CALL_URL}?utm_source=cabin.city&utm_content=cabinweekpage`}
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        <Button
          variant={'tertiary'}
          endAdornment={<Icon name={'right-arrow'} size={1.6} />}
        >
          Book a call
        </Button>
      </Link>

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
