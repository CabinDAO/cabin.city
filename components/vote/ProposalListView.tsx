import { ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { expandRoute } from '@/utils/routing'
import { useSnapshot } from '@/components/contexts/SnapshotContext'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { timeAgo } from '@/utils/display-utils'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Body1, H2 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import { ProposalRender } from '@/components/vote/ProposalRender'
import { VoteResultBars } from '@/components/vote/VoteResultBars'
import LoadingSpinner from '@/components/core/LoadingSpinner'

export const ProposalListView = () => {
  const router = useRouter()

  // handle old links with query param
  useEffect(() => {
    if (!router.isReady || !router.query.prop) return
    router.push(expandRoute(['vote_id', { id: `${router.query.prop}` }]))
  }, [router.isReady, router.query.prop, router])

  return (
    <BaseLayout>
      <TitleCard icon="citizen" title="Recent Proposals" />
      <Container>
        <Body1>
          Cabin members create and vote on proposals to make major decisions
          together.
        </Body1>
        <Body1>
          <ExternalLink href={EXTERNAL_LINKS.GOVERNANCE_DOCS}>
            Learn more about Cabin governance here
          </ExternalLink>
          .
        </Body1>
        <ProposalList />
        <Body1>
          <ExternalLink href={EXTERNAL_LINKS.SNAPSHOT}>
            View all proposals on Snapshot
          </ExternalLink>
        </Body1>
      </Container>
    </BaseLayout>
  )
}

const ExternalLink = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      style={{ textDecoration: 'underline' }}
    >
      {children}
    </Link>
  )
}

const Container = styled(ContentCard)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  ${padding('md', 'sm')};
`

const ProposalList = () => {
  const router = useRouter()
  const { proposals, proposalsLoaded } = useSnapshot()

  return (
    <>
      {!proposalsLoaded ? (
        <LoadingSpinner />
      ) : (
        proposals.map((proposal) => (
          <ProposalRow
            key={proposal.id}
            onClick={() => {
              router.push(expandRoute(['vote_id', { id: proposal.id }]))
            }}
            style={{ cursor: 'pointer' }}
          >
            <Top>
              <H2>{proposal.title}</H2>
              {proposal.state === 'active' && (
                <ActivePill>Voting in progress</ActivePill>
              )}
            </Top>
            <ProposalRender proposal={proposal} maxLines={5} linkify={false} />
            {proposal.state !== 'active' && (
              <Body1>Ended {timeAgo(proposal.end)}</Body1>
            )}
            <VoteResultBars proposal={proposal} brief />
          </ProposalRow>
        ))
      )}
    </>
  )
}

const ProposalRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.yellow300};

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow300};
  }
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const ActivePill = styled.div`
  font-size: 1.4rem;
  padding: 0.4rem 1rem;
  background-color: ${({ theme }) => theme.colors.yellow400};
  border-radius: 1rem;
  white-space: nowrap;
  width: min-content;
`
