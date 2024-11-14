import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { timeAgo } from '@/utils/display-utils'
import { isProd } from '@/utils/dev'
import { Proposal as SnapshotProposal } from '@snapshot-labs/snapshot.js/dist/src/sign/types'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Body1, H1, H2, H3 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import { ProposalRender } from '@/components/vote/ProposalRender'
import { HorizontalDivider } from '@/components/core/Divider'
import { VoteSection } from '@/components/vote/VoteSection'
import { VoteResults } from '@/components/vote/VoteResults'

export type Proposal = SnapshotProposal & {
  id: string
  state: string
  space: { id: string; name: string }
  scores: number[]
  scores_total: number
}

const space = !isProd ? 'cabindao.eth' : 'grin.me.eth.id'

const snapshotGraphQLClient = new GraphQLClient(
  'https://hub.snapshot.org/graphql'
)

export const ProposalView = () => {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  )

  // load proposals
  useEffect(() => {
    snapshotGraphQLClient
      .request<{ proposals: Proposal[] }>(proposalListQuery)
      .then((data) => {
        setProposals(data.proposals)
        console.log(data.proposals)
      })
  }, [])

  const router = useRouter()
  const propsLoaded = useRef(false)

  // set selected proposal if the id is in the query
  useEffect(() => {
    if (!router.isReady || !proposals.length) return
    propsLoaded.current = true
    const initialPropId = `${router.query.prop}`
    if (initialPropId) {
      const loadedProp = proposals.find((p) => p.id === initialPropId) || null
      setSelectedProposal(loadedProp)
    }
  }, [router.isReady, proposals])

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
      <TitleCard icon="citizen" title="Recent DAO Proposals" />
      <Container>
        {selectedProposal ? (
          <>
            <Body1
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => setSelectedProposal(null)}
            >
              Back to list
            </Body1>
            <ProposalContainer>
              <H1>{selectedProposal.title}</H1>
              <ProposalRender proposal={selectedProposal} />
              {selectedProposal.discussion && (
                <Body1>
                  Proposal discussion:{' '}
                  <Link
                    href={selectedProposal.discussion}
                    target="_blank"
                    rel="noopener"
                    style={{ textDecoration: 'underline' }}
                  >
                    {selectedProposal.discussion}
                  </Link>
                </Body1>
              )}
              <HorizontalDivider />
              {selectedProposal.state === 'active' ? (
                <VoteSection proposal={selectedProposal} />
              ) : (
                <>
                  <Body1>Ended {timeAgo(selectedProposal.end)}</Body1>
                  <VoteResults proposal={selectedProposal} />
                </>
              )}
            </ProposalContainer>
          </>
        ) : (
          <>
            <Body1>
              Cabin uses a form of community decisionmaking called a DAO. Cabin
              members create and vote on proposals to make major decisions
              together.
            </Body1>
            <Body1>
              <Link
                href={EXTERNAL_LINKS.GOVERNANCE_DOCS}
                target="_blank"
                rel="noopener"
                style={{ textDecoration: 'underline' }}
              >
                Learn more about Cabin governance here
              </Link>
              .
            </Body1>

            {proposals.map((proposal) => (
              <ProposalRow
                key={proposal.id}
                onClick={() => setSelectedProposal(proposal)}
                style={{ cursor: 'pointer' }}
              >
                <Top>
                  <H2>{proposal.title}</H2>
                  {proposal.state === 'active' && (
                    <ActivePill>Voting in progress</ActivePill>
                  )}
                </Top>
                <ProposalRender
                  proposal={proposal}
                  maxLines={5}
                  linkify={false}
                />
                {proposal.state !== 'active' && (
                  <Body1>Ended {timeAgo(proposal.end)}</Body1>
                )}
                <VoteResults proposal={proposal} brief />
              </ProposalRow>
            ))}
            <Body1>
              <Link
                href={EXTERNAL_LINKS.SNAPSHOT}
                target="_blank"
                rel="noopener"
                style={{ textDecoration: 'underline' }}
              >
                View all proposals on Snapshot
              </Link>
            </Body1>
          </>
        )}
      </Container>
    </BaseLayout>
  )
}

const Container = styled(ContentCard)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  ${padding('md', 'sm')};
`

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

const ProposalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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

const proposalListQuery = `
  query ListProposals {
    proposals(
      first: 10,
      skip: 0,
      where: {
        space_in: ["${space}",],
      },
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      created
      title
      body
      discussion
      choices
      start
      end
      snapshot
      state
      author
      scores
      scores_by_strategy
      scores_total
      scores_updated
      plugins
      network
      space {
        id
        name
      }
      strategies {
        name
        network
        params
      }
    }
  }
`
