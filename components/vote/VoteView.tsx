import { ReactNode, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnapshot, Proposal } from '@/components/contexts/SnapshotContext'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { timeAgo } from '@/utils/display-utils'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Body1, H1, H2, H3 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import { ProposalRender } from '@/components/vote/ProposalRender'
import { VoteResults } from '@/components/vote/VoteResults'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { ProposalView } from '@/components/vote/ProposalView'

export const VoteView = () => {
  const router = useRouter()
  const { proposals, loaded } = useSnapshot()

  const propsLoaded = useRef(false)

  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  )

  // set selected proposal if the id is in the query
  useEffect(() => {
    if (!router.isReady || !loaded || !proposals.length) return
    propsLoaded.current = true
    const initialPropId = `${router.query.prop}`
    if (initialPropId) {
      const loadedProp = proposals.find((p) => p.id === initialPropId) || null
      setSelectedProposal(loadedProp)
    }
  }, [router.isReady, loaded, proposals])

  // handle url query changes
  useEffect(() => {
    if (!propsLoaded.current) return
    if (selectedProposal) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, prop: selectedProposal.id },
      })
    } else {
      const newQuery = { ...router.query }
      delete newQuery['prop']
      router.push({
        pathname: router.pathname,
        query: newQuery,
      })
    }
  }, [selectedProposal])

  // handle back navigation
  useEffect(() => {
    router.beforePopState(({ url }) => {
      console.log(url, router.pathname)
      if (url.startsWith(router.pathname) && url.includes('prop=')) {
        const parsedUrl = new URL(url, window.location.origin)
        setSelectedProposal(
          proposals.find((p) => p.id === parsedUrl.searchParams.get('prop')) ||
            null
        )
      } else {
        setSelectedProposal(null)
      }
      return true
    })
  }, [router])

  return (
    <BaseLayout>
      <TitleCard icon="citizen" title="Recent Proposals" />
      <Container>
        {!loaded ? (
          <LoadingSpinner />
        ) : selectedProposal ? (
          <>
            <Body1
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => setSelectedProposal(null)}
            >
              Back to list
            </Body1>
            <ProposalView proposal={selectedProposal} />
          </>
        ) : (
          <>
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
            <ProposalList proposals={proposals} onClick={setSelectedProposal} />
            <Body1>
              <ExternalLink href={EXTERNAL_LINKS.SNAPSHOT}>
                View all proposals on Snapshot
              </ExternalLink>
            </Body1>
          </>
        )}
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

const ProposalList = ({
  proposals,
  onClick,
}: {
  proposals: Proposal[]
  onClick: (proposal: Proposal) => void
}) => {
  return (
    <>
      {proposals.map((proposal) => (
        <ProposalRow
          key={proposal.id}
          onClick={() => onClick(proposal)}
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
          <VoteResults proposal={proposal} brief />
        </ProposalRow>
      ))}
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
