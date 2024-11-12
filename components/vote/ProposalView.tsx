import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { isProd } from '@/utils/dev'
import { Proposal as SnapshotProposal } from '@snapshot-labs/snapshot.js/dist/src/sign/types'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Body1, H1 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import { ProposalRender } from '@/components/vote/ProposalRender'
import { VoteSection } from '@/components/vote/VoteSection'
import { HorizontalDivider } from '@/components/core/Divider'

export type Proposal = SnapshotProposal & {
  id: string
  state: string
  space: { id: string; name: string }
}

const space = isProd ? 'cabindao.eth' : 'grin.me.eth.id'

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
      <TitleCard icon="citizen" title="Recent Proposals" />
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
              <HorizontalDivider />
              <VoteSection proposal={selectedProposal} />
            </ProposalContainer>
          </>
        ) : (
          <>
            {proposals.map((proposal) => (
              <ProposalChoice key={proposal.id}>
                <Body1
                  onClick={() => setSelectedProposal(proposal)}
                  style={{ cursor: 'pointer' }}
                >
                  {proposal.title}
                  {proposal.state === 'active' && (
                    <ActivePill>Active</ActivePill>
                  )}
                </Body1>
              </ProposalChoice>
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
  gap: 1.6rem;
  ${padding('md', 'sm')};
`

const ProposalChoice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ProposalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const ActivePill = styled.span`
  font-size: 1.4rem;
  padding: 0.4rem 1rem;
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.colors.yellow300};
  border-radius: 1rem;
  white-space: nowrap;
`

const proposalListQuery = `
  query ListProposals {
    proposals(
      first: 5,
      skip: 0,
      where: {
        space_in: ["${space}",],
      },
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      created
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
