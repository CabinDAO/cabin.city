import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GraphQLClient } from 'graphql-request'
import { useUser } from '@/components/auth/useUser'
import { usePrivy } from '@privy-io/react-auth'
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
import { Button } from '@/components/core/Button'
import { ProposalRender } from '@/components/proposals/ProposalRender'

export type Proposal = SnapshotProposal & { id: string; state: string }

const snapshotGqlUrl = isProd
  ? 'https://hub.snapshot.org/graphql'
  : 'https://testnet.hub.snapshot.org/graphql'
const snapshotGraphQLClient = new GraphQLClient(snapshotGqlUrl)

export const ProposalView = () => {
  const { user } = useUser()
  const { user: privyUser } = usePrivy()

  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  )

  const canVote =
    privyUser &&
    privyUser.wallet?.walletClientType === 'privy' &&
    (user?.cabinTokenBalanceInt || 0) > 0
  const isActive = selectedProposal?.state === 'active'
  const showVoteButton = canVote && isActive

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
    const initialPropId = `${router.query.prop}`
    if (initialPropId) {
      const loadedProp = proposals.find((p) => p.id === initialPropId) || null
      setSelectedProposal(loadedProp)
    }
    propsLoaded.current = true
  }, [router.isReady, proposals])

  // render the proposal markdown and handle url query changes
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

  // handle back button
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
              {showVoteButton ? (
                <Button>Voting coming soon</Button>
              ) : (
                <Link
                  href={`https://snapshot.org/#/cabindao.eth/proposal/${selectedProposal.id}`}
                  target="_blank"
                  rel="noopener"
                >
                  <Button variant="secondary">
                    {isActive ? 'Vote' : 'View'} on Snapshot
                  </Button>
                </Link>
              )}
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

const ActivePill = styled.div`
  font-size: 1.4rem;
  padding: 0.4rem 1rem;
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
        space_in: ["cabindao.eth",],
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
      strategies {
        name
        network
        params
      }
    }
  }
`
