import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnapshot } from '@/components/contexts/SnapshotContext'
import { timeAgo } from '@/utils/display-utils'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Body1, H1 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { ProposalRender } from '@/components/vote/ProposalRender'
import { HorizontalDivider } from '@/components/core/Divider'
import { VoteInput } from '@/components/vote/VoteInput'
import { VoteResults } from '@/components/vote/VoteResults'

export const ProposalView = () => {
  const router = useRouter()
  const { proposals, proposalsLoaded } = useSnapshot()
  const proposal = proposals.find(
    (p) => p.id.toLowerCase() === router.query.id?.toString().toLowerCase()
  )

  return (
    <BaseLayout>
      <TitleCard icon="citizen" title="Recent Proposals" />
      <Container>
        {!proposalsLoaded ? (
          <LoadingSpinner />
        ) : (
          <>
            <Body1
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => router.push(expandRoute('vote'))}
            >
              Back to list
            </Body1>
            {!proposal ? (
              <Body1>Proposal not found</Body1>
            ) : (
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
            )}
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

const ProposalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
