import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnapshot } from '@/components/contexts/SnapshotContext'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileVotersResponse } from '@/utils/types/profile'
import { humanTimeDiff } from '@/utils/display-utils'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Body1, H1, H2 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { ProposalRender } from '@/components/vote/ProposalRender'
import { HorizontalDivider } from '@/components/core/Divider'
import { VoteInput } from '@/components/vote/VoteInput'
import { VoteResultBars } from '@/components/vote/VoteResultBars'
import { VoteResultList } from '@/components/vote/VoteResultList'
import { Avatar } from '@/components/profile/Avatar'

export const ProposalView = () => {
  const router = useRouter()
  const { useGet } = useBackend()
  const { proposals, proposalsLoaded } = useSnapshot()
  const proposal = proposals.find(
    (p) => p.id.toLowerCase() === router.query.id?.toString().toLowerCase()
  )

  const { data } = useGet<ProfileVotersResponse>(
    proposal ? 'api_profile_voters' : null,
    { addresses: proposal?.author }
  )
  const authorProfile =
    !proposal || !data || 'error' in data
      ? null
      : data.profiles[proposal.author.toLocaleLowerCase()]

  return (
    <BaseLayout>
      <TitleCard
        icon="back-arrow"
        title={authorProfile ? `${authorProfile?.name}'s Proposal` : 'Proposal'}
        start={
          authorProfile ? (
            <Avatar srcCfId={authorProfile?.avatarCfId} size={2.5} />
          ) : null
        }
        iconHref={expandRoute('vote')}
      />
      <Container>
        {!proposalsLoaded ? (
          <LoadingSpinner />
        ) : (
          <>
            {!proposal ? (
              <Body1>Proposal not found</Body1>
            ) : (
              <ProposalContainer>
                <H1>{proposal.title}</H1>
                <ProposalRender proposal={proposal} maxLines={20} expandable />
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
                <Results>
                  {proposal.state === 'active' && (
                    <VoteInput proposal={proposal} />
                  )}
                  {proposal.state === 'active' ? (
                    <>
                      <H2>Current results</H2>
                      <Body1
                        title={new Date(proposal.end * 1000)
                          .toISOString()
                          .replace('T', ' ')
                          .replace('Z', '')}
                      >
                        Voting ends in {humanTimeDiff(proposal.end)}
                      </Body1>
                    </>
                  ) : (
                    <>
                      <H2>Results</H2>
                      <Body1
                        title={new Date(proposal.end * 1000)
                          .toISOString()
                          .replace('T', ' ')
                          .replace('Z', '')}
                      >
                        Ended {humanTimeDiff(proposal.end)} ago
                      </Body1>
                    </>
                  )}
                  <VoteResultBars proposal={proposal} />
                  <VoteResultList proposal={proposal} />
                </Results>
                <Body1>
                  <Link
                    href={`https://snapshot.org/#/${proposal.space.id}/proposal/${proposal.id}`}
                    target="_blank"
                    rel="noopener"
                    style={{ textDecoration: 'underline' }}
                  >
                    View this proposal on Snapshot
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

const Results = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
