import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import { timeAgo } from '@/utils/display-utils'
import styled from 'styled-components'
import { Body1, H1, H2, H3 } from '@/components/core/Typography'
import { ProposalRender } from '@/components/vote/ProposalRender'
import { HorizontalDivider } from '@/components/core/Divider'
import { VoteInput } from '@/components/vote/VoteInput'
import { VoteResults } from '@/components/vote/VoteResults'
import { Proposal } from '@/components/vote/VoteView'

export const ProposalView = ({ proposal }: { proposal: Proposal }) => {
  return (
    <ProposalContainer>
      <H1>{proposal.title}</H1>
      <ProposalRender proposal={proposal} />
      {proposal.discussion && (
        <Body1>
          Proposal discussion:{' '}
          <Link
            href={proposal.discussion}
            target="_blank"
            rel="noopener"
            style={{ textDecoration: 'underline' }}
          >
            {proposal.discussion}
          </Link>
        </Body1>
      )}
      <HorizontalDivider />
      {proposal.state === 'active' ? (
        <VoteInput proposal={proposal} />
      ) : (
        <>
          <Body1>Ended {timeAgo(proposal.end)}</Body1>
          <VoteResults proposal={proposal} />
        </>
      )}
      <Body1>
        <Link
          href={`https://snapshot.org/#/${proposal.space.id}/proposal/${proposal.id}`}
          target="_blank"
          rel="noopener"
          style={{ textDecoration: 'underline' }}
        >
          View the full proposal on Snapshot
        </Link>
      </Body1>
    </ProposalContainer>
  )
}

const ProposalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
