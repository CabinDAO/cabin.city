import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GraphQLClient } from 'graphql-request'
import { remark } from 'remark'
import html from 'remark-html'
import { Proposal as SnapshotProposal } from '@snapshot-labs/snapshot.js/dist/src/sign/types'
import { useUser } from '@/components/auth/useUser'
import { usePrivy } from '@privy-io/react-auth'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Body1, H1, H2 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import { Button } from '@/components/core/Button'
import { DangerouslyRenderMarkdownHTML } from '@/components/editor/RichText'

const snapshotGraphQLClient = new GraphQLClient(
  'https://hub.snapshot.org/graphql'
)

type Proposal = SnapshotProposal & { id: string; state: string }

export const ProposalView = () => {
  const { user } = useUser()
  const { user: privyUser } = usePrivy()

  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  )
  const [proposalHTML, setProposalHTML] = useState<string>('')

  const canVote =
    privyUser &&
    privyUser.wallet?.walletClientType === 'privy' &&
    (user?.cabinTokenBalanceInt || 0) > 0
  const isActive = selectedProposal?.state === 'active'
  const showVoteButton = canVote && isActive

  useEffect(() => {
    const data = snapshotGraphQLClient
      .request<{ proposals: Proposal[] }>(proposalListQuery)
      .then((data) => {
        setProposals(data.proposals)
      })
  }, [])

  useEffect(() => {
    if (selectedProposal) {
      remark()
        .use(html)
        .process(selectedProposal.body)
        .then((result) => {
          setProposalHTML(result.toString())
        })
    } else {
      setProposalHTML('')
    }
  }, [selectedProposal])

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
              <DangerouslyRenderMarkdownHTML html={proposalHTML} />
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
